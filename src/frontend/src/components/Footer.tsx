import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Scissors, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-dark-2 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-2xl font-bold">
                tail<span className="text-gold">Ezy</span>
              </span>
              <Scissors className="w-4 h-4 text-gold" />
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Instant tailoring at your doorstep. Alterations done in hours, not
              days.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Order", to: "/order" },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-white/60 hover:text-gold transition-colors"
                  data-ocid="nav.link"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold mb-4">
              Contact
            </h4>
            <p className="text-sm text-white/60">hello@tailezy.com</p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20tailoring%20help!"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/30">
            &copy; {year} tailEzy. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-gold"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
