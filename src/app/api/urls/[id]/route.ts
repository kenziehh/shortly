import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { UrlService } from '@/services/urlService';
import { AnalyticsService } from '@/services/analyticsService';
import { editUrlSchema } from '@/lib/validations/url';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const analytics = await AnalyticsService.getUrlAnalytics(id, session.userId);

    return NextResponse.json(analytics);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    let validatedData: any = body;
    if (body.originalUrl || body.title !== undefined || body.password !== undefined || body.removePassword || body.customAlias !== undefined) {
      validatedData = editUrlSchema.parse(body);
    }
    if (body.isActive !== undefined) {
      validatedData.isActive = body.isActive;
    }

    const updated = await UrlService.updateUrl(id, session.userId, validatedData);
    return NextResponse.json({ success: true, url: updated });
  } catch (err: any) {
    if (err.errors) {
      return NextResponse.json({ error: err.errors[0]?.message || 'Invalid form input.' }, { status: 400 });
    }
    return NextResponse.json(
      { error: err.message || 'Failed to update short link.' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await UrlService.deleteUrl(id, session.userId);

    return NextResponse.json({ success: true, message: 'Short link deleted successfully.' });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete short link.' },
      { status: 400 }
    );
  }
}
