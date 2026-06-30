"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Clock3, Instagram, MapPin, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import ShuffleCollage from "./ShuffleCollage";

const Silk = dynamic(() => import("./Silk"), { ssr: false });

const nav = [
  ["Home", "home"], ["Inside", "inside"], ["Menu", "menu"], ["Community", "community"], ["Visit", "visit"], ["Founders", "founders"],
];

const menu = {
  "Signature + Clouds": [
    ["Strawberry Matcha", "$7.95", "Strawberry milk, ceremonial matcha"],
    ["Caramelized Banana Matcha", "$7.95", "Banana cream, caramel, matcha"],
    ["Shaken Brown Sugar Espresso", "$6.50", "Brown sugar, double espresso"],
    ["Coconut Cloud Matcha", "$7.95", "Coconut cloud, matcha"],
    ["Sea Salt Matcha Cloud", "$8.50", "Sea salt cream, matcha"],
    ["Honeycomb Cold Brew Cloud", "$6.95", "Cold brew, honeycomb cloud"],
  ],
  Coffee: [
    ["Espresso", "$4.00", "Double shot"],
    ["Americano", "$4.25", "Hot · Iced $4.50"],
    ["Cortado", "$4.70", "Equal parts espresso and milk"],
    ["Flat White", "$5.00", "Velvety microfoam"],
    ["Latte", "$5.70", "Hot · Iced $5.90"],
    ["Spanish Latte", "$6.40", "Hot · Iced $6.90"],
  ],
  "Not Coffee": [
    ["Matcha Latte", "$6.00", "Hot · Iced $6.50"],
    ["Hojicha Latte", "$5.50", "Hot · Iced $6.00"],
    ["Thai Iced Tea", "$6.50", "Creamy and spiced"],
    ["Mango Dragonfruit Refresher", "$6.00", "Bright, tropical, sparkling"],
  ],
  Sandwiches: [
    ["Twincado", "$13.00", "Our signature avocado sandwich"],
    ["Spicy Chicken Caesar", "$16.00", "Creamy, crunchy, spicy"],
    ["Smoked Sammy", "$15.50", "Smoky, stacked, satisfying"],
    ["Pesto Avocado", "$11.00", "Vegan · fresh basil pesto"],
  ],
  "Soft Serve": [["Matcha Soft Serve", "$7.00", "Silky, earthy, iced-only energy"]],
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("Signature + Clouds");
  const currentItems = menu[category as keyof typeof menu];

  return (
    <main>
      <motion.header className="site-nav">
        <a href="#home" className="brand" aria-label="Tiny Twin home"><span>Tiny Twin</span><small>by Twinscafe</small></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </motion.header>
      <AnimatePresence>{menuOpen && (
        <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          {nav.map(([label, id]) => <a key={id} onClick={() => setMenuOpen(false)} href={`#${id}`}>{label}</a>)}
        </motion.nav>
      )}</AnimatePresence>

      <section id="home" className="hero">
        <div className="silk-background" aria-hidden="true">
          <Silk speed={4.2} scale={1.15} color="#2B6FBE" noiseIntensity={0.85} rotation={0.18} />
        </div>
        <div className="hero-scribble one" /><div className="hero-scribble two" />
        <div className="hero-copy">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow light"><Sparkles size={15} /> Vancouver’s playful blue café</motion.p>
          <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }}>
            Tiny place.<br/><span>Big flavour.</span>
          </motion.h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}>
            Signature matcha, coffee, refreshers, soft serve, and sandwiches made to brighten your day.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
            <a className="btn cream" href="#menu">Explore the menu <ArrowDownRight /></a>
            <a className="text-link" href="#visit">Find the café <ArrowUpRight size={18} /></a>
          </motion.div>
        </div>
        <motion.div className="hero-image" initial={{ opacity: 0, y: 80, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ duration: 1, delay: .15 }}>
          <div className="hero-photo">
            <Image src="/tiny-twin/drink.webp" alt="Tiny Twin strawberry matcha drink" fill priority sizes="(max-width: 900px) 80vw, 42vw" />
          </div>
          <motion.div className="float-badge" animate={{ rotate: [8, 12, 8], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }}>matcha<br/>magic ✦</motion.div>
        </motion.div>
        <div className="hero-marquee" aria-label="Tiny drinks, big mood. Stay playful.">
          <div className="marquee-track">
            <span>tiny drinks, big mood ✦ stay playful ✦ colourful sips ✦ made for sharing ✦ </span>
            <span aria-hidden="true">tiny drinks, big mood ✦ stay playful ✦ colourful sips ✦ made for sharing ✦ </span>
          </div>
        </div>
        <div className="hero-transition" aria-hidden="true" />
      </section>

      <section id="inside" className="inside">
        <div className="collage-heading">
          <p className="eyebrow light">Tiny Twin in motion</p>
          <h2>Inside Tiny Twin</h2>
          <p>Nine playful portraits drifting in their own rhythm, like a gentle current.</p>
        </div>
        <ShuffleCollage />
      </section>

      <section id="menu" className="menu-section section">
        <Reveal className="menu-intro"><p className="eyebrow light">Straight from the board</p><h2>Pick your<br/><i>tiny treat.</i></h2><p>No fuss. Just very good drinks and very good sandwiches.</p></Reveal>
        <div className="menu-board">
          <div className="menu-tools">
            <div className="menu-tabs">{Object.keys(menu).map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? "active" : ""}>{c}</button>)}</div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div className="menu-items" key={category} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {currentItems.map(([name, price, desc]) => <article key={name}><div className="menu-image-placeholder" aria-label={`${name} image placeholder`}><span>Photo<br/>coming soon</span></div><div className="menu-copy"><h3>{name}</h3><p>{desc}</p></div><strong>{price}</strong></article>)}
            </motion.div>
          </AnimatePresence>
          <p className="menu-note">Oat milk +$0.50 · Vanilla, brown sugar, or agave +$0.50</p>
        </div>
      </section>

      <section id="community" className="community section">
        <Reveal className="community-intro"><p className="eyebrow light">From your camera roll</p><h2>Sipped, snapped,<br/><i>and shared.</i></h2><p>Customer café moments, favourite food photos, and honest little reviews live here.</p></Reveal>
        <div className="community-grid">
          {[
            ["Customer café photo", "Your mirror selfie or café moment", "Tag us to be featured"],
            ["Customer food photo", "Your favourite Tiny Twin order", "Photo review placeholder"],
            ["Drink review photo", "Matcha, coffee, or refresher close-up", "Customer review placeholder"],
            ["Community moment", "Friends, food, and blue café energy", "Tag us to be featured"],
          ].map(([title, copy, note], i) => (
            <motion.article key={title} whileHover={{ y: -10, rotate: i % 2 ? 1 : -1 }}>
              <div className="customer-photo-placeholder"><Instagram /><span>Add customer photo</span></div>
              <div className="customer-caption"><small>{note}</small><h3>{title}</h3><p>{copy}</p><div className="review-stars">★★★★★</div></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="visit" className="visit section">
        <div className="visit-card">
          <div><p className="eyebrow light">See you soon</p><h2>Come visit<br/><i>Tiny Twin.</i></h2><p>Drop by for a matcha, a sandwich, and a mirror pic. You know the drill.</p></div>
          <div className="visit-details">
            <p><MapPin/> 2985 Granville Street<br/><span>Vancouver, BC</span></p>
            <p><Clock3/> Hours<br/><span>Opening hours coming soon</span></p>
          </div>
          <div className="visit-actions"><a className="btn cream" href="https://maps.google.com/?q=2985+Granville+Street+Vancouver" target="_blank" rel="noreferrer">Get directions <ArrowUpRight/></a><a className="btn outline" href="#"><Instagram/> Follow along</a></div>
        </div>
      </section>

      <section id="founders" className="founders section">
        <Reveal className="section-head"><p className="eyebrow">Two minds, one tiny café</p><h2>Meet the twins<br/><i>behind the blue.</i></h2><p>A playful café built with care, creativity, and a love for drinks that make people smile.</p></Reveal>
        <div className="founder-grid">
          {[
            ["Ehsan", "/tiny-twin/founder-ehsan.jpeg", "Tiny Twin was created to be a bright, playful space where every drink feels personal, fun, and worth sharing."],
            ["Sinaan", "/tiny-twin/founder-sinaan.jpeg", "We wanted to build a café that feels fresh, welcoming, and full of small details that make people smile."],
          ].map(([name,src,copy],i) => <motion.article key={name} whileHover={{ rotate: i ? 1.5 : -1.5, y: -8 }}><div className="founder-photo"><Image src={src} alt={`${name}, co-founder of Tiny Twin`} fill sizes="(max-width: 700px) 90vw, 430px" /></div><p className="eyebrow">Co-founder</p><h3>{name}</h3><p>{copy}</p></motion.article>)}
        </div>
      </section>

      <footer><div className="footer-brand">Tiny Twin <small>by Twinscafe</small></div><p>Playful drinks, coffee, matcha, soft serve, and sandwiches.</p><nav>{nav.slice(0,4).map(([label,id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><p className="copyright">© 2026 Tiny Twin by Twinscafe</p></footer>
    </main>
  );
}
