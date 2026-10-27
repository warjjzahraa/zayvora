

import { useEffect, useRef, useState } from "react";
import "./App.css";

const menPerfumes = [
  { id: 1, name: "VANTAGE NOIR", price: 125, notes: "Black Pepper · Cedarwood", image: "/vantage-noir.jpg" },
  { id: 2, name: "BLUE VEIL", price: 110, notes: "Bergamot · Marine Accord", image: "/blue-veil.jpg"},
  { id: 3, name: "OBSIDIAN OUD", price: 145, notes: "Saffron · Oud · Amber", image: "/OBSIDIAN OUD.jpg" },
  { id: 4, name: "CEDAR THEORY", price: 95, notes: "Cedarwood · Cardamom", image: "/CEDAR THEORY.jpg" },
  { id: 5, name: "AFTER DARK", price: 135, notes: "Leather · Tonka Bean", image: "/after dark.jpg" },
  { id: 6, name: "NOIR ABSOLU", price: 118, notes: "Vetiver · Dark Woods", image: "/amber theory.jpg" },
   { id: 7, name: "NIGHT LEGACY", price: 130, notes: "Patchouli · Vanilla", image: "/night.jpg" },

  { id: 8, name: "ROYAL EMBER", price: 155, notes: "Amber · Spice · Musk", image: "/royal.jpg" },
  { id: 9, name: "SILVER COAST", price: 105, notes: "Citrus · Sea Salt", image: "/silver.jpg" },
  { id: 10, name: "SMOKED SUEDE", price: 140, notes: "Suede · Incense", image: "/smoke.jpg" },
  
];

const womenPerfumes = [
  { id: 11, name: "ROSE ÉCLAT", price: 120, notes: "Bulgarian Rose · Pear", image: "/rose.jpg" },
  { id: 12, name: "VELVET BLOOM", price: 135, notes: "Jasmine · Vanilla", image: "/velvet.jpg" },
  { id: 13, name: "SILK BLUSH", price: 105, notes: "Peony · Pink Pepper", image: "/silkk.jpg" },
  { id: 14, name: "MOONLIT IRIS", price: 140, notes: "Iris · Plum · Woods", image: "moon.jpg" },
  { id: 15, name: "AMBER PETAL", price: 115, notes: "Orange Blossom · Amber", image: "/petal.jpg" },
  { id: 16, name: "PEARL VEIL", price: 125, notes: "White Flowers · Musk", image: "/veil.jpg" },
  { id: 17, name: "ROSE SILHOUETTE", price: 132, notes: "Rose · Sandalwood", image: "/silhourtte.jpg" },
  { id: 18, name: "BLUSH NOCTURNE", price: 145, notes: "Vanilla · Soft Amber", image: "/blush.jpg" },
  { id: 19, name: "PETAL MUSE", price: 99, notes: "Peony · Pear · Musk", image: "/pet.jpg" },
  { id: 20, name: "GOLDEN ROSE", price: 150, notes: "Rose · Saffron · Amber", image: "/golden.jpg" },
];

const unisexPerfumes = [
  { id: 21, name: "AMBER THEORY", price: 150, notes: "Amber · Labdanum · Vanilla", image: "/amber theory.jpg" },
  { id: 22, name: "SKIN & SMOKE", price: 130, notes: "White Musk · Incense", image: "/skinsmoke.jpg" },
  { id: 23, name: "SAFFRON DUSK", price: 145, notes: "Saffron · Rose · Woods", image: "/suffrox.jpg" },
  { id: 24, name: "FIG NOCTURNE", price: 110, notes: "Fig · Green Leaves", image: "/fig.jpg" },
  { id: 25, name: "GOLDEN HOUR", price: 125, notes: "Bergamot · Neroli · Amber", image: "/go;den.jpg" },
];

