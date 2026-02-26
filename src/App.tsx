import { useEffect, useMemo, useState } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { fetchStoreLinks, resolveBackgroundImageUrl } from "./lib/catalog";

type StoreLinks = {
  ios?: string;
  android?: string;
};

const pickBackgroundTier = () => {
  const maxViewport = Math.max(window.innerWidth, window.innerHeight);
  const scaledViewport = maxViewport * window.devicePixelRatio;

  if (scaledViewport <= 1200) return "low";
  if (scaledViewport <= 2200) return "mid";
  return "high";
};

function App() {
  const [storeLinks, setStoreLinks] = useState<StoreLinks>({});
  const [backgroundTier, setBackgroundTier] = useState<"low" | "mid" | "high">(
    pickBackgroundTier,
  );

  useEffect(() => {
    const onResize = () => setBackgroundTier(pickBackgroundTier());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let mounted = true;

    fetchStoreLinks()
      .then((links) => {
        if (mounted) {
          setStoreLinks(links);
        }
      })
      .catch(() => {
        if (mounted) {
          setStoreLinks({});
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const backgroundImage = useMemo(
    () => `url("${resolveBackgroundImageUrl(backgroundTier)}")`,
    [backgroundTier],
  );

  return (
    <main className="landing" style={{ backgroundImage }}>
      <section className="content">
        <h1 className="game-title">pokorama</h1>
        <div className="store-buttons">
          <a
            href={storeLinks.android ?? "#"}
            className="store-link"
            aria-label="Get Pokorama on Google Play"
            target="_blank"
            rel="noreferrer"
            onClick={(event) => {
              if (!storeLinks.android) event.preventDefault();
            }}
          >
            <span className="store-widget">
              <FaGooglePlay className="store-icon" aria-hidden="true" />
              <span className="store-label">Google Play</span>
            </span>
          </a>
          <a
            href={storeLinks.ios ?? "#"}
            className="store-link"
            aria-label="Download Pokorama on the App Store"
            target="_blank"
            rel="noreferrer"
            onClick={(event) => {
              if (!storeLinks.ios) event.preventDefault();
            }}
          >
            <span className="store-widget">
              <FaApple className="store-icon" aria-hidden="true" />
              <span className="store-label">App Store</span>
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;
