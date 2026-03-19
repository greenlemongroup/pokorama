import { useEffect, useMemo, useState } from "react";
import { resolveBackgroundImageUrl } from "./lib/catalog";

const pickBackgroundTier = () => {
  const maxViewport = Math.max(window.innerWidth, window.innerHeight);
  const scaledViewport = maxViewport * window.devicePixelRatio;

  if (scaledViewport <= 1200) return "low";
  if (scaledViewport <= 2200) return "mid";
  return "high";
};

function App() {
  const [backgroundTier, setBackgroundTier] = useState<"low" | "mid" | "high">(
    pickBackgroundTier,
  );

  useEffect(() => {
    const onResize = () => setBackgroundTier(pickBackgroundTier());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const backgroundImage = useMemo(
    () => `url("${resolveBackgroundImageUrl(backgroundTier)}")`,
    [backgroundTier],
  );

  return (
    <main className="landing" style={{ backgroundImage }}>
      <section className="content">
        <h1 className="game-title">pokorama</h1>
        <div className="cta-panel">
          <p className="cta-copy">
            <strong>Pokorama</strong> is a relaxing design game where
            creativity takes center stage. Transform fully furnished blank
            rooms into warm, inviting spaces using a rich collection of
            fabrics, textures, patterns, and paints.
          </p>
          <div className="store-buttons">
            <a
              href="https://play.pokorama.com/"
              className="store-link slots-counter-button"
              aria-label="Play Pokorama"
              target="_blank"
              rel="noreferrer"
            >
              <span className="slots-counter-button__icon" aria-hidden="true">
                <img
                  className="store-icon"
                  src="https://cdn.pokorama.com/play/shared/icons/normal/sparkle.png"
                  alt=""
                />
              </span>
              <span className="slots-counter-button__text">Play</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
