import { useMemo, useRef, useState } from "react";


const FORTUNES = [
  "Go confidently in the direction of your dreams.",
  "Small steps every day lead to big results.",
  "Believe you can — you’re halfway there.",
  "Consistency beats intensity.",
  "The best time to start was yesterday. The next best is now.",
  "Fortune favors the bold.",
  "You are stronger than you think.",
  "Your energy attracts your tribe."
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [cracking, setCracking] = useState(false);
  const [seed, setSeed] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fortune = useMemo(
    () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)],
    [seed]
  );

  const openFortune = () => {
    if (cracking) return;
    setCracking(true);
    setSeed((s) => s + 1);

    // 🔊 mainkan suara crack
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setTimeout(() => {
      setOpened(true);
      setCracking(false);
    }, 700);
  };

  const reset = () => setOpened(false);

  return (
    <>
      {/* 🔊 audio element */}
      <audio ref={audioRef} src="/crack.mp3" preload="auto" />

      <style>{`
        .fade-in { animation: fadeIn 320ms ease-out both; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cookie-wrap { position: relative; width: 120px; height: 120px; }
        .cookie-half { position: absolute; inset: 0; will-change: transform; }
        .left-clip  { clip-path: inset(0 50% 0 0); }
        .right-clip { clip-path: inset(0 0 0 50%); }
        .crack-left  { animation: crackLeft 600ms cubic-bezier(.2,.8,.2,1) forwards; }
        .crack-right { animation: crackRight 600ms cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes crackLeft  {
          0% { transform: translateX(0) rotate(0deg); }
          60% { transform: translateX(-40px) rotate(-14deg); }
          100% { transform: translateX(-36px) rotate(-12deg); }
        }
        @keyframes crackRight {
          0% { transform: translateX(0) rotate(0deg); }
          60% { transform: translateX(40px) rotate(14deg); }
          100% { transform: translateX(36px) rotate(12deg); }
        }
        .cookie-shadow::after {
          content:"";
          position:absolute;
          left:50%;
          bottom:-6px;
          transform:translateX(-50%);
          width:70%;height:10px;
          background:rgba(0,0,0,.10);
          filter:blur(8px);
          border-radius:50%;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Inter, Roboto, sans-serif",
          background: "#fdfcf8",
        }}
      >
        {!opened ? (
          <div style={{ textAlign: "center" }}>
            <div className="cookie-wrap cookie-shadow" style={{ margin: "0 auto 14px" }}>
              <img
                src="/fortune.png"
                alt="Fortune Cookie"
                className={`cookie-half left-clip ${cracking ? "crack-left" : ""}`}
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <img
                src="/fortune.png"
                alt=""
                className={`cookie-half right-clip ${cracking ? "crack-right" : ""}`}
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <h1 className="fade-in" style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 700 }}>
              Fortune Cookie
            </h1>
            <p className="fade-in" style={{ opacity: 0.8, margin: "0 0 16px" }}>
              Tap the button to reveal your fortune!
            </p>
            <button
              onClick={openFortune}
              disabled={cracking}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                opacity: cracking ? 0.6 : 1,
              }}
            >
              {cracking ? "Cracking..." : "Reveal Fortune"}
            </button>
          </div>
        ) : (
          <div className="fade-in" style={{ textAlign: "center", maxWidth: 520 }}>
            <img
              src="/fortune.png"
              alt="Fortune Cookie"
              style={{ width: 56, height: 56, objectFit: "contain", marginBottom: 12 }}
            />
            <h2 style={{ margin: "0 0 12px" }}>Your Fortune</h2>
            <blockquote style={{ margin: "0 0 20px", fontSize: 18, lineHeight: 1.5 }}>
              “{fortune}”
            </blockquote>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => setSeed((s) => s + 1)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: "1px solid #ddd",
                  background: "#fff",
                  fontWeight: 600,
                }}
              >
                New Fortune
              </button>
              <button
                onClick={reset}
                style={{
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: "1px solid #ddd",
                  background: "#fff",
                  fontWeight: 600,
                }}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
