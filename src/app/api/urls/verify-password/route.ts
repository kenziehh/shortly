import { NextResponse } from 'next/server';
import { UrlService } from '@/services/urlService';

export async function POST(req: Request) {
  try {
    const { urlId, shortCode, password } = await req.json();
    const targetCode = shortCode || urlId;

    if (!targetCode || !password) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
    }

    const urlItem = await UrlService.findByCodeOrAlias(targetCode);
    if (!urlItem) {
      return NextResponse.json({ error: 'Short link not found.' }, { status: 404 });
    }

    const isValid = await UrlService.verifyPassword(urlItem.id, password);
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
    }

    return NextResponse.json({ success: true, originalUrl: urlItem.originalUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Verification failed.' }, { status: 500 });
  }
}
