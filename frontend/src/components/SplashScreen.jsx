import { useEffect, useState } from 'react';
import logo from '../Images/Logo.png';

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        const increment = prev < 50 ? 2 : prev < 80 ? 3 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 40);
    const readyTimer = setTimeout(() => setPhase('ready'),  2200);
    const exitTimer  = setTimeout(() => setPhase('exit'),   3000);
    const doneTimer  = setTimeout(() => onDone(),           3600);
    return () => { clearInterval(progressInterval); clearTimeout(readyTimer); clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  const anim = phase === 'loading' ? 'sp-in 0.4s ease both'
             : phase === 'exit'    ? 'sp-out 0.6s cubic-bezier(0.55,0,1,0.45) forwards'
             : 'sp-in 0.01s ease both';

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020e18] overflow-hidden w-screen h-screen min-h-screen"
      style={{ perspective: 800, animation: anim }}
    >
      {/* Animated gradient background — wrapped in overflow-hidden via outer div */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-20%]">
          <div className="absolute rounded-full" style={{ width:'60%',height:'60%',top:'10%',left:'5%',background:'radial-gradient(circle,rgba(3,70,101,0.55) 0%,transparent 70%)',filter:'blur(100px)',animation:'sp-bg-shift-1 14s ease-in-out infinite' }} />
          <div className="absolute rounded-full" style={{ width:'55%',height:'55%',bottom:'5%',right:'5%',background:'radial-gradient(circle,rgba(97,187,197,0.22) 0%,transparent 70%)',filter:'blur(100px)',animation:'sp-bg-shift-2 18s ease-in-out infinite' }} />
          <div className="absolute rounded-full" style={{ width:'40%',height:'40%',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'radial-gradient(circle,rgba(2,40,65,0.8) 0%,transparent 70%)',filter:'blur(100px)',animation:'sp-bg-shift-3 10s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { w:6, h:6,  top:'15%', left:'12%',              bg:'rgba(97,187,197,0.7)',  shadow:'0 0 12px rgba(97,187,197,0.8)', anim:'sp-orb-drift 7s ease-in-out infinite',      dx:'50px',  dy:'30px' },
          { w:4, h:4,  top:'25%', right:'15%',             bg:'rgba(97,187,197,0.5)',  shadow:'0 0 10px rgba(97,187,197,0.6)', anim:'sp-orb-drift 9s ease-in-out 1s infinite',   dx:'-40px', dy:'50px' },
          { w:8, h:8,  bottom:'20%', left:'20%',           bg:'rgba(3,70,101,0.9)',    shadow:'0 0 16px rgba(97,187,197,0.5)', anim:'sp-orb-drift 11s ease-in-out 2s infinite',  dx:'60px',  dy:'-40px' },
          { w:3, h:3,  bottom:'30%', right:'20%',          bg:'rgba(97,187,197,0.8)',  shadow:'0 0 8px rgba(97,187,197,0.9)',  anim:'sp-orb-drift 6s ease-in-out 0.5s infinite', dx:'-30px', dy:'-50px' },
          { w:5, h:5,  top:'60%', left:'8%',               bg:'rgba(97,187,197,0.6)',  shadow:'0 0 14px rgba(97,187,197,0.7)', anim:'sp-orb-drift 13s ease-in-out 1.5s infinite',dx:'70px',  dy:'20px' },
          { w:4, h:4,  top:'45%', right:'8%',              bg:'rgba(97,187,197,0.5)',  shadow:'0 0 10px rgba(97,187,197,0.6)', anim:'sp-orb-drift 8s ease-in-out 3s infinite',   dx:'-50px', dy:'30px' },
          { w:7, h:7,  top:'75%', right:'12%',             bg:'rgba(3,70,101,0.8)',    shadow:'0 0 18px rgba(97,187,197,0.5)', anim:'sp-orb-drift 10s ease-in-out 2.5s infinite',dx:'-60px', dy:'-30px' },
          { w:3, h:3,  top:'10%', left:'45%',              bg:'rgba(97,187,197,0.9)',  shadow:'0 0 8px rgba(97,187,197,1)',    anim:'sp-orb-drift 5s ease-in-out 1s infinite',   dx:'20px',  dy:'40px' },
        ].map((o, i) => (
          <div key={i} className="absolute rounded-full" style={{ width:o.w,height:o.h,top:o.top,bottom:o.bottom,left:o.left,right:o.right,background:o.bg,boxShadow:o.shadow,filter:'blur(1px)',animation:o.anim,'--orb-dx':o.dx,'--orb-dy':o.dy,'--orb-opacity':'0.6' }} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[600px] px-5">

        {/* Logo container */}
        <div className="relative w-[240px] h-[240px]" style={{ animation:'sp-logo-in 1s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}>

          {/* Glass card */}
          <div
            className="relative w-full h-full rounded-full flex items-center justify-center"
            style={{
              background:'radial-gradient(circle at 35% 30%,rgba(97,187,197,0.15),transparent 60%),radial-gradient(circle at 65% 70%,rgba(3,70,101,0.3),transparent 60%),rgba(4,18,31,0.55)',
              backdropFilter:'blur(20px)',
              border:'1px solid rgba(97,187,197,0.2)',
              animation:'sp-float 5s ease-in-out 1.2s infinite,sp-glow-pulse 3s ease-in-out 1s infinite',
            }}
          >
            {/* glossy highlight */}
            <div className="absolute top-[8%] left-[15%] right-[15%] h-[35%] rounded-[50%_50%_0_0/30%_30%_0_0] pointer-events-none" style={{ background:'linear-gradient(180deg,rgba(255,255,255,0.06) 0%,transparent 100%)' }} />

            {/* logo */}
            <div className="relative z-10 flex items-center justify-center">
              <img src={logo} alt="Kevalon Technology" className="w-[150px] h-auto object-contain" style={{ filter:'brightness(1.15) drop-shadow(0 0 16px rgba(97,187,197,0.5)) drop-shadow(0 0 40px rgba(97,187,197,0.2))' }} />
            </div>

            {/* SVG liquid border */}
            <svg className="absolute pointer-events-none" style={{ inset:-6,width:'calc(100% + 12px)',height:'calc(100% + 12px)' }} viewBox="0 0 300 300">
              <defs>
                <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#61BBC5" />
                  <stop offset="50%"  stopColor="#034665" />
                  <stop offset="100%" stopColor="#61BBC5" />
                </linearGradient>
              </defs>
              <circle cx="150" cy="150" r="140" stroke="url(#liquidGrad)" strokeWidth="3" fill="none"
                strokeDasharray="880" style={{ animation:'sp-stroke-dash 1.4s cubic-bezier(0.4,0,0.2,1) 0.4s both' }} />
            </svg>

            {/* Rotating rings */}
            <div className="absolute top-1/2 left-1/2 rounded-full pointer-events-none border border-dashed border-[rgba(97,187,197,0.2)]" style={{ width:280,height:280,animation:'sp-ring-rotate 18s linear infinite' }} />
            <div className="absolute top-1/2 left-1/2 rounded-full pointer-events-none border border-transparent" style={{ width:320,height:320,borderTopColor:'rgba(97,187,197,0.25)',borderRightColor:'rgba(97,187,197,0.1)',animation:'sp-ring-rotate-reverse 12s linear infinite' }} />
            <div className="absolute top-1/2 left-1/2 rounded-full pointer-events-none border border-dashed border-[rgba(97,187,197,0.08)]" style={{ width:360,height:360,animation:'sp-ring-rotate 30s linear infinite' }} />
          </div>
        </div>

        {/* Brand name */}
        <h1 className="relative m-0 leading-none text-center w-full overflow-visible" style={{ animation:'sp-brand-in 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s both' }}>
          <span
            className="block font-['Inter','Nunito_Sans',sans-serif] font-extrabold tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ fontSize:'clamp(1.8rem,5vw,2.8rem)',background:'linear-gradient(90deg,#61BBC5 0%,#ffffff 30%,#61BBC5 50%,#034665 70%,#61BBC5 100%)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'sp-brand-in 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s both,sp-text-shimmer 4s linear 1.6s infinite' }}
          >
            KEVALON
          </span>
          <span
            className="absolute inset-0 font-['Inter','Nunito_Sans',sans-serif] font-extrabold tracking-[0.2em] uppercase whitespace-nowrap"
            aria-hidden="true"
            style={{ fontSize:'clamp(1.8rem,5vw,2.8rem)',color:'transparent',WebkitTextFillColor:'transparent',filter:'blur(18px)',background:'linear-gradient(90deg,#61BBC5,#034665,#61BBC5)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',backgroundClip:'text',opacity:0.5,animation:'sp-text-shimmer 4s linear 1.6s infinite' }}
          >
            KEVALON
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-['Inter',sans-serif] text-[0.72rem] font-normal text-[rgba(170,218,230,0.55)] tracking-[0.12em] uppercase m-0 text-center max-w-[320px] leading-[1.4]" style={{ animation:'sp-tagline-in 0.7s ease 1.2s both' }}>
          Building technology that turns ideas into products
        </p>

        {/* Progress */}
        <div className="flex flex-col gap-2 w-full max-w-[260px] px-2.5" style={{ animation:'sp-progress-in 0.6s ease 1s both' }}>
          <div className="relative w-full h-0.5 bg-[rgba(97,187,197,0.1)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-[150ms] ease-[ease]"
              style={{ width:`${progress}%`,background:'linear-gradient(90deg,rgba(3,70,101,0.8) 0%,#61BBC5 50%,rgba(97,187,197,0.9) 100%)',boxShadow:'0 0 8px rgba(97,187,197,0.6),0 0 20px rgba(97,187,197,0.3)' }}
            />
            <div className="absolute top-0 w-[60px] h-full" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)',animation:'sp-shimmer 1.6s ease-in-out 0.8s infinite' }} />
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="font-['Inter',monospace] text-[0.65rem] font-medium text-[rgba(97,187,197,0.45)] tracking-[0.1em] uppercase truncate max-w-[70%]">Loading Experience</span>
            <span className="font-['JetBrains_Mono','Fira_Code',monospace] text-[0.65rem] font-semibold text-[rgba(97,187,197,0.7)] tracking-[0.05em] min-w-[38px] text-right">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Scan line */}
      <div aria-hidden="true" className="absolute left-0 right-0 h-0.5 pointer-events-none" style={{ background:'linear-gradient(90deg,transparent 0%,rgba(97,187,197,0.06) 20%,rgba(97,187,197,0.15) 50%,rgba(97,187,197,0.06) 80%,transparent 100%)',animation:'sp-scan 4s linear infinite' }} />
    </div>
  );
}
