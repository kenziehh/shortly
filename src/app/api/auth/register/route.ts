import { NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';
import { registerSchema } from '@/lib/validations/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.parse(body);
    const user = await AuthService.register(validated);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Registration failed.' },
      { status: 400 }
    );
  }
}
