import { Link } from "@tanstack/react-router";
import { Briefcase, MapPin, Scissors, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const taglineWords = ["Fast.", "Premium.", "Convenient.", "Yours."];

const features = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Fast Pickup & Delivery",
    desc: "We collect and return your garments within hours, fitting around your busy schedule.",
  },
  {
    icon: <Scissors className="w-7 h-7" />,
    title: "Expert Tailors",
    desc: "Every alteration is handled by certified tailoring professionals with 10+ years of experience.",
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    title: "Real-Time Tracking",
    desc: "Track your garment from pickup to delivery with live status updates at every step.",
  },
  {
    icon: <Briefcase className="w-7 h-7" />,
    title: "Perfect for Professionals",
    desc: "Designed for busy urban lifestyles — no waiting, no hassle, just perfect fits.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function HomePage() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const featuresView = useInView();

  useEffect(() => {
    const id = setInterval(
      () => setTaglineIdx((i) => (i + 1) % taglineWords.length),
      2500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Premium Tailoring Service
              </span>
            </div>

            {/* Animated tagline word */}
            <div className="h-8 mb-2 overflow-hidden">
              <motion.span
                key={taglineIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-gold font-serif text-2xl font-semibold italic"
              >
                {taglineWords[taglineIdx]}
              </motion.span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Instant Tailoring
              <br />
              at Your Doorstep
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed">
              Alterations done in hours, not days.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/order"
                className="inline-flex items-center px-7 py-3 bg-gold text-foreground font-bold text-sm tracking-widest uppercase transition-all hover:bg-gold-dark hover:shadow-gold"
                data-ocid="home.primary_button"
              >
                Book Now
              </Link>
              <button
                type="button"
                className="inline-flex items-center px-7 py-3 border border-gold text-gold font-bold text-sm tracking-widest uppercase transition-all hover:bg-gold/10"
                data-ocid="home.secondary_button"
              >
                Download App
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 lg:py-28" ref={featuresView.ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
              Why Choose Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Our Services
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresView.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-6 border border-border hover:border-gold transition-all hover:shadow-gold"
                data-ocid={`features.card.${i + 1}` as string}
              >
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform inline-block">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gold py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Ready for your perfect fit?
            </h2>
            <p className="text-foreground/70 mt-1 text-sm">
              Book now and get your order delivered within hours.
            </p>
          </div>
          <Link
            to="/order"
            className="inline-flex items-center px-8 py-3 bg-foreground text-white font-bold text-sm tracking-widest uppercase transition-all hover:opacity-90"
            data-ocid="home.cta_button"
          >
            Place Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}
