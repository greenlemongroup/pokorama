import { useEffect, useMemo, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaSteamSymbol,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import {
  fetchActionLinks,
  resolveBackgroundImageUrl,
  type ActionPlatform,
  type CatalogActionLink,
} from "./lib/catalog";

const actionPlatformMeta: Record<
  ActionPlatform,
  { icon: typeof FaSteamSymbol }
> = {
  steamWishlist: { icon: FaSteamSymbol },
  facebook: { icon: FaFacebookF },
  instagram: { icon: FaInstagram },
  pinterest: { icon: FaPinterestP },
  tiktok: { icon: FaTiktok },
  youtube: { icon: FaYoutube },
};

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
  const [actionLinks, setActionLinks] = useState<CatalogActionLink[]>([]);

  useEffect(() => {
    const onResize = () => setBackgroundTier(pickBackgroundTier());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let isActive = true;

    void fetchActionLinks()
      .then((links) => {
        if (isActive) {
          setActionLinks(links);
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to load action links from catalog", error);
      });

    return () => {
      isActive = false;
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
              <span className="slots-counter-button__text">Play Pokorama</span>
            </a>
          </div>
        </div>
      </section>
      <div className="bottom-actions">
        {actionLinks.map(({ href, label, platform }) => {
          const { icon: Icon } = actionPlatformMeta[platform];

          return (
            <a
              key={`${platform}-${href}`}
              href={href}
              className="steam-wishlist-button steam-wishlist-button--big"
              aria-label={`Visit ${label}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="steam-wishlist-button__icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="steam-wishlist-button__text">{label}</span>
            </a>
          );
        })}
      </div>
    </main>
  );
}

export default App;
