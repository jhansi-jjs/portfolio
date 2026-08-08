import { NextRequest, NextResponse } from 'next/server';
import { resumeData } from '@/content/resume';
import { aboutNarrative, experienceTimeline } from '@/content/about';
import { experienceData } from '@/content/experience';
import { skillsData } from '@/content/skills';
import { achievementsData } from '@/content/achievements';

// Simple in-memory session rate limiter (max 15 queries per session / IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_QUERIES_PER_WINDOW = 15;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    const userLimit = rateLimitMap.get(ip) || { count: 0, resetAt: now + WINDOW_MS };

    if (now > userLimit.resetAt) {
      userLimit.count = 0;
      userLimit.resetAt = now + WINDOW_MS;
    }

    if (userLimit.count >= MAX_QUERIES_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Usage cap reached for this session (max 15 queries per hour).' },
        { status: 429 }
      );
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    userLimit.count += 1;
    rateLimitMap.set(ip, userLimit);

    const queryLower = message.toLowerCase();

    // Construct grounded context string from portfolio data
    const contextPrompt = `
You are Jhansi's AI Portfolio Assistant. Answer strictly based on the following profile details:
Name: ${resumeData.name}
Role: ${resumeData.headline}
Education: B.Tech CSE (Artificial Intelligence), 2024-2028
Email: ${resumeData.email}
GitHub: ${resumeData.github}

Core Research:
- ${aboutNarrative.bioParagraph1}
- ${aboutNarrative.bioParagraph2}

Key Experience:
${experienceData.map((e) => `- ${e.role} at ${e.organization}: ${e.description}`).join('\n')}

Skills:
${skillsData.map((s) => `${s.category}: ${s.skills.map((k) => k.name).join(', ')}`).join('\n')}

Achievements & Publications:
${achievementsData.map((a) => `- ${a.title} (${a.date}): ${a.description}`).join('\n')}
`;

    // Rule-based high-accuracy response fallback engine
    let reply = '';

    if (queryLower.includes('vsr') || queryLower.includes('lip') || queryLower.includes('speech')) {
      reply =
        'Jhansi lead-researches Speaker-Adaptive Visual Speech Recognition (VSR), using 3D-CNN and Transformer architectures in PyTorch to decode silent lip movements into text for dysarthric speech patterns.';
    } else if (queryLower.includes('project') || queryLower.includes('gig') || queryLower.includes('mnist')) {
      reply =
        'Jhansi has built high-impact projects including Gig Protector Pro (AI fraud detection platform), MNIST Neural Model Compression (70%+ weight pruning & 8-bit quantization), and VSR Lip-Reading engines.';
    } else if (queryLower.includes('skill') || queryLower.includes('tech') || queryLower.includes('stack')) {
      reply =
        'Jhansi’s core stack includes Python, PyTorch, OpenCV, Scikit-Learn, Next.js 15, TypeScript, Tailwind CSS v4, Docker, and Model Context Protocol (MCP).';
    } else if (queryLower.includes('education') || queryLower.includes('college') || queryLower.includes('batch')) {
      reply =
        'Jhansi is a 3rd-year Computer Science & Engineering (Artificial Intelligence) student (2024 – 2028 batch).';
    } else if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('reach')) {
      reply = `You can reach Jhansi directly via email at suggujhansi@gmail.com or on GitHub at github.com/jhansi-jjs.`;
    } else {
      reply = `Jhansi is a 3rd-year CSE-AI student specializing in Visual Speech Recognition (VSR), PyTorch deep learning, neural model compression, and Next.js 15 full-stack engineering. Feel free to ask about her VSR research, Gig Protector Pro project, or tech stack!`;
    }

    return NextResponse.json({
      reply,
      remainingQueries: MAX_QUERIES_PER_WINDOW - userLimit.count,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error in chat handler';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
