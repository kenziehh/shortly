import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { AuthService } from '@/services/authService';

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await AuthService.getCurrentUser(session.userId);
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
