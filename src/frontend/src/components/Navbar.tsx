import { Link } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
          <span
            className={`font-serif text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            tail<span className="text-gold">Ezy</span>
          </span>
          <Scissors className="w-4 h-4 text-gold" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Order", to: "/order" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-gold ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              data-ocid="nav.link"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/order"
          className="hidden md:inline-flex items-center px-5 py-2 bg-gold text-foreground text-xs font-bold tracking-widest uppercase transition-all hover:bg-gold-dark hover:shadow-gold"
          data-ocid="nav.primary_button"
        >
          Book Now
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Order", to: "/order" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-xs font-bold tracking-widest uppercase text-foreground hover:text-gold"
              onClick={() => setMenuOpen(false)}
              data-ocid="nav.link"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/order"
            className="inline-flex items-center justify-center px-5 py-2 bg-gold text-foreground text-xs font-bold tracking-widest uppercase"
            onClick={() => setMenuOpen(false)}
            data-ocid="nav.primary_button"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
