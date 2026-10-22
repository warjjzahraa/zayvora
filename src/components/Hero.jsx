
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const poster =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1920&q=85";

export default function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-poster"
        src={poster}
        alt=""
        fetchPriority="high"
      />

      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        aria-hidden="true"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      >
        <source
          src="/videos/hero-perfume.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content container">
        <span className="eyebrow">
          THE ZAYVORA FRAGRANCE HOUSE
        </span>

        <h1>
          Not Just a Fragrance.
          <br />
          <em>A Signature.</em>
        </h1>

        <p>
          Discover extraordinary scents that express your
          individuality and linger in memory.
        </p>

        <div className="hero-actions">
          <Link to="/shop" className="btn btn-light">
            EXPLORE THE COLLECTION <ArrowRight size={17} />
          </Link>

          <Link to="/#finder" className="btn btn-outline-light">
            FIND YOUR SIGNATURE
          </Link>
        </div>
      </div>

      <a href="#collections" className="hero-scroll">
        <span>DISCOVER ZAYVORA</span>
        <ArrowDown size={17} />
      </a>
    </section>
  );
}
