import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, hp_website } = body;

    // Correction #3: Honeypot check for spam bots
    if (hp_website && hp_website.trim() !== '') {
      // Silently accept bot submission without sending email
      return NextResponse.json({
        success: true,
        message: 'Message delivered successfully.',
      });
    }

    // Server-side field validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Optional Resend email sending
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: ['jhansi.jjs@gmail.com'],
          subject: `Portfolio Message from ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Resend API error:', errorText);
      }
    } else {
      console.log('=== CONTACT FORM SUBMISSION ===');
      console.log(`From: ${name.trim()} <${email.trim()}>`);
      console.log(`Message:\n${message.trim()}`);
      console.log('===============================');
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you shortly.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Server error processing message';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
