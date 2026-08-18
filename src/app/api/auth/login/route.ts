import { NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';
import { loginSchema } from '@/lib/validations/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);
    const user = await AuthService.login(validated);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Login failed.' },
      { status: 400 }
    );
  }
}
