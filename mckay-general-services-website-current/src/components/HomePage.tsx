"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  CheckCircle2,
  Clock,
  Hammer,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Mountain,
  MoveRight,
  PackageCheck,
  Phone,
  Pickaxe,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";

const navItems = ["Home", "Services", "About", "Projects", "Contact"];

const services = [
  { title: "Moving & Hauling", icon: Truck, text: "Careful loading, transport and hauling for homes, shops and small sites." },
  { title: "Yard Work & Property Cleanup", icon: Pickaxe, text: "Seasonal cleanups, overgrowth removal and property refreshes." },
  { title: "Junk Removal & Haul Off", icon: PackageCheck, text: "Old furniture, clutter, renovation debris and unwanted items gone fast." },
  { title: "General Labour", icon: HardHat, text: "Dependable extra hands for lifting, loading, cleanup and project support." },
  { title: "Contracting Assistance", icon: Hammer, text: "Reliable site help for contractors who need capable support." },
  { title: "Furniture Moving", icon: MoveRight, text: "Heavy, awkward or delicate furniture moved with care and control." },
  { title: "Debris Removal", icon: Wrench, text: "Post-project debris cleared so the space is ready for what comes next." },
  { title: "Garage Cleanouts", icon: ShieldCheck, text: "Organized cleanouts for garages, sheds, storage spaces and estates." },
];

const trust: Array<[string, LucideIcon]> = [
  ["Serving Kelowna & Surrounding Area", MapPin],
  ["Reliable Service", ShieldCheck],
  ["Affordable Rates", BadgeDollarSign],
  ["Free Estimates", CheckCircle2],
];

const reasons = [
  "Reliable",
  "Hard Working",
  "On Time",
  "Fully Equipped",
  "Friendly Service",
  "Competitive Pricing",
  "Professional Results",
];

const projects = [
  "Residential Move",
  "Property Cleanup",
  "Junk Removal",
  "General Labour",
  "Hauling Services",
];

