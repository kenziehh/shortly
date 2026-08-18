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

    const urls = await UrlService.getUserUrls(session.userId, search, status);
    return NextResponse.json({ urls });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validated = createUrlSchema.parse(body);
    const createdUrl = await UrlService.createUrl(session.userId, validated);

    return NextResponse.json({ success: true, url: createdUrl });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create short link.' },
      { status: 400 }
    );
  }
}
