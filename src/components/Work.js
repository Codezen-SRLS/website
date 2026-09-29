import * as React from "react";
import { Link } from "gatsby";
import WorkCard from "./WorkCard";

const Work = ({ audits = [] }) => {
  const featured = audits.filter((a) => a.featured);
  const trackRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".cz-work-item");
    const cardWidth = card ? card.offsetWidth + 22 : 340;
    track.scrollBy({ left: dir * cardWidth * 2, behavior: "smooth" });
  };

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.querySelector(".cz-work-item");
      const cardWidth = (card?.offsetWidth ?? 280) + 22;
      setActiveIndex(Math.round(track.scrollLeft / cardWidth));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  if (!featured.length) return null;

  return (
    <section
      id="work"
      data-reveal
      className="cz-section"
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
        <h2 className="cz-section-heading">Proven success in blockchain security</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous audits"
            className="cz-carousel-arrow"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 13L7 9l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next audits"
            className="cz-carousel-arrow"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link
            to="/portfolio/"
            className="cz-btn cz-btn--ghost cz-btn--md"
            style={{ textDecoration: "none" }}
          >
            View all {audits.length} audits
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="cz-work-track"
      >
        {featured.map((audit, i) => (
          <div key={i} className="cz-work-item">
            <WorkCard {...audit} slug={audit.pagePath} imageData={audit.image?.childImageSharp?.gatsbyImageData} />
          </div>
        ))}
      </div>

      {/* Mobile position counter */}
      <p className="cz-carousel-count" aria-live="polite">
        {Math.min(activeIndex + 1, featured.length)} / {featured.length}
      </p>

      <style>{`
        .cz-work-track {
          display: flex;
          gap: 22px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 0;
        }
        .cz-work-track::-webkit-scrollbar { display: none; }
        .cz-work-item {
          flex: 0 0 calc((100% - 44px) / 3);
          min-width: 280px;
          scroll-snap-align: start;
        }
        .cz-carousel-arrow {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--glass-line);
          background: var(--glass);
          color: var(--text-body);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
        }
        .cz-carousel-arrow:hover {
          border-color: var(--cz-cyan);
          color: var(--cz-cyan);
        }
        @media (max-width: 1023px) {
          .cz-work-item { flex: 0 0 calc((100% - 22px) / 2); }
        }
        .cz-carousel-count {
          display: none;
          margin: 16px 0 0;
          text-align: center;
          font-family: var(--font-mono);
          font-size: var(--fs-mono-sm);
          color: var(--text-muted);
        }
        @media (max-width: 767px) {
          .cz-work-item { flex: 0 0 85vw; }
          .cz-carousel-arrow { display: none; }
          .cz-carousel-count { display: block; }
        }
      `}</style>
    </section>
  );
};

export default Work;
