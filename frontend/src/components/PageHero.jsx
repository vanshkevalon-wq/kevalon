import React from 'react';

const PageHero = ({ badge, title, highlight, subtitle, page }) => {
  return (
    <section
      className="relative overflow-hidden text-center font-['Inter',sans-serif] text-white"
      style={{
        background: 'linear-gradient(135deg,#010f1a 0%,#012236 50%,#013150 100%)',
        padding: '130px 1rem 80px',
      }}
    >
      {/* dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-70"
        style={{
          backgroundImage: 'radial-gradient(circle,rgba(97,187,197,0.14) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* blob tl */}
      <div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 480, height: 480, top: -150, left: -100,
          background: 'radial-gradient(circle,rgba(97,187,197,0.16) 0%,transparent 70%)',
          filter: 'blur(80px)',
          animation: 'phGlowPulse 10s ease-in-out infinite',
        }}
      />
      {/* blob br */}
      <div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          width: 420, height: 420, bottom: -110, right: '15%',
          background: 'radial-gradient(circle,rgba(3,70,101,0.4) 0%,transparent 70%)',
          filter: 'blur(80px)',
          animation: 'phGlowPulse 10s ease-in-out 4s infinite',
        }}
      />

      {/* inner */}
      <div className="relative z-10 max-w-[760px] mx-auto">
        {badge && (
          <div
            className="inline-flex items-center gap-2 rounded-full px-[18px] py-[6px] text-[0.78rem] font-bold tracking-[0.1em] uppercase text-[#a8dde6] mb-[18px]"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(97,187,197,0.28)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full bg-[#61BBC5] flex-shrink-0"
              style={{ animation: 'heroDotPulse 2s ease-in-out infinite' }}
            />
            {badge}
          </div>
        )}

        <h1
          className="font-['Playfair_Display',Georgia,serif] font-extrabold leading-[1.1] text-[#f0f8ff] mb-4 tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.2rem,4vw,3.4rem)' }}
        >
          {title}{' '}
          {highlight && (
            <span
              style={{
                background: 'linear-gradient(135deg,#f97316 0%,#f59e0b 40%,#ef4444 80%,#f97316 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmerAccent 4s linear infinite',
              }}
            >
              {highlight}
            </span>
          )}
        </h1>

        {subtitle && (
          <p className="text-[1rem] text-[#a8c8d8] leading-[1.75] max-w-[560px] mx-auto mb-7">
            {subtitle}
          </p>
        )}

        {page && (
          <div className="inline-flex items-center gap-2 text-[1rem] font-semibold text-[#7aabb8]">
            <a href="/" className="text-[#61BBC5] no-underline hover:text-[#a8dde6] transition-colors">
              Home
            </a>
            <span className="opacity-55">›</span>
            <span>{page}</span>
          </div>
        )}
      </div>

      {/* bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 w-full h-[3px]"
        style={{ background: 'linear-gradient(90deg,transparent 0%,#61BBC5 30%,#034665 70%,transparent 100%)' }}
      />
    </section>
  );
};

export default PageHero;