function ProductCarousel({
  title,
  subtitle,
  products,
  theme,
  onAdd,
  onViewProduct,
}) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || paused || products.length < 2) return;

    let animationFrame;
    let previousTime = 0;
    let position = track.scrollLeft;

    const speed = 84;

    const animate = (time) => {
      if (!previousTime) previousTime = time;

      const delta = Math.min(time - previousTime, 50);
      previousTime = time;

      const half = track.scrollWidth / 2;

      if (half > 0 && track.scrollWidth > track.clientWidth) {
        position += (speed * delta) / 1000;

        if (position >= half) {
          position = 0;
        }

        track.scrollLeft = position;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [paused, products]);

  return (
    <section className={`perfume-section ${theme}`} id={theme}>
      <div className="section-heading container">
        <div>
          <span className="eyebrow">{subtitle}</span>
          <h2>{title}</h2>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="no-category-results container">
          No fragrances found in this collection.
        </p>
      ) : (
        <div
          className="carousel-track container"
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          {[...products, ...products].map((perfume, index) => (
            <article
              className="product-card"
              key={`${perfume.id}-${index}`}
            >
              <div className="product-image">
                <img src={perfume.image} alt={perfume.name} />

                <button
                  type="button"
                  className="quick-add"
                  onClick={() => onAdd(perfume)}
                >
                  ADD TO BAG +
                </button>
              </div>

              <div className="product-info">
                <span className="product-collection">
                  {theme === "men-theme"
                    ? "FOR HIM"
                    : theme === "women-theme"
                    ? "FOR HER"
                    : "UNISEX"}
                </span>

                <div className="product-title-row">
                  <h3>{perfume.name}</h3>
                  <span>${perfume.price}</span>
                </div>

                <p>{perfume.notes}</p>

                <button
                  type="button"
                  className="view-product-btn"
                  onClick={() => onViewProduct(perfume)}
                >
                  VIEW PRODUCT <span></span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToBag = () => {
    setCartCount((count) => count + 1);
  };

  const filterPerfumes = (products) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return products;

    return products.filter((perfume) =>
      `${perfume.name} ${perfume.notes}`
        .toLowerCase()
        .includes(query)
    );
  };

  const men = filterPerfumes(menPerfumes);
  const women = filterPerfumes(womenPerfumes);
  const unisex = filterPerfumes(unisexPerfumes);

  const noResults =
    searchTerm.trim() &&
    men.length === 0 &&
    women.length === 0 &&
    unisex.length === 0;

  useEffect(() => {
    if (!selectedProduct) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct]);

  return (
    <div className="zayvora">
      <div className="announcement-bar">
        COMPLIMENTARY SHIPPING ON ORDERS OVER $150
        <span>DISCOVER YOUR SIGNATURE SCENT</span>
      </div>

      <header className="navbar">
        <a className="brand" href="#home">
          ZAYVORA<span>.</span>
        </a>

        <nav className="main-nav">
          <a href="#home">Home</a>
          <a href="#men-theme">For Him</a>
          <a href="#women-theme">For Her</a>
          <a href="#unisex-theme">Unisex</a>
          <a href="#our-story">Our Story</a>
        </nav>

        <div className="nav-actions">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search fragrances..."
              aria-label="Search fragrances"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          <button
            type="button"
            className="cart-button"
            onClick={() => {
              window.alert(
                `You have ${cartCount} item(s) in your bag.`
              );
            }}
          >
            BAG ({cartCount})
          </button>
        </div>
      </header>

      <main>
       <section className="hero" id="home">
  <img
    className="hero-background-image"
    src="hero.jpg"
    alt="Luxury perfume bottle"
    onError={(event) => {
      event.currentTarget.style.display = "none";
    }}
  />

  <div className="hero-copy">
    


  </div>
          <div className="hero-copy">
            <span className="eyebrow">
              THE ART OF LEAVING A TRACE
            </span>

            <h1>
              A scent that
              <br />
              <em>stays with you.</em>
            </h1>

            <p>
              Discover thoughtfully crafted fragrances that turn
              fleeting moments into lasting memories.
            </p>

            <a className="hero-button" href="#men-theme">
              DISCOVER THE COLLECTION <span></span>
            </a>

            <div className="hero-signature">
              <span></span>
              <span>SCENT IS A FORM OF MEMORY</span>
            </div>
          </div>
        </section>

        <section className="brand-intro" id="our-story">
          <span className="eyebrow">MORE THAN A FRAGRANCE</span>
          <h2>
            Make the moment
            <br />
            <em>unforgettable.</em>
          </h2>
          <p>
            Refined compositions. Distinctive character. A fragrance
            that feels unmistakably yours.
          </p>
        </section>

        {noResults ? (
          <div className="no-results">
            <span className="eyebrow">FRAGRANCE SEARCH</span>
            <h2>No scent found.</h2>
            <p>Try another perfume name or fragrance note.</p>
            <button
              type="button"
              className="hero-button"
              onClick={() => setSearchTerm("")}
            >
              VIEW ALL FRAGRANCES
            </button>
          </div>
        ) : (
          <>
            <ProductCarousel
              
  title="The Gentlemen's Collection"
  subtitle="BOLD · REFINED · TIMELESS"
    
              products={men}
              theme="men-theme"
              onAdd={addToBag}
              onViewProduct={setSelectedProduct}
            />

            <ProductCarousel
              
  title="The Feminine Collection"
  subtitle="SOFT · ELEGANT · CAPTIVATING"
        
              products={women}
              theme="women-theme"
              onAdd={addToBag}
              onViewProduct={setSelectedProduct}
            />

            <ProductCarousel
              
  title="The Signature Collection"
  subtitle="UNIVERSAL · DISTINCTIVE · UNFORGETTABLE"
      
              products={unisex}
              theme="unisex-theme"
              onAdd={addToBag}
              onViewProduct={setSelectedProduct}
            />
          </>
        )}

        <section className="mystery-section">
          <div className="mystery-content">
            <span className="eyebrow">THE ZAYVORA EXPERIENCE</span>
            <h2>
              Leave a little
              <br />
              <em>mystery behind.</em>
            </h2>
            <p>
              Some moments fade. Some memories linger.
              Find the fragrance that tells your story,
              long after you have left the room.
            </p>
            <a className="mystery-button" href="#unisex-theme">
              FIND YOUR SIGNATURE <span></span>
            </a>
          </div>

          <div className="mystery-decoration" aria-hidden="true">
            <span className="mystery-orbit orbit-one" />
            <span className="mystery-orbit orbit-two" />
            <span className="mystery-monogram">Z</span>
            <span className="mystery-caption">
              SCENT · MEMORY · IDENTITY
            </span>
          </div>
        </section>

        

        <section className="newsletter-section" id="newsletter">
          <span className="eyebrow">A NOTE FROM ZAYVORA</span>
          <h2>A little beauty in your inbox.</h2>
          <p>
            Discover new fragrances, thoughtful rituals and stories
            from the world of scent.
          </p>

          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              window.alert(
                "Thank you for your interest in ZAYVORA!"
              );
              event.currentTarget.reset();
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
              required
            />
            <button type="submit">SUBSCRIBE </button>
          </form>

          <small>
            By subscribing, you agree to receive updates from ZAYVORA.
          </small>
        </section>

        {selectedProduct && (
          <div
            className="product-modal-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="product-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProduct.name} product details`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="product-modal-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close product details"
              >
                ×
              </button>

              <div className="product-modal-image">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
              </div>

              <div className="product-modal-info">
                <span className="eyebrow">
                  THE ZAYVORA COLLECTION
                </span>

                <h2>{selectedProduct.name}</h2>

                <p className="modal-price">
                  ${selectedProduct.price.toFixed(2)}
                </p>

                <span className="modal-notes-label">
                  FRAGRANCE NOTES
                </span>
                <p className="modal-notes">
                  {selectedProduct.notes}
                </p>

                <p className="modal-description">
                  A distinctive fragrance, thoughtfully chosen
                  to become part of your signature.
                </p>

                <button
                  type="button"
                  className="modal-add-button"
                  onClick={() => {
                    addToBag();
                    setSelectedProduct(null);
                  }}
                >
                  ADD TO BAG — ${selectedProduct.price.toFixed(2)}
                </button>

                <button
                  type="button"
                  className="modal-continue-button"
                  onClick={() => setSelectedProduct(null)}
                >
                  CONTINUE EXPLORING
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="professional-footer">
        <div className="footer-main">
          <div className="footer-brand-column">
            <a className="brand footer-logo" href="#home">
              ZAYVORA<span>.</span>
            </a>
            <p className="footer-tagline">
              The art of leaving a trace.
            </p>
            <p className="footer-description">
              Fragrance is more than what you wear.
              It is what you leave behind.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram 
              </a>
              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noreferrer"
              >
                Pinterest 
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>EXPLORE</h3>
            <a href="#home">Home</a>
            <a href="#men-theme">Men's Fragrances</a>
            <a href="#women-theme">Women's Fragrances</a>
            <a href="#unisex-theme">Unisex Collection</a>
            <a href="#our-story">Our Story</a>
          </div>

          <div className="footer-column">
            <h3>CLIENT CARE</h3>
            <a href="mailto:hello@zayvora.example">Contact Us</a>
            <a href="#newsletter">Newsletter</a>
            <a href="#home">Shipping Information</a>
            <a href="#home">Returns & Exchanges</a>
            <a href="#home">Frequently Asked Questions</a>
          </div>

          <div className="footer-column footer-contact">
            <h3>THE ZAYVORA WORLD</h3>
            <p>
              Questions about your next signature scent?
            </p>
            <a href="mailto:hello@zayvora.example">
              hello@zayvora.example
            </a>
            <span>MON – FRI · CUSTOMER CARE</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ZAYVORA. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED FOR YOUR PRESENCE.</span>
          <div>
            <a href="#home">Privacy</a>
            <a href="#home">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
