import { NextRequest, NextResponse } from 'next/server';
import { resumeData } from '@/content/resume';
import { aboutNarrative } from '@/content/about';
import { experienceData } from '@/content/experience';
import { skillsData } from '@/content/skills';
import { achievementsData } from '@/content/achievements';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_QUERIES_PER_WINDOW = 20;
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
        { error: 'Usage cap reached for this session (max 20 queries per hour).' },
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
        'Jhansi lead-researches Speaker-Adaptive Visual Speech Recognition (VSR), using 3D-CNN and Transformer architectures in PyTorch to decode silent lip movements into text for dysarthric speech patterns (Targeting IEEE/Springer publication, Ongoing).';
    } else if (queryLower.includes('fundus') || queryLower.includes('healthcare') || queryLower.includes('eye') || queryLower.includes('retina')) {
      reply =
        'Jhansi engineered deep domain-adaptive neural models for retinal optic disc and cup segmentation across diverse clinical imaging sources for the Deep Learning for Healthcare Challenge (Track 2B).';
    } else if (queryLower.includes('amazon') || queryLower.includes('entity') || queryLower.includes('linkage')) {
      reply =
        'In the Amazon ML Challenge 2026, Jhansi developed an enterprise business entity resolution pipeline utilizing blocking algorithms and similarity classifiers for massive catalog record linkage.';
    } else if (queryLower.includes('accident') || queryLower.includes('road')) {
      reply =
        'Jhansi developed the Road Accident Severity Classification & Predictive Analytics project using imbalance-aware ML models, with a conference paper submission currently ongoing.';
    } else if (queryLower.includes('mnist') || queryLower.includes('compression') || queryLower.includes('quantization')) {
      reply =
        'Jhansi is actively working on the Neural Network Model Compression benchmark (Ongoing), applying 8-bit post-training quantization, structured weight pruning, and ONNX edge deployment.';
    } else if (queryLower.includes('project') || queryLower.includes('work') || queryLower.includes('build')) {
      reply =
        'Jhansi has built 14 substantive projects across Healthcare AI (Fundus Retinal Segmentation), Speech AI (Dysarthric VSR), Enterprise ML (Amazon ML Entity Resolution), Safety Analytics (Road Accident Severity), AI Security (Gig Protector Pro), and Model Compression.';
    } else if (queryLower.includes('who') || queryLower.includes('about') || queryLower.includes('study') || queryLower.includes('education') || queryLower.includes('batch')) {
      reply =
        'Jhansi Suggula is a 3rd-year B.Tech student in Computer Science & Engineering (Artificial Intelligence) [Batch 2024–2028]. She specializes in Deep Learning, Computer Vision, Speech Systems, and Full-Stack Engineering.';
    } else if (queryLower.includes('skill') || queryLower.includes('tech') || queryLower.includes('stack')) {
      reply =
        'Jhansi’s primary stack includes Python, PyTorch, OpenCV, Scikit-Learn, Next.js 15, TypeScript, Tailwind CSS v4, FastAPI, Docker, and Model Context Protocol (MCP).';
    } else if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('reach')) {
      reply =
        'You can reach Jhansi directly at suggujhansi@gmail.com or via her GitHub at github.com/jhansi-jjs.';
    } else {
      reply =
        'Jhansi Suggula is a 3rd-year CSE-AI student (2024–2028) researching Healthcare AI (retinal segmentation), Visual Speech Recognition (dysarthric lip-reading), Neural Model Compression, and Full-Stack Web Systems. Feel free to ask about any of her 14 projects!';
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
