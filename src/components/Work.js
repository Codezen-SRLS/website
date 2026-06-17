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

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    const card = track?.querySelector(".cz-work-item");
    const cardWidth = (card?.offsetWidth ?? 280) + 22;
    track?.scrollTo({ left: i * cardWidth, behavior: "smooth" });
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
      style={{ padding: "104px 0 0", scrollMarginTop: 90 }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
        <div>
          <span className="cz-eyebrow">Our Work</span>
          <h2 className="cz-section-heading" style={{ marginBottom: 0 }}>Proven success in blockchain security</h2>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="cz-carousel-arrow"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 13L7 9l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="cz-carousel-arrow"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link
            to="/portfolio"
            className="cz-btn cz-btn--ghost cz-btn--md"
            style={{ textDecoration: "none" }}
          >
            View all {audits.length}+ →
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        className="cz-work-track"
      >
        {featured.map((audit, i) => (
          <div key={i} className="cz-work-item">
            <WorkCard {...audit} imageData={audit.image?.childImageSharp?.gatsbyImageData} />
          </div>
        ))}
      </div>

      {/* Mobile scroll dots */}
      <div className="cz-carousel-dots" aria-hidden="true">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`cz-carousel-dot${i === activeIndex ? " active" : ""}`}
            aria-label={`Card ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        .cz-work-track {
          display: flex;
          gap: 22px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 4px;
          margin: 0 -8px;
          padding-left: 8px;
          padding-right: 8px;
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
        .cz-carousel-dots {
          display: none;
          justify-content: center;
          align-items: center;
          gap: 7px;
          margin-top: 20px;
        }
        .cz-carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: var(--radius-pill);
          background: var(--glass-line-strong);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background var(--dur-fast) var(--ease), width var(--dur-fast) var(--ease);
          flex-shrink: 0;
        }
        .cz-carousel-dot.active {
          width: 20px;
          background: var(--cz-cyan);
          box-shadow: 0 0 8px rgba(4,217,255,0.5);
        }
        @media (max-width: 767px) {
          .cz-work-item { flex: 0 0 85vw; }
          .cz-carousel-arrow { display: none; }
          .cz-carousel-dots { display: flex; }
        }
      `}</style>
    </section>
  );
};

export default Work;
