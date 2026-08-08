import { NextRequest, NextResponse } from 'next/server';
import { resumeData } from '@/content/resume';
import { aboutNarrative } from '@/content/about';
import { experienceData } from '@/content/experience';
import { skillsData } from '@/content/skills';
import { achievementsData } from '@/content/achievements';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_QUERIES_PER_WINDOW = 15;
const WINDOW_MS = 60 * 60 * 1000;

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

    let reply = '';

    if (queryLower.includes('vsr') || queryLower.includes('lip') || queryLower.includes('speech')) {
      reply =
        'Jhansi lead-researches Speaker-Adaptive Visual Speech Recognition (VSR), using 3D-CNN and Transformer neural networks in PyTorch to decode silent lip movements into text for dysarthric speech patterns (Conference paper ongoing).';
    } else if (queryLower.includes('accident') || queryLower.includes('road')) {
      reply =
        'Jhansi has developed the Road Accident Severity Classification & Analytics project, with a conference paper submission currently ongoing.';
    } else if (queryLower.includes('mnist') || queryLower.includes('compression') || queryLower.includes('quantization')) {
      reply =
        'Jhansi is actively working on the MNIST Neural Network Compression benchmark (Ongoing), applying 8-bit quantization and weight pruning in PyTorch.';
    } else if (queryLower.includes('project') || queryLower.includes('gig')) {
      reply =
        'Jhansi’s primary research and development projects include Visual Speech Recognition (VSR), Road Accident Severity ML (Conference paper ongoing), Gig Protector Pro, and MNIST Model Compression (Ongoing).';
    } else if (queryLower.includes('skill') || queryLower.includes('tech') || queryLower.includes('stack')) {
      reply =
        'Jhansi’s core stack includes Python, PyTorch, OpenCV, Scikit-Learn, Next.js 15, TypeScript, Tailwind CSS v4, Docker, and Model Context Protocol (MCP).';
    } else if (queryLower.includes('education') || queryLower.includes('college') || queryLower.includes('batch')) {
      reply =
        'Jhansi is a 3rd-year Computer Science & Engineering (Artificial Intelligence) student (2024 – 2028 batch).';
    } else if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('reach')) {
      reply = `You can reach Jhansi directly via email at suggujhansi@gmail.com or on GitHub at github.com/jhansi-jjs.`;
    } else {
      reply = `Jhansi is a 3rd-year CSE-AI student (2024–2028) specializing in Visual Speech Recognition (VSR, conference paper ongoing), Road Accident ML Analytics (conference paper ongoing), PyTorch deep learning, neural model compression (ongoing), and Next.js 15 full-stack engineering.`;
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
