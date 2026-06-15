import { useEffect, useState } from 'react';
import logo from '../Images/Logo.png';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'show' | 'exit'

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase('show'), 80);
    const exitTimer = setTimeout(() => setPhase('exit'), 3000);
    const doneTimer = setTimeout(() => onDone(), 3700);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <>
      <style>{`
        @keyframes sp2-bg-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes sp2-card-in {
          0%   { opacity: 0; transform: translateY(32px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes sp2-logo-in {
          0%   { opacity: 0; transform: scale(0.82) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.04) translateY(-3px); }
          100% { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes sp2-text-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes sp2-bar-fill {
          0%   { width: 0%;   opacity: 1; }
          85%  { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0.6; }
        }
        @keyframes sp2-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%);  }
        }
        @keyframes sp2-float {
          0%,100% { transform: translateY(0px);  }
          50%     { transform: translateY(-6px); }
        }
        @keyframes sp2-ring-cw {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes sp2-ring-ccw {
          from { transform: rotate(0deg);    }
          to   { transform: rotate(-360deg); }
        }
        @keyframes sp2-pulse {
          0%,100% { opacity: 0.4; transform: scale(1);    }
          50%     { opacity: 0.9; transform: scale(1.06); }
        }
        @keyframes sp2-dot-blink {
          0%,80%,100% { opacity: 0.15; transform: scale(0.8); }
          40%         { opacity: 1;    transform: scale(1.2); }
        }
        @keyframes sp2-orb-a {
          0%,100% { transform: translate(0,0)       scale(1);    }
          50%     { transform: translate(40px,-30px) scale(1.15); }
        }
        @keyframes sp2-orb-b {
          0%,100% { transform: translate(0,0)        scale(1);    }
          50%     { transform: translate(-35px,25px)  scale(1.1);  }
        }
        @keyframes sp2-star-twinkle {
          0%,100% { opacity: 0.2; }
          50%     { opacity: 1;   }
        }
        @keyframes sp2-exit {
          0%   { opacity: 1; transform: scale(1);    filter: blur(0px);  }
          100% { opacity: 0; transform: scale(1.06); filter: blur(12px); }
        }

        .sp2-wrapper {
          animation: sp2-bg-in 0.5s ease both;
        }
        .sp2-wrapper.exiting {
          animation: sp2-exit 0.7s cubic-bezier(0.55,0,1,0.45) forwards;
        }

        .sp2-dot-1 { animation: sp2-dot-blink 1.4s ease-in-out 0.0s infinite; }
        .sp2-dot-2 { animation: sp2-dot-blink 1.4s ease-in-out 0.2s infinite; }
        .sp2-dot-3 { animation: sp2-dot-blink 1.4s ease-in-out 0.4s infinite; }
      `}</style>

      {/* ── Full-screen backdrop ── */}
      <div
        className={`sp2-wrapper${phase === 'exit' ? ' exiting' : ''}`}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #020d16 0%, #041825 30%, #071f30 60%, #030f1a 100%)',
          overflow: 'hidden',
        }}
      >

        {/* ── Background ambient orbs ── */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
          {/* Large teal orb — top-left */}
          <div style={{
            position:'absolute', width:'55%', height:'55%',
            top:'-10%', left:'-10%',
            borderRadius:'50%',
            background:'radial-gradient(circle, rgba(97,187,197,0.12) 0%, transparent 68%)',
            filter:'blur(60px)',
            animation:'sp2-orb-a 14s ease-in-out infinite',
          }} />
          {/* Deep blue orb — bottom-right */}
          <div style={{
            position:'absolute', width:'50%', height:'50%',
            bottom:'-8%', right:'-8%',
            borderRadius:'50%',
            background:'radial-gradient(circle, rgba(3,70,101,0.35) 0%, transparent 68%)',
            filter:'blur(70px)',
            animation:'sp2-orb-b 18s ease-in-out infinite',
          }} />
          {/* Accent orb — center */}
          <div style={{
            position:'absolute', width:'30%', height:'30%',
            top:'35%', left:'38%',
            borderRadius:'50%',
            background:'radial-gradient(circle, rgba(97,187,197,0.06) 0%, transparent 70%)',
            filter:'blur(50px)',
            animation:'sp2-pulse 6s ease-in-out infinite',
          }} />
        </div>

        {/* ── Star field ── */}
        {[
          {t:'8%', l:'6%',  s:2.5}, {t:'14%',l:'78%', s:2},   {t:'22%',l:'45%', s:1.5},
          {t:'33%',l:'91%', s:2},   {t:'55%',l:'4%',  s:2.5}, {t:'62%',l:'88%', s:1.5},
          {t:'71%',l:'22%', s:2},   {t:'80%',l:'65%', s:2.5}, {t:'88%',l:'12%', s:1.5},
          {t:'92%',l:'82%', s:2},   {t:'18%',l:'32%', s:1.5}, {t:'47%',l:'96%', s:2},
        ].map((d, i) => (
          <div key={i} style={{
            position:'absolute', top:d.t, left:d.l,
            width:d.s, height:d.s, borderRadius:'50%',
            background:'#fff',
            boxShadow:`0 0 ${d.s * 3}px rgba(255,255,255,0.8)`,
            animation:`sp2-star-twinkle ${2.2 + i * 0.3}s ease-in-out ${i * 0.18}s infinite`,
          }} />
        ))}

        {/* ── Center stage ── */}
        <div
          style={{
            position:'relative',
            display:'flex', flexDirection:'column', alignItems:'center',
            gap:0,
            animation: phase === 'show' ? 'sp2-card-in 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
          }}
        >

          {/* ── Spinning orbit rings ── */}
          <div style={{ position:'relative', width:340, height:340, flexShrink:0 }}>

            {/* Ring 3 — outermost slow dashed */}
            <div style={{
              position:'absolute', inset:0, borderRadius:'50%',
              border:'1px dashed rgba(97,187,197,0.2)',
              animation:'sp2-ring-cw 30s linear infinite',
            }}>
              {/* orbit dot */}
              <div style={{
                position:'absolute', top:-3, left:'50%', marginLeft:-3,
                width:6, height:6, borderRadius:'50%',
                background:'rgba(97,187,197,0.9)',
                boxShadow:'0 0 8px 2px rgba(97,187,197,0.7)',
              }} />
            </div>

            {/* Ring 2 */}
            <div style={{
              position:'absolute',
              top:'50%', left:'50%',
              width:268, height:268,
              marginTop:-134, marginLeft:-134,
              borderRadius:'50%',
              border:'1px solid rgba(97,187,197,0.28)',
              boxShadow:'0 0 18px rgba(97,187,197,0.08), inset 0 0 18px rgba(97,187,197,0.05)',
              animation:'sp2-ring-ccw 18s linear infinite',
            }}>
              {/* orbit dot */}
              <div style={{
                position:'absolute', top:-3, left:'50%', marginLeft:-3,
                width:5, height:5, borderRadius:'50%',
                background:'rgba(255,255,255,0.75)',
                boxShadow:'0 0 6px 2px rgba(255,255,255,0.5)',
              }} />
            </div>

            {/* Ring 1 — spinner arc */}
            <div style={{
              position:'absolute',
              top:'50%', left:'50%',
              width:200, height:200,
              marginTop:-100, marginLeft:-100,
              borderRadius:'50%',
              border:'2px solid transparent',
              borderTopColor:'rgba(97,187,197,0.9)',
              borderRightColor:'rgba(97,187,197,0.45)',
              borderBottomColor:'rgba(97,187,197,0.1)',
              animation:'sp2-ring-cw 4s linear infinite',
            }} />

            {/* ── Logo card (WHITE background so original colors show) ── */}
            <div style={{
              position:'absolute',
              top:'50%', left:'50%',
              width:148, height:148,
              marginTop:-74, marginLeft:-74,
              borderRadius:'50%',
              /* White card so teal/navy logo is perfectly visible */
              background:'linear-gradient(145deg, #ffffff 0%, #f0f8fa 60%, #e2f2f5 100%)',
              border:'3px solid rgba(255,255,255,0.95)',
              boxShadow:
                '0 0 0 1px rgba(97,187,197,0.25),' +
                '0 8px 32px rgba(0,0,0,0.45),' +
                '0 0 50px rgba(97,187,197,0.35),' +
                '0 0 100px rgba(97,187,197,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center',
              animation:'sp2-float 4.5s ease-in-out infinite',
            }}>
              {/* subtle inner radial highlight */}
              <div style={{
                position:'absolute', inset:0, borderRadius:'50%',
                background:'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.7) 0%, transparent 55%)',
                pointerEvents:'none',
              }} />
              <img
                src={logo}
                alt="Kevalon Technology"
                style={{
                  width:98, height:'auto',
                  objectFit:'contain',
                  position:'relative', zIndex:1,
                  /* NO filter — show real logo colors */
                  filter:'drop-shadow(0 2px 8px rgba(3,70,101,0.2))',
                }}
              />
            </div>

          </div>{/* end rings wrapper */}

          {/* ── Brand text block ── */}
          <div style={{
            marginTop: -16,
            display:'flex', flexDirection:'column', alignItems:'center', gap:10,
            animation: phase === 'show' ? 'sp2-text-in 0.8s ease 0.5s both' : 'none',
          }}>

            {/* Company name */}
            <h1 style={{
              margin:0,
              fontFamily:"'Cinzel','Trajan Pro','Georgia',serif",
              fontWeight:600,
              fontSize:'clamp(1.7rem,4vw,2.4rem)',
              letterSpacing:'0.5em',
              color:'#ffffff',
              textShadow:
                '0 0 24px rgba(97,187,197,0.65),' +
                '0 0 50px rgba(97,187,197,0.3),' +
                '0 2px 6px rgba(0,0,0,0.5)',
            }}>
              KEVALON
            </h1>

            {/* Divider + tagline */}
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{
                width:36, height:1,
                background:'linear-gradient(90deg, transparent, rgba(97,187,197,0.7))',
              }} />
              <span style={{
                fontFamily:"'Inter','Helvetica Neue',sans-serif",
                fontSize:'0.62rem',
                letterSpacing:'0.36em',
                color:'rgba(150,215,225,0.7)',
                textTransform:'uppercase',
              }}>
                TECHNOLOGY
              </span>
              <div style={{
                width:36, height:1,
                background:'linear-gradient(90deg, rgba(97,187,197,0.7), transparent)',
              }} />
            </div>

            {/* Progress bar */}
            <div style={{ marginTop:14, display:'flex', flexDirection:'column', alignItems:'center', gap:9 }}>
              <div style={{
                position:'relative',
                width:220, height:2,
                background:'rgba(97,187,197,0.12)',
                borderRadius:4,
                overflow:'hidden',
              }}>
                {/* fill */}
                <div style={{
                  position:'absolute', top:0, left:0, height:'100%',
                  background:'linear-gradient(90deg, rgba(97,187,197,0.6), rgba(150,230,240,0.95), rgba(97,187,197,0.6))',
                  borderRadius:4,
                  animation:'sp2-bar-fill 2.8s ease-out 0.4s both',
                }} />
                {/* shimmer */}
                <div style={{
                  position:'absolute', top:0, left:0,
                  width:'40%', height:'100%',
                  background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                  animation:'sp2-shimmer 1.8s ease-in-out 0.6s infinite',
                }} />
              </div>

              {/* Dots row */}
              <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                <span style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize:'0.58rem',
                  letterSpacing:'0.18em',
                  color:'rgba(150,215,225,0.45)',
                  textTransform:'uppercase',
                }}>
                  Loading Innovation
                </span>
                <span style={{ display:'flex', gap:3 }}>
                  {[0,1,2].map(i => (
                    <span key={i} className={`sp2-dot-${i+1}`} style={{
                      display:'inline-block',
                      width:3.5, height:3.5, borderRadius:'50%',
                      background:'rgba(97,187,197,0.8)',
                    }} />
                  ))}
                </span>
              </div>
            </div>

          </div>
        </div>{/* end center stage */}

      </div>
    </>
  );
}
