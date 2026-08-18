import { NextResponse } from 'next/server';
import { UrlService } from '@/services/urlService';

export async function POST(req: Request) {
  try {
    const { urlId, password } = await req.json();

    if (!urlId || !password) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
    }

    const isValid = await UrlService.verifyPassword(urlId, password);
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
