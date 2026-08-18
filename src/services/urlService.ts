import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { hashPassword, comparePassword } from '@/lib/auth';
import type { CreateUrlFormValues, EditUrlFormValues } from '@/lib/validations/url';

export class UrlService {
  /**
   * Create a new Short URL for User
   */
  static async createUrl(userId: string, input: CreateUrlFormValues) {
    // 1. Check User Limit Quota
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        maxUrlLimit: true,
        _count: { select: { urls: true } },
      },
    });

    if (!user) {
      throw new Error('User account not found.');
    }

    if (user._count.urls >= user.maxUrlLimit) {
      throw new Error(`Quota limit reached (${user.maxUrlLimit} URLs max). Upgrade your plan for more.`);
    }

    // 2. Custom Alias Sanitization & Conflict Check
    let customAliasClean: string | undefined = undefined;
    if (input.customAlias) {
      customAliasClean = input.customAlias.trim().toLowerCase().replace(/\//g, '').replace(/[^a-z0-9_-]/g, '');

      if (customAliasClean) {
        const aliasExists = await prisma.url.findFirst({
          where: {
            OR: [
              { customAlias: customAliasClean },
              { shortCode: customAliasClean },
            ],
          },
        });

        if (aliasExists) {
          throw new Error(`Custom slug "/${customAliasClean}" is already taken.`);
        }
      }
    }

    // 3. Generate Unique nanoid Short Code
    let shortCode = nanoid(7);
    let codeExists = await prisma.url.findFirst({
      where: {
        OR: [{ shortCode }, { customAlias: shortCode }],
      },
    });

    while (codeExists) {
      shortCode = nanoid(7);
      codeExists = await prisma.url.findFirst({
        where: {
          OR: [{ shortCode }, { customAlias: shortCode }],
        },
      });
    }

    // 4. Hash Password if Provided
    let hashedPassword: string | undefined = undefined;
    if (input.password && input.password.trim().length > 0) {
      hashedPassword = await hashPassword(input.password);
    }

    // 5. Create Database Record
    const createdUrl = await prisma.url.create({
      data: {
        userId,
        shortCode,
        customAlias: customAliasClean || null,
        originalUrl: input.originalUrl,
        title: input.title || null,
        password: hashedPassword || null,
        maxClicks: input.maxClicks ? parseInt(String(input.maxClicks), 10) : null,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
      },
    });

    return createdUrl;
  }

  /**
   * Fetch User URLs with Search & Filter
   */
  static async getUserUrls(userId: string, search?: string, status?: string) {
    const whereClause: any = { userId };

    if (search) {
      const s = search.trim().toLowerCase();
      whereClause.AND = [
        {
          OR: [
            { title: { contains: s, mode: 'insensitive' } },
            { originalUrl: { contains: s, mode: 'insensitive' } },
            { shortCode: { contains: s, mode: 'insensitive' } },
            { customAlias: { contains: s, mode: 'insensitive' } },
          ],
        },
      ];
    }

    if (status === 'active') {
      whereClause.isActive = true;
      whereClause.OR = [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ];
    } else if (status === 'expired') {
      whereClause.OR = [
        { isActive: false },
        { expiresAt: { lte: new Date() } },
      ];
    }

    return prisma.url.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        shortCode: true,
        customAlias: true,
        originalUrl: true,
        title: true,
        password: true,
        isActive: true,
        clickCount: true,
        maxClicks: true,
        expiresAt: true,
        createdAt: true,
      },
    });
  }

  /**
   * Find Short URL by Code or Custom Alias (Exact & Insensitive)
   */
  static async findByCodeOrAlias(codeOrAlias: string) {
    const rawCode = codeOrAlias.trim();
    const lowerCode = rawCode.toLowerCase();

    return prisma.url.findFirst({
      where: {
        OR: [
          { shortCode: rawCode },
          { customAlias: rawCode },
          { shortCode: lowerCode },
          { customAlias: lowerCode },
          { shortCode: { equals: rawCode, mode: 'insensitive' } },
          { customAlias: { equals: rawCode, mode: 'insensitive' } },
        ],
      },
    });
  }

  /**
   * Update Short URL Details
   */
  static async updateUrl(urlId: string, userId: string, input: EditUrlFormValues & { isActive?: boolean }) {
    const existing = await prisma.url.findFirst({
      where: { id: urlId, userId },
    });

    if (!existing) {
      throw new Error('Short link not found or access denied.');
    }

    const updateData: any = {};

    if (input.title !== undefined) updateData.title = input.title || null;
    if (input.originalUrl !== undefined) updateData.originalUrl = input.originalUrl;
    if (input.isActive !== undefined) updateData.isActive = input.isActive;
    if (input.maxClicks !== undefined) updateData.maxClicks = input.maxClicks ? parseInt(String(input.maxClicks), 10) : null;
    if (input.expiresAt !== undefined) updateData.expiresAt = input.expiresAt ? new Date(input.expiresAt) : null;

    if (input.customAlias !== undefined) {
      const cleanAlias = input.customAlias
        ? input.customAlias.trim().toLowerCase().replace(/\//g, '').replace(/[^a-z0-9_-]/g, '')
        : null;

      if (cleanAlias && cleanAlias !== existing.customAlias) {
        const conflict = await prisma.url.findFirst({
          where: {
            id: { not: urlId },
            OR: [
              { customAlias: cleanAlias },
              { shortCode: cleanAlias },
            ],
          },
        });

        if (conflict) {
          throw new Error(`Custom slug "/${cleanAlias}" is already taken.`);
        }
      }
      updateData.customAlias = cleanAlias;
    }

    if (input.password !== undefined && input.password.trim().length > 0) {
      updateData.password = await hashPassword(input.password);
    }

    return prisma.url.update({
      where: { id: urlId },
      data: updateData,
    });
  }

  /**
   * Delete Short URL Permanently
   */
  static async deleteUrl(urlId: string, userId: string) {
    const existing = await prisma.url.findFirst({
      where: { id: urlId, userId },
    });

    if (!existing) {
      throw new Error('Short link not found or access denied.');
    }

    return prisma.url.delete({
      where: { id: urlId },
    });
  }

  /**
   * Verify Password Protection for Short Link
   */
  static async verifyPassword(urlId: string, passcode: string): Promise<boolean> {
    const urlItem = await prisma.url.findUnique({
      where: { id: urlId },
      select: { password: true },
    });

    if (!urlItem || !urlItem.password) return false;
    return comparePassword(passcode, urlItem.password);
  }
}
