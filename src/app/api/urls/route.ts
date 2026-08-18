import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { UrlService } from '@/services/urlService';
import { createUrlSchema } from '@/lib/validations/url';

export async function GET(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const result = await UrlService.getUserUrls(session.userId, search, status, page, limit);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch short links.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = createUrlSchema.parse(body);

    const newUrl = await UrlService.createUrl(session.userId, validatedData);
    return NextResponse.json({ success: true, url: newUrl }, { status: 201 });
  } catch (err: any) {
    if (err.errors) {
      return NextResponse.json({ error: err.errors[0]?.message || 'Invalid form input.' }, { status: 400 });
    }
    return NextResponse.json(
      { error: err.message || 'Failed to create short link.' },
      { status: 400 }
    );
  }
}
