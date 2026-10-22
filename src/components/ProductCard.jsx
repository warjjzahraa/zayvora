
import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useShop();

  const [imageFailed, setImageFailed] = useState(false);
  const saved = isWishlisted(product.id);

  return (
    <article className="product-card">
      <div className={`product-image-wrap ${product.collection}-product`}>
        <Link
          to={`/product/${product.id}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          {!imageFailed ? (
            <img
              src={product.image}
              alt={`${product.name} perfume bottle`}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="image-fallback">
              <span>Z</span>
              <small>{product.name}</small>
            </div>
          )}
        </Link>

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <button
          className={`wishlist-button ${saved ? "is-saved" : ""}`}
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={saved}
          onClick={() => toggleWishlist(product)}
        >
          <Heart size={19} fill={saved ? "currentColor" : "none"} />
        </button>

        <button
          className="quick-add"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={16} />
          ADD TO BAG
        </button>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span>{product.concentration}</span>
          <span>{product.size}</span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <p className="product-notes">
          {product.notes.join(" · ")}
        </p>

        <div className="product-rating">
          <Star size={13} fill="currentColor" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="review-count">
            ({product.reviewCount} demo reviews)
          </span>
        </div>

        <div className="product-price">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </article>
  );
}