const reviews = [
  {
    name: "Amanda R.",
    text: "Nick showed up exactly when he said he would and handled a full garage cleanout in one afternoon. Straightforward, fair and hardworking.",
  },
  {
    name: "Devon P.",
    text: "We needed help moving heavy furniture on short notice. McKay General Services made it easy and treated everything with care.",
  },
  {
    name: "Shannon M.",
    text: "Reliable, friendly and efficient. The yard cleanup looked better than expected and the price was very reasonable.",
  },
  {
    name: "Tyler B.",
    text: "Great support on a small contracting job. Nick came prepared, worked hard and kept the site clean.",
  },
  {
    name: "Melissa C.",
    text: "Fast quote, clear communication and no fuss. I would absolutely call McKay again for hauling or junk removal.",
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function sectionId(item: string) {
  return item.toLowerCase();
}

function ButtonRipple({
  children,
  href,
  dark = false,
}: {
  children: React.ReactNode;
  href: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      className={`gold-sheen group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-black uppercase tracking-[0.16em] shadow-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-gold/35 ${
        dark
          ? "bg-charcoal text-white hover:bg-burgundy"
          : "bg-gold text-charcoal hover:bg-white"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-24 overflow-hidden rounded-[6px] bg-white shadow-md ring-1 ring-black/10 md:h-14 md:w-32">
        <Image
          src="/brand/mckay-logo-crop.png"
          alt="McKay General Services official logo"
          fill
          sizes="128px"
          className="object-contain p-1"
          priority
        />
      </div>
      {!compact && (
        <div className="hidden leading-none sm:block">
          <div className="font-display text-lg font-black uppercase text-white drop-shadow-sm">McKay</div>
          <div className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.24em] text-gold">
            General Services
          </div>
        </div>
      )}
    </div>
  );
}

function WorkerPlaceholder({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[8px] border border-white/15 bg-charcoal shadow-2xl ${
        tall ? "min-h-[520px]" : "min-h-[430px]"
      }`}
    >
      {/* Replace this visual block with a professional photo of a worker loading equipment into a truck. */}
      <div className="industrial-texture absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(214,165,44,0.34),transparent_30%),linear-gradient(135deg,rgba(169,71,79,0.58),transparent_42%),linear-gradient(180deg,rgba(32,32,32,0.08),rgba(32,32,32,0.92))]" />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -14, 0], rotate: [0, -1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-14 left-8 right-8 rounded-[8px] border border-gold/45 bg-white/9 p-6 text-white shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-gold text-charcoal">
            <Truck className="h-7 w-7" aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-2xl font-black uppercase">{label}</p>
            <p className="mt-1 text-sm text-white/72">Official project image placeholder</p>
          </div>
        </div>
      </motion.div>
      <div className="absolute right-5 top-5 rounded-full bg-burgundy px-4 py-2 font-display text-sm font-black uppercase tracking-[0.16em] text-white">
        Free Estimates
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <p className="font-display text-sm font-black uppercase tracking-[0.28em] text-burgundy">{eyebrow}</p>
      <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.95] text-charcoal md:text-7xl">
        {title}
      </h2>
      {text && <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-charcoal/68">{text}</p>}
    </motion.div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 120]);
  const particleY = useTransform(scrollY, [0, 800], [0, -90]);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${12 + ((i * 19) % 74)}%`,
        delay: i * 0.12,
        size: 3 + (i % 4),
      })),
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-bold focus:text-charcoal"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-charcoal/92 py-3 shadow-2xl backdrop-blur-xl" : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6" aria-label="Main navigation">
          <a href="#home" aria-label="McKay General Services home">
            <LogoMark />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${sectionId(item)}`}
                className="group relative text-sm font-black uppercase tracking-[0.16em] text-white transition hover:text-gold"
              >
                {item}
                <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:2503172327" className="text-sm font-black text-white hover:text-gold">
              250-317-2327
            </a>
            <ButtonRipple href="#contact">Free Estimate</ButtonRipple>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur-lg transition hover:bg-gold hover:text-charcoal lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 rounded-[8px] border border-white/12 bg-charcoal/96 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${sectionId(item)}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-[6px] px-4 py-3 font-display text-lg font-black uppercase text-white transition hover:bg-white/8 hover:text-gold"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-charcoal"
              >
                Free Estimate
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <section id="home" className="relative min-h-screen bg-charcoal pt-28 text-white">
        <div className="industrial-texture absolute inset-0 opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(32,32,32,0.98)_0%,rgba(32,32,32,0.90)_44%,rgba(169,71,79,0.48)_72%,rgba(214,165,44,0.22)_100%)]" />
        <motion.div style={{ y: particleY }} className="absolute inset-0">
          {particles.map((particle) => (
            <motion.span
              key={`${particle.left}-${particle.top}`}
              className="absolute rounded-full bg-gold/55"
              style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
              animate={{ opacity: [0.18, 0.85, 0.18], y: [0, -22, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-4 pb-20 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-gold backdrop-blur-md">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Owner operated in Kelowna
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-6xl font-black uppercase leading-[0.86] tracking-normal md:text-8xl xl:text-9xl">
              Reliable.
              <span className="block text-gold">Hard Work.</span>
              <span className="block text-white">Done Right.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              Professional moving, hauling, property cleanup, junk removal and general labour services throughout Kelowna and surrounding areas.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonRipple href="#contact">Get Free Estimate</ButtonRipple>
              <a
                href="#services"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/18 bg-white/8 px-6 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:border-gold hover:bg-gold/12 hover:text-gold focus:outline-none focus:ring-4 focus:ring-white/20"
              >
                Our Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: heroY }} initial={{ opacity: 0, x: 60, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div className="absolute -inset-4 rounded-[8px] bg-gradient-to-tr from-burgundy/60 via-gold/35 to-white/10 blur-2xl" />
            <WorkerPlaceholder label="Moving & Hauling" />
          </motion.div>
        </div>
      </section>

      <section aria-label="Trust highlights" className="relative z-10 -mt-14 px-4">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {trust.map(([label, Icon]) => (
            <motion.div
              key={label as string}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -7 }}
              className="rounded-[8px] border border-charcoal/8 bg-white/88 p-6 shadow-2xl backdrop-blur-xl"
            >
              <Icon className="h-7 w-7 text-burgundy" aria-hidden="true" />
              <p className="mt-4 font-display text-xl font-black uppercase leading-tight text-charcoal">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="services" className="section-pad bg-white">
        <SectionHeader eyebrow="Services Offered" title="What We Do" text="From one heavy item to a full property cleanup, McKay General Services brings the truck, tools and steady work ethic." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, icon: Icon, text }, index) => (
            <motion.a
              href="#contact"
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.015 }}
              key={title}
              className="group relative min-h-[260px] overflow-hidden rounded-[8px] border border-charcoal/10 bg-white p-6 shadow-[0_18px_60px_rgba(32,32,32,0.08)] transition duration-300 hover:border-gold hover:shadow-[0_24px_80px_rgba(214,165,44,0.24)]"
            >
              <span className="absolute left-0 top-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              <div className="flex items-start justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-charcoal text-gold transition group-hover:bg-gold group-hover:text-charcoal">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <span className="font-display text-4xl font-black text-charcoal/8">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-black uppercase leading-none text-charcoal">{title}</h3>
              <p className="mt-4 leading-7 text-charcoal/62">{text}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-burgundy">
                Request Service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <section className="section-pad bg-[#f7f5ef]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.75 }}>
            <WorkerPlaceholder label="Fully Equipped" tall />
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="font-display text-sm font-black uppercase tracking-[0.28em] text-burgundy">Why Choose Us</motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-5xl font-black uppercase leading-[0.95] text-charcoal md:text-7xl">
              Built for the jobs people put off.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-charcoal/68">
              You get clear communication, practical problem solving and a strong pair of hands ready to take care of the work.
            </motion.p>
            <motion.div variants={stagger} className="mt-9 grid gap-3 sm:grid-cols-2">
              {reasons.map((reason) => (
                <motion.div key={reason} variants={fadeUp} className="flex items-center gap-3 rounded-[8px] border border-charcoal/8 bg-white p-4 shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-charcoal">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-black text-charcoal">{reason}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section-pad bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="font-display text-sm font-black uppercase tracking-[0.28em] text-burgundy">Owner / Operator</motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-5xl font-black uppercase leading-[0.95] text-charcoal md:text-7xl">
              Meet Nick McKay
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-charcoal/70">
              McKay General Services is built on one simple promise: reliable, honest work done right the first time. Whether it is moving, hauling, property cleanup, or general labour, every project is treated with professionalism and attention to detail.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["250", "Local calls"],
                ["100%", "Owner operated"],
                ["Free", "Estimates"],
              ].map(([stat, label]) => (
                <div key={label} className="rounded-[8px] border border-charcoal/8 bg-[#f7f5ef] p-5">
                  <div className="font-display text-4xl font-black uppercase text-burgundy">{stat}</div>
                  <div className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-charcoal/60">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.75 }} className="relative">
            <div className="absolute -inset-4 rounded-[8px] bg-gradient-to-tr from-gold/25 to-burgundy/20 blur-2xl" />
            {/* Replace this visual block with a professional portrait of Nick McKay. */}
            <div className="relative overflow-hidden rounded-[8px] border border-charcoal/10 bg-charcoal p-7 shadow-2xl">
              <div className="industrial-texture absolute inset-0 opacity-40" />
              <div className="relative grid min-h-[460px] place-items-center rounded-[6px] border border-white/10 bg-white/6 text-center text-white">
                <Mountain className="h-24 w-24 text-gold" aria-hidden="true" />
                <div className="absolute bottom-8 left-8 right-8 rounded-[8px] bg-white/10 p-5 text-left backdrop-blur-md">
                  <p className="font-display text-3xl font-black uppercase">Nick McKay</p>
                  <p className="mt-1 font-bold uppercase tracking-[0.18em] text-gold">Owner / Operator</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section-pad bg-charcoal text-white">
        <SectionHeader eyebrow="Project Showcase" title="Work That Shows" text="A polished gallery structure ready for real job photos, with quick preview interactions built in." />
        <div className="mx-auto grid max-w-7xl auto-rows-[220px] gap-5 md:grid-cols-4">
          {projects.map((project, index) => (
            <motion.button
              key={project}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelectedProject(project)}
              className={`group relative overflow-hidden rounded-[8px] border border-white/10 bg-white/6 text-left shadow-2xl focus:outline-none focus:ring-4 focus:ring-gold/45 ${
                index === 0 || index === 3 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Replace this placeholder with a real project image for this caption. */}
              <div className="industrial-texture absolute inset-0 opacity-50 transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-br from-burgundy/58 via-charcoal/35 to-gold/32 transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-3xl font-black uppercase leading-none">{project}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-gold">View project</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="section-pad bg-white">
        <SectionHeader eyebrow="Simple Process" title="Four Steps" text="Clear scheduling, steady work and a clean finish from first call to completed job." />
        <div className="mx-auto max-w-6xl">
          <div className="relative grid gap-5 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-charcoal/10 md:block" />
            {["Request Estimate", "Schedule Service", "We Get To Work", "Job Complete"].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-[8px] border border-charcoal/8 bg-[#f7f5ef] p-6 shadow-sm"
              >
                <div className="grid h-20 w-20 place-items-center rounded-full border-8 border-white bg-gold font-display text-3xl font-black text-charcoal shadow-xl">
                  {index + 1}
                </div>
                <h3 className="mt-8 font-display text-2xl font-black uppercase text-charcoal">{step}</h3>
                <p className="mt-3 leading-7 text-charcoal/62">
                  {index === 0 && "Send the job details and get a clear, no-pressure estimate."}
                  {index === 1 && "Pick a time that works and know what to expect before arrival."}
                  {index === 2 && "Nick arrives prepared with the tools, truck and work ethic needed."}
                  {index === 3 && "The work is completed cleanly, carefully and with no loose ends."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f7f5ef]">
        <SectionHeader eyebrow="Reviews" title="Trusted Locally" text="Placeholder testimonials styled for Google-style review cards until live reviews are connected." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto grid max-w-7xl gap-5 md:grid-cols-5">
          {reviews.map((review) => (
            <motion.article key={review.name} variants={fadeUp} whileHover={{ y: -8 }} className="rounded-[8px] border border-charcoal/8 bg-white p-6 shadow-lg md:col-span-1">
              <div className="flex gap-1 text-gold" aria-label="Five star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 leading-7 text-charcoal/70">&quot;{review.text}&quot;</p>
              <p className="mt-5 font-display text-xl font-black uppercase text-charcoal">{review.name}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="relative overflow-hidden bg-charcoal px-4 py-24 text-white">
        <div className="industrial-texture absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(169,71,79,0.55),transparent_46%,rgba(214,165,44,0.22))]" />
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="font-display text-6xl font-black uppercase leading-[0.9] md:text-8xl">
            Need a Hand?
            <span className="block text-gold">We&apos;ll Handle It.</span>
          </h2>
          <ButtonRipple href="#contact">Request Your Free Estimate</ButtonRipple>
        </motion.div>
      </section>

      <section id="contact" className="section-pad bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="font-display text-sm font-black uppercase tracking-[0.28em] text-burgundy">Contact</motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 font-display text-5xl font-black uppercase leading-[0.95] text-charcoal md:text-7xl">
              Let&apos;s Get It Done.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-charcoal/68">
              Call, email or send the form with the service you need. Free estimates are available across Kelowna and the surrounding area.
            </motion.p>
            <motion.div variants={stagger} className="mt-10 grid gap-4">
              {[
                [Phone, "Phone", "250-317-2327", "tel:2503172327"],
                [Mail, "Email", "nickhmckay93@gmail.com", "mailto:nickhmckay93@gmail.com"],
                [MapPin, "Service Area", "Kelowna & Surrounding Area", "#contact"],
              ].map(([Icon, label, value, href]) => {
                const ContactIcon = Icon as typeof Phone;
                return (
                  <motion.a key={label as string} variants={fadeUp} href={href as string} className="flex items-center gap-4 rounded-[8px] border border-charcoal/8 bg-[#f7f5ef] p-5 transition hover:border-gold hover:bg-white hover:shadow-lg">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-charcoal text-gold">
                      <ContactIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-black uppercase tracking-[0.18em] text-burgundy">{label as string}</span>
                      <span className="mt-1 block font-bold text-charcoal">{value as string}</span>
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={submitForm}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-[8px] border border-charcoal/10 bg-charcoal p-5 shadow-2xl md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white/80">
                Name
                <input className="min-h-12 rounded-[6px] border border-white/12 bg-white px-4 text-charcoal outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20" name="name" required />
              </label>
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white/80">
                Phone
                <input className="min-h-12 rounded-[6px] border border-white/12 bg-white px-4 text-charcoal outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20" name="phone" type="tel" required />
              </label>
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white/80 md:col-span-2">
                Email
                <input className="min-h-12 rounded-[6px] border border-white/12 bg-white px-4 text-charcoal outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20" name="email" type="email" required />
              </label>
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white/80 md:col-span-2">
                Service Needed
                <select className="min-h-12 rounded-[6px] border border-white/12 bg-white px-4 text-charcoal outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20" name="service" defaultValue="">
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => (
                    <option key={service.title}>{service.title}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white/80 md:col-span-2">
                Message
                <textarea className="min-h-36 rounded-[6px] border border-white/12 bg-white px-4 py-3 text-charcoal outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20" name="message" />
              </label>
            </div>
            <button className="gold-sheen mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gold px-6 text-sm font-black uppercase tracking-[0.18em] text-charcoal shadow-xl transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-gold/35" type="submit">
              Submit Free Estimate Request
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            {sent && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-[8px] border border-gold/30 bg-gold/12 p-4 font-bold text-gold">
                Request received. Nick will follow up as soon as possible.
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>

      <footer className="bg-charcoal px-4 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.7fr_0.8fr_0.8fr]">
          <div>
            <LogoMark />
            <p className="mt-5 max-w-sm leading-7 text-white/62">Reliable moving, hauling, property cleanup, junk removal and general labour across Kelowna and surrounding areas.</p>
          </div>
          <div>
            <h3 className="font-display text-xl font-black uppercase text-gold">Quick Links</h3>
            <div className="mt-4 grid gap-2 text-white/70">
              {navItems.map((item) => (
                <a key={item} href={`#${sectionId(item)}`} className="hover:text-gold">{item}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-black uppercase text-gold">Services</h3>
            <div className="mt-4 grid gap-2 text-white/70">
              {services.slice(0, 5).map((service) => (
                <a key={service.title} href="#services" className="hover:text-gold">{service.title}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-black uppercase text-gold">Contact</h3>
            <div className="mt-4 grid gap-2 text-white/70">
              <a href="tel:2503172327" className="hover:text-gold">250-317-2327</a>
              <a href="mailto:nickhmckay93@gmail.com" className="hover:text-gold">nickhmckay93@gmail.com</a>
              <span>Kelowna & Surrounding Area</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/52 md:flex-row">
          <span>© {new Date().getFullYear()} McKay General Services. All rights reserved.</span>
          <span>Reliable. Hard Work. Done Right.</span>
        </div>
      </footer>

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/86 p-4 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject} project preview`}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            className="relative min-h-[440px] w-full max-w-4xl overflow-hidden rounded-[8px] border border-white/15 bg-charcoal shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-charcoal transition hover:bg-gold"
              aria-label="Close project preview"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="industrial-texture absolute inset-0 opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-br from-burgundy/70 via-charcoal/40 to-gold/30" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="font-display text-5xl font-black uppercase">{selectedProject}</p>
              <p className="mt-3 max-w-2xl leading-7 text-white/72">Replace this placeholder with completed project photography. The lightbox behavior and premium hover motion are already wired in.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
