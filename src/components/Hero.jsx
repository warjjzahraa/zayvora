import heroImage from "../assets/hero.png";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const collections = [
  {
    name: "THE FEMME",
    subtitle: "Soft. Bold. Unforgettable.",
    image: "/petal.jpg",
    path: "/shop?collection=women",
  },
  {
    name: "THE MASCULINE",
    subtitle: "Strength in Scent.",
    image:
      "/after dark.jpg",
    path: "/shop?collection=men",
  },
  {
    name: "THE UNISEX",
    subtitle: "Beyond Boundaries.",
    image:
      "/blush.jpg",
    path: "/shop?collection=unisex",
  },
];

export default function Hero() {
  return (
    <section className="z-hero">
      <img
  className="hero-background-image"
  src="hero.jpg"
  alt="Luxury perfume bottle"
/>
      <div className="hero-glow hero-glow-blue" />
      <div className="hero-glow hero-glow-pink" />

      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            THE ART OF PERFUMERY
          </span>

          <h1>
            Leave a <span>Trace.</span>
          </h1>

          <p>
            Discover fragrances that speak without words.
            Find the scent that tells your story.
          </p>

          <Link to="/shop" className="hero-cta">
            EXPLORE COLLECTION
            <ArrowRight size={18} />
          </Link>

          <div className="hero-caption">
            <span className="caption-line" />
            CRAFTED TO BE REMEMBERED
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <div className="hero-particle particle-one">✦</div>
          <div className="hero-particle particle-two">✧</div>
          <div className="hero-particle particle-three">✦</div>

         <img
  src={heroImage}
  alt="ZAYVORA Luxury Perfume"
  style={{
    display: "block",
    width: "400px",
    maxWidth: "100%",
    height: "400px",
    objectFit: "contain",
    visibility: "visible",
    opacity: 1,
    position: "relative",
    zIndex: 999
  }}
/>

          <div className="hero-image-label">
            <span>01 / SIGNATURE COLLECTION</span>
            <span>EAU DE PARFUM</span>
          </div>
        </div>
      </div>

      <div className="hero-collections">
        {collections.map((item, index) => (
          <Link
            to={item.path}
            className="hero-collection-card"
            key={item.name}
            style={{ "--card-index": index }}
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
            />

            <div className="collection-card-overlay" />

            <div className="collection-card-text">
              <h3>{item.name}</h3>
              <p>{item.subtitle}</p>
            </div>

            <ArrowRight
              className="collection-arrow"
              size={18}
            />
          </Link>
        ))}

        <div className="hero-scroll-note">
          <ArrowDown size={15} />
          <span>DISCOVER YOUR SCENT</span>
        </div>
      </div>
    </section>
  );
}
