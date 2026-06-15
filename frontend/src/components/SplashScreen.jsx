import { useEffect, useState } from 'react';
import logo from '../Images/Logo.png';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('show'); // 'show' | 'exit'

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), 3200);
    const doneTimer = setTimeout(() => onDone(), 3900);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <>
      <style>{`
        @keyframes kv-spin    { to { transform: rotate(360deg);  } }
        @keyframes kv-spin-r  { to { transform: rotate(-360deg); } }
        @keyframes kv-float   {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-10px); }
        }
        @keyframes kv-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes kv-sweep {
          0%   { left: -60%; }
          100% { left: 120%; }
        }
        @keyframes kv-pulse-ring {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 1;   }
        }
        @keyframes kv-dot-blink {
          0%,80%,100% { opacity: 0; }
          40%         { opacity: 1; }
        }
        .kv-loading-dots span {
          display: inline-block;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(97,187,197,0.7);
          margin: 0 2px;
          animation: kv-dot-blink 1.4s ease-in-out infinite;
        }
        .kv-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .kv-loading-dots span:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at 55% 45%, #0d2d40 0%, #071a28 35%, #030f1a 70%, #010a12 100%)',
          overflow: 'hidden',
          opacity: phase === 'exit' ? 0 : 1,
          transition: 'opacity 0.7s ease',
        }}
      >

        {/* ── Ambient glow blobs ── */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <div style={{ position:'absolute', width:'50%', height:'50%', top:'5%', left:'-5%', borderRadius:'50%', background:'radial-gradient(circle, rgba(3,70,101,0.45) 0%, transparent 70%)', filter:'blur(80px)' }} />
          <div style={{ position:'absolute', width:'45%', height:'45%', bottom:'5%', right:'-5%', borderRadius:'50%', background:'radial-gradient(circle, rgba(97,187,197,0.15) 0%, transparent 70%)', filter:'blur(80px)' }} />
        </div>

        {/* ── Scattered star dots ── */}
        {[
          {top:'12%',left:'9%'},  {top:'20%',left:'82%'}, {top:'68%',left:'7%'},
          {top:'78%',left:'80%'}, {top:'10%',left:'52%'}, {top:'55%',left:'93%'},
          {top:'42%',left:'3%'},  {top:'87%',left:'38%'}, {top:'33%',left:'88%'},
          {top:'85%',left:'15%'},
        ].map((d, i) => (
          <div key={i} style={{
            position:'absolute', top:d.top, left:d.left,
            width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
            borderRadius:'50%',
            background:'rgba(97,187,197,0.8)',
            boxShadow:'0 0 6px rgba(97,187,197,0.9)',
            animation:`kv-pulse-ring ${2.5 + i * 0.4}s ease-in-out ${i * 0.25}s infinite`,
          }} />
        ))}

        {/* ── Main centered block ── */}
        <div style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', gap:36 }}>

          {/* ── Ring + Logo stack ── */}
          <div style={{ position:'relative', width:380, height:380, display:'flex', alignItems:'center', justifyContent:'center' }}>

            {/* Ring 4 — outermost dashed */}
            <div style={{
              position:'absolute', inset:0,
              borderRadius:'50%',
              border:'1px dashed rgba(97,187,197,0.18)',
              animation:'kv-spin 28s linear infinite',
            }} />

            {/* Ring 3 */}
            <div style={{
              position:'absolute',
              width:310, height:310,
              top:'50%', left:'50%',
              marginTop:-155, marginLeft:-155,
              borderRadius:'50%',
              border:'1.5px solid rgba(97,187,197,0.28)',
              boxShadow:'0 0 20px rgba(97,187,197,0.1), inset 0 0 20px rgba(97,187,197,0.06)',
              animation:'kv-spin-r 18s linear infinite, kv-pulse-ring 4s ease-in-out infinite',
            }} />

            {/* Ring 2 */}
            <div style={{
              position:'absolute',
              width:240, height:240,
              top:'50%', left:'50%',
              marginTop:-120, marginLeft:-120,
              borderRadius:'50%',
              border:'1.5px solid rgba(97,187,197,0.38)',
              boxShadow:'0 0 25px rgba(97,187,197,0.15), inset 0 0 25px rgba(97,187,197,0.08)',
              animation:'kv-spin 11s linear infinite, kv-pulse-ring 3s ease-in-out 0.5s infinite',
            }} />

            {/* Ring 1 — innermost solid arc */}
            <div style={{
              position:'absolute',
              width:175, height:175,
              top:'50%', left:'50%',
              marginTop:-87.5, marginLeft:-87.5,
              borderRadius:'50%',
              border:'2px solid transparent',
              borderTopColor:'rgba(97,187,197,0.7)',
              borderRightColor:'rgba(97,187,197,0.3)',
              boxShadow:'0 0 30px rgba(97,187,197,0.2)',
              animation:'kv-spin-r 6s linear infinite',
            }} />

            {/* Logo circle */}
            <div style={{
              position:'relative', zIndex:10,
              width:130, height:130,
              borderRadius:'50%',
              background:'radial-gradient(circle at 35% 30%, rgba(97,187,197,0.2) 0%, transparent 60%), radial-gradient(circle at 65% 70%, rgba(3,70,101,0.5) 0%, transparent 60%), rgba(5,22,38,0.85)',
              border:'1.5px solid rgba(97,187,197,0.45)',
              boxShadow:'0 0 50px rgba(97,187,197,0.3), 0 0 100px rgba(3,70,101,0.5)',
              display:'flex', alignItems:'center', justifyContent:'center',
              animation:'kv-float 4s ease-in-out infinite',
            }}>
              <img
                src={logo}
                alt="Kevalon Technology"
                style={{
                  width:78, height:'auto', objectFit:'contain',
                  filter:'brightness(1.15) drop-shadow(0 0 14px rgba(97,187,197,0.65))',
                }}
              />
            </div>
          </div>

          {/* ── Brand name ── */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, animation:'kv-fade-up 0.9s ease 0.5s both' }}>
            <h1 style={{
              margin:0,
              fontFamily:"'Cinzel','Trajan Pro','Garamond','Times New Roman',serif",
              fontWeight:400,
              fontSize:'clamp(1.8rem, 4vw, 2.5rem)',
              letterSpacing:'0.4em',
              color:'#d0eaf0',
              textShadow:'0 0 40px rgba(97,187,197,0.55), 0 0 80px rgba(97,187,197,0.2)',
            }}>
              KEVALON
            </h1>

            <p style={{
              margin:0,
              fontFamily:"'Inter','Helvetica Neue',sans-serif",
              fontSize:'0.68rem',
              letterSpacing:'0.28em',
              color:'rgba(150,215,225,0.5)',
              textTransform:'uppercase',
            }}>
              TECHNOLOGY
            </p>

            {/* Loading bar */}
            <div style={{ marginTop:8, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
              <div style={{
                position:'relative',
                width:200, height:1,
                background:'rgba(97,187,197,0.12)',
                borderRadius:2,
                overflow:'hidden',
              }}>
                <div style={{
                  position:'absolute', top:0, left:0,
                  width:'55%', height:'100%',
                  background:'linear-gradient(90deg, transparent, rgba(97,187,197,0.85), transparent)',
                  animation:'kv-sweep 2s ease-in-out 0.6s infinite',
                }} />
              </div>

              {/* Dots + text */}
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize:'0.6rem',
                  letterSpacing:'0.15em',
                  color:'rgba(150,215,225,0.38)',
                  textTransform:'uppercase',
                }}>
                  Loading Innovation
                </span>
                <span className="kv-loading-dots">
                  <span /><span /><span />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
