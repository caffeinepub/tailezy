import { Link } from "@tanstack/react-router";
import { Home, Package, Scissors, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: <Package className="w-5 h-5" />,
    title: "Place Order",
    desc: "Open the app, describe your alteration or stitching need, and confirm your request in under 2 minutes.",
  },
  {
    icon: <Home className="w-5 h-5" />,
    title: "Pickup from Home",
    desc: "Our courier arrives at your doorstep at the scheduled time to collect your garment — no trips, no queues.",
  },
  {
    icon: <Scissors className="w-5 h-5" />,
    title: "Alteration by Expert",
    desc: "A certified tailor works on your garment with precision and care, following your exact specifications.",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Delivered within Hours",
    desc: "Your perfectly altered garment is returned to you — fresh, folded, and ready to wear.",
  },
];

const audience = [
  {
    title: "Working Professionals",
    desc: "No time for traditional tailor visits? tailEzy fits around your 9-to-9 schedule.",
  },
  {
    title: "Students",
    desc: "Affordable alterations for formals, ethnic wear, and everyday outfits — delivered fast.",
  },
  {
    title: "Urban Dwellers",
    desc: "City life moves fast. tailEzy moves faster — no compromise on quality or convenience.",
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

export default function AboutPage() {
  const storyView = useInView();
  const howView = useInView();
  const audienceView = useInView();

  return (
    <div className="pt-16">
      {/* Hero band */}
      <section className="bg-dark py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
            Redefining the
            <br />
            <span className="text-gold">Tailoring Experience</span>
          </h1>
          <div className="w-12 h-px bg-gold mx-auto mt-5" />
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="bg-white py-20" ref={storyView.ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={storyView.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
              The Problem We Solve
            </p>
            <h2 className="font-serif text-3xl font-bold mb-5">
              Traditional Tailoring is Broken
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Traditional tailoring comes with painful delays — multiple visits,
              uncertain turnaround times, and the inconvenience of traveling to
              a tailor's shop. For India's growing urban population, this model
              simply doesn't work anymore.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              tailEzy was founded in 2024 by a team of fashion technologists and
              logistics experts who believed that getting a perfect fit
              shouldn't require sacrifice. Inspired by the on-demand model of
              food and grocery delivery, we built a platform that brings
              certified tailors to your doorstep.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From a single shirt hem to a complete suit fitting — every job is
              treated with luxury-grade care, delivered with startup-speed
              efficiency.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={storyView.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <img
              src="/assets/generated/tailor-workshop.dim_800x600.jpg"
              alt="Expert tailor at work"
              className="w-full object-cover"
              style={{ maxHeight: 420 }}
            />
            <div className="absolute -bottom-4 -right-4 bg-gold p-5">
              <p className="font-serif text-2xl font-bold text-foreground">
                10+
              </p>
              <p className="text-xs font-semibold text-foreground/70 tracking-widest uppercase">
                Years Expertise
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-dark-2 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4">
            Our Mission
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl text-white font-semibold italic leading-relaxed">
            &ldquo;To make tailoring as fast and easy as ordering
            groceries.&rdquo;
          </blockquote>
          <div className="w-12 h-px bg-gold mx-auto mt-6" />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20" ref={howView.ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
              Simple Process
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              How It Works
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-4" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={howView.inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex gap-6 items-start"
                  data-ocid={`how.item.${i + 1}` as string}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-foreground z-10">
                    {step.icon}
                  </div>
                  <div className="pb-2">
                    <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1">
                      Step {i + 1}
                    </p>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-secondary py-20" ref={audienceView.ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
              Built For
            </p>
            <h2 className="font-serif text-3xl font-bold">
              Our Target Audience
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audience.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                animate={audienceView.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-7 bg-white border border-border hover:border-gold transition-all"
                data-ocid={`audience.card.${i + 1}` as string}
              >
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="font-serif text-lg font-semibold mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-14 text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
          Experience tailEzy Today
        </h2>
        <Link
          to="/order"
          className="inline-flex items-center px-8 py-3 bg-foreground text-white font-bold text-sm tracking-widest uppercase transition-all hover:opacity-90"
          data-ocid="about.primary_button"
        >
          Place Your Order
        </Link>
      </section>
    </div>
  );
}
