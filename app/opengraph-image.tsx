import { ImageResponse } from 'next/og';

export const alt = 'Jhansi — AI/ML Engineer & Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          color: '#f4f4f5',
          fontFamily: 'sans-serif',
          padding: '60px',
          border: '2px solid #27272a',
        }}
      >
        {/* Top Brand Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#18181b',
            border: '1px solid #27272a',
            padding: '8px 20px',
            borderRadius: '9999px',
            fontSize: '18px',
            color: '#34d399',
            fontWeight: 'bold',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '9999px',
              backgroundColor: '#34d399',
            }}
          />
          jhansi.dev — AI/ML & Full-Stack Portfolio
        </div>

        {/* Hero Title & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#f4f4f5',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Speaker-Adaptive Visual Speech Recognition & Neural AI Systems
          </div>
          <div style={{ fontSize: '24px', color: '#a1a1aa', fontWeight: 400 }}>
            3rd-Year CSE (Artificial Intelligence) Student | PyTorch, Next.js 15, Model Compression
          </div>
        </div>

        {/* Footer Tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid #27272a',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#71717a',
          }}
        >
          <div>github.com/jhansi-jjs</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span
              style={{
                backgroundColor: '#18181b',
                padding: '4px 12px',
                borderRadius: '6px',
                color: '#34d399',
              }}
            >
              #PyTorch
            </span>
            <span
              style={{
                backgroundColor: '#18181b',
                padding: '4px 12px',
                borderRadius: '6px',
                color: '#34d399',
              }}
            >
              #DeepLearning
            </span>
            <span
              style={{
                backgroundColor: '#18181b',
                padding: '4px 12px',
                borderRadius: '6px',
                color: '#34d399',
              }}
            >
              #NextJS15
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
