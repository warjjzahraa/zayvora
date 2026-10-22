
import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    cartCount,
    wishlistCount,
    setCartOpen,
  } = useShop();

  const navigate = useNavigate();

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
    setSearchOpen(false);
    setMenuOpen(false);
  }

  const links = [
    { label: "Home", to: "/" },
    { label: "Shop All", to: "/shop" },
    { label: "Men", to: "/shop/men" },
    { label: "Women", to: "/shop/women" },
    { label: "Unisex", to: "/shop/unisex" },
    { label: "Our Story", to: "/#story" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="icon-button mobile-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <Link
          to="/"
          className="brand-logo"
          aria-label="ZAYVORA home"
          onClick={() => setMenuOpen(false)}
        >
          ZAYVORA
          <span>THE ART OF LEAVING A TRACE</span>
        </Link>

        <nav
          className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            aria-label="Search fragrances"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search />
          </button>

          <Link
            to="/wishlist"
            className="icon-button count-link"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart />
            <span className="count-badge">{wishlistCount}</span>
          </Link>

          <button
            className="icon-button count-link"
            aria-label={`Shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag />
            <span className="count-badge">{cartCount}</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <form className="navbar-search" onSubmit={submitSearch}>
          <Search size={18} />
          <input
            autoFocus
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your signature scent..."
            aria-label="Search fragrances"
          />
          <button type="submit" className="search-submit">
            SEARCH
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <X />
          </button>
        </form>
      )}
    </header>
  );
}
