import { useRef, useMemo } from "react";
import { downloadPoster } from "../../utils/download.js";
import {
  GENRE_THEMES,
  pickRandomNetwork,
  pickEpisodeTag,
} from "../../styles/themes/genreThemes.js";
import GenreArt from "./GenreArt.jsx";
import GenreBackdrop from "./Genrebackdrop.jsx";
import "./Poster.css";

export default function Poster({ data, watermark = "" }) {
  const posterRef = useRef(null);
  const theme = GENRE_THEMES[data.genre] || GENRE_THEMES.Drama;


  const network = useMemo(() => pickRandomNetwork(), [data]);
  const episodeTag = useMemo(() => pickEpisodeTag(), [data]);
  const artVariant = useMemo(() => Math.floor(Math.random() * 2), [data]);

  const artTransform = useMemo(() => {
    if (data.genre === "Blocked") return "none";
    const flip = Math.random() < 0.5 ? -1 : 1;
    const rotate = (Math.random() * 6 - 3).toFixed(1); // -3deg to 3deg
    return `scaleX(${flip}) rotate(${rotate}deg)`;
  }, [data]);

  const isBlocked = data.genre === "Blocked";

  return (
    <div className="poster-wrap">
      <div
        className={`poster${isBlocked ? " poster--blocked" : ""}`}
        ref={posterRef}
        style={{
          "--bg": theme.bg,
          "--accent": theme.accent,
          "--text": theme.text,
        }}
      >
        <div className="poster-art">
          <div className="blob blob-a" style={{ background: theme.blobA }} />
          <div className="blob blob-b" style={{ background: theme.blobB }} />
          <div className="grain" />
          <div className="vignette" />
        </div>

        <div className="poster-content">
          <div className="poster-top">
            <span
              className="network-badge"
              style={{ fontFamily: network.font }}
            >
              {network.name}
            </span>
            <span className="episode-tag">{episodeTag}</span>
          </div>

          <div className="poster-genre-ribbon">{data.genre}</div>

          <div className="poster-hero-art">
            <div className="genre-backdrop-layer">
              <GenreBackdrop genre={data.genre} accent={theme.accent} />
            </div>
            <div
              className={`genre-art-inner${isBlocked ? " genre-art-inner--slam" : ""}`}
              style={{ transform: artTransform }}
            >
              <GenreArt
                genre={data.genre}
                accent={theme.accent}
                variantIndex={artVariant}
              />
            </div>
          </div>

          <div className="poster-title-block">
            <h2 className="poster-title">{data.title}</h2>
            <p className="poster-tagline">{data.tagline}</p>
          </div>

          <div className="poster-bottom">
            <p className="poster-synopsis">{data.synopsis}</p>
            <div className="poster-meta">
              <span className="poster-rating">★ {data.rating}</span>
              <span className="poster-divider">|</span>
              <p className="poster-quote">
                “{data.review_quote}”
                <span className="critic"> — {data.critic_name}</span>
              </p>
            </div>
            <span className="poster-watermark">{watermark}</span>
          </div>
        </div>
      </div>

      <button
        className="download-btn"
        onClick={() => downloadPoster(posterRef)}
      >
        Download poster
      </button>
    </div>
  );
}
