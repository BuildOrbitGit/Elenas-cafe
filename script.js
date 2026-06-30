const { useEffect, useState } = React;
const { motion, useReducedMotion } = Motion;
const html = htm.bind(React.createElement);

const navLeft = ['Home', 'Training', 'Programs'];
const navRight = ['About', 'Contact'];

const services = [
  { id: 'strength', title: 'Strength & Resistance Training' },
  { id: 'conditioning', title: 'Cardio, Sprints & Sport-Specific Conditioning' },
  { id: 'recovery', title: 'Functionality & Recovery' },
  { id: 'nutrition', title: 'Nutrition & Diet Guidance' },
  { id: 'sleep', title: 'Sleep Hygiene' },
  { id: 'mindset', title: 'Attitude & Perspective' },
  { id: 'synergy', title: 'Synergy Coaching' }
];

const coachingLoopVideos = [
  'https://vxgcregvvin0amcz.public.blob.vercel-storage.com/coaching-loop-1.mp4',
  'https://vxgcregvvin0amcz.public.blob.vercel-storage.com/coaching-loop-2.mp4',
  'https://vxgcregvvin0amcz.public.blob.vercel-storage.com/coaching-loop-3.mp4'
];

const results = [
  {
    title: 'Strength',
    description: 'Build usable full-body strength through progressive resistance training, better technique, and smart load selection that fits your current ability.'
  },
  {
    title: 'Mobility',
    description: 'Improve joint control, range of motion, posture, and movement quality so your body feels more capable inside training and daily life.'
  },
  {
    title: 'Conditioning',
    description: 'Develop cardiovascular fitness, sprint capacity, stamina, and sport-specific endurance without burning out your recovery.'
  },
  {
    title: 'Confidence',
    description: 'Gain confidence through visible skill progress, stronger habits, clearer structure, and coaching that helps you trust your body again.'
  },
  {
    title: 'Discipline',
    description: 'Create repeatable routines, realistic standards, and accountability systems that make consistency easier when motivation changes.'
  },
  {
    title: 'Lifestyle Consistency',
    description: 'Connect training, food, sleep, recovery, and mindset into a sustainable weekly rhythm that supports long-term wellness.'
  }
];
const stats = ['20+ Years Experience', 'Award-Winning Athletes', 'Customized Coaching', 'All Ages & Capabilities'];

function slug(label) {
  return label.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and');
}

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

function SectionReveal({ children, className = '', id }) {
  return html`
    <${motion.section}
      id=${id}
      className=${className}
      initial="hidden"
      whileInView="show"
      viewport=${{ once: true, amount: 0.18 }}
      variants=${{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
    >${children}<//>
  `;
}

function Button({ href, children, variant = 'primary' }) {
  const base = 'inline-flex min-h-[52px] items-center justify-center px-7 py-4 font-display text-sm uppercase tracking-[.16em] transition duration-200 focus:outline-none focus:ring-4 focus:ring-bronze/25';
  const styles = variant === 'primary'
    ? 'bg-bronze text-ink shadow-bronze hover:bg-ember hover:-translate-y-0.5'
    : 'border border-white/18 bg-white/[.05] text-white hover:border-bronze/60 hover:bg-white/[.09] hover:-translate-y-0.5';
  return html`<a className=${`${base} ${styles}`} href=${href}>${children}</a>`;
}

function BackgroundPaths() {
  const reduce = useReducedMotion();
  const paths = Array.from({ length: 22 }, (_, index) => ({
    d: `M ${-220 + index * 20} ${78 + index * 24} C ${150 + index * 26} ${-42 + index * 10}, ${525 - index * 9} ${330 + index * 16}, ${1180 + index * 18} ${70 + index * 22}`,
    delay: index * 0.22,
    opacity: 0.14 + (index % 6) * 0.025,
    width: index % 4 === 0 ? 1.9 : 1.15
  }));

  return html`
    <svg className="path-layer pointer-events-none absolute inset-0 h-full w-full opacity-100" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
      ${paths.map((path, index) => html`
        <${motion.path}
          key=${index}
          d=${path.d}
          fill="none"
          stroke=${index % 3 === 0 ? '#d7b36b' : index % 3 === 1 ? '#ffffff' : '#6f8fb1'}
          strokeWidth=${path.width}
          strokeLinecap="round"
          initial=${{ pathLength: 0, opacity: 0 }}
          animate=${reduce ? { pathLength: 1, opacity: path.opacity } : { pathLength: [0.08, 1, 0.22], opacity: [0.04, path.opacity, 0.06], y: [0, -30, 0], x: [0, 16, 0] }}
          transition=${{ duration: 10 + (index % 7), repeat: Infinity, ease: 'easeInOut', delay: path.delay }}
        />
      `)}
    </svg>
  `;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mobileLinks = [...navLeft, ...navRight];
  return html`
    <header className=${`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled ? 'bg-ink/88 shadow-2xl backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <nav className="container-shell grid min-h-[82px] grid-cols-[1fr_auto_1fr] items-center gap-5" aria-label="Main navigation">
        <div className="hidden items-center gap-7 lg:flex">
          ${navLeft.map((item) => html`<a key=${item} className="nav-link" href=${`#${slug(item)}`}>${item}</a>`)}
        </div>
        <a href="#home" className="brand-text-only justify-self-start lg:justify-self-center" aria-label="A Pair Of Hammers home">
          <span>A Pair Of</span>
          <strong>Hammers</strong>
        </a>
        <div className="hidden items-center justify-end gap-7 lg:flex">
          ${navRight.map((item) => html`<a key=${item} className="nav-link" href=${`#${slug(item)}`}>${item}</a>`)}
        </div>
        <button className="ml-auto grid h-11 w-11 place-items-center border border-white/15 bg-white/[.04] text-white lg:hidden" type="button" aria-label=${open ? 'Close menu' : 'Open menu'} aria-expanded=${open} onClick=${() => setOpen(!open)}>
          ${open ? 'X' : 'Menu'}
        </button>
      </nav>
      <${motion.div} className="container-shell overflow-hidden lg:hidden" initial=${false} animate=${open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}>
        <div className="mb-4 grid gap-1 border border-white/10 bg-ink/95 p-3 backdrop-blur-xl">
          ${mobileLinks.map((item) => html`<a key=${item} className="nav-link px-3" href=${`#${slug(item)}`} onClick=${() => setOpen(false)}>${item}</a>`)}
        </div>
      <//>
    </header>
  `;
}

function Hero() {
  // Replace the hero-visual placeholder with a real photo of Kareem & Orane.
  return html`
    <section id="home" className="relative isolate min-h-screen overflow-hidden pt-[112px]">
      <${BackgroundPaths} />
      <div className="hero-gym-bg absolute inset-0 -z-20"></div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(200,155,79,.08),transparent_42%),repeating-linear-gradient(120deg,rgba(255,255,255,.035)_0_1px,transparent_1px_58px)]"></div>
      <div className="container-shell grid min-h-[calc(100svh-112px)] items-center gap-12 pb-24">
        <${motion.div} initial="hidden" animate="show" variants=${{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}>
          <${motion.p} variants=${fadeUp} className="mb-5 max-w-xl font-display text-xs uppercase tracking-[.24em] gold-text sm:text-sm">Award-winning athletes. Coaches. Lifestyle builders.</${motion.p}>
          <${motion.h1} variants=${fadeUp} className="display-tight max-w-4xl font-display text-[clamp(3rem,8vw,7.8rem)] uppercase text-white text-balance">Build Strength.<br/>Move Better.<br/>Live With Purpose.<//>
          <${motion.p} variants=${fadeUp} className="mt-7 max-w-2xl text-lg leading-8 muted-text sm:text-xl">Personal training built around your body, lifestyle, goals, and limitations - combining strength, conditioning, recovery, nutrition, sleep, and mindset into one complete coaching system.<//>
          <${motion.div} variants=${fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <${Button} href="#contact">Start Your Training<//>
            <${Button} href="#about" variant="secondary">Meet The Coaches<//>
          <//>
        <//>
      </div>
      <div className="angled-divider" aria-hidden="true"></div>
    </section>
  `;
}

function Programs() {
  const [currentClip, setCurrentClip] = useState(0);
  const orbitItems = services.map((item, index) => ({
    ...item,
    angle: `${index * (360 / services.length)}deg`, reverseAngle: `${index * -(360 / services.length)}deg`
  }));

  useEffect(() => {
    const clipTimer = window.setInterval(() => {
      setCurrentClip((clip) => (clip + 1) % coachingLoopVideos.length);
    }, 2000);

    return () => window.clearInterval(clipTimer);
  }, []);

  return html`
    <${SectionReveal} id="training" className="service-gallery wellness-section py-24 sm:py-32">
      <div className="wellness-video-bg" aria-hidden="true">
        ${coachingLoopVideos.map((clip, index) => html`
          <video
            key=${clip}
            className=${index === currentClip ? 'is-active' : ''}
            src=${clip}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          ></video>
        `)}
      </div>
      <div className="wellness-video-scrim" aria-hidden="true"></div>
      <div className="container-shell">
        <${motion.div} variants=${fadeUp} className="mx-auto max-w-4xl text-center">
          <p className="font-display text-sm uppercase tracking-[.24em] gold-text">Coaching System</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,5.6rem)] uppercase leading-none text-white">The A Pair Of Hammers Method</h2>
        <//>

        <${motion.div} variants=${fadeUp} id="programs" className="wellness-orbit-shell" aria-label="A Pair Of Hammers coaching services">
          <div className="wellness-geometry" aria-hidden="true">
            <svg viewBox="0 0 520 520" role="presentation">
              <circle className="geometry-soft" cx="260" cy="260" r="206" />
              <circle className="geometry-soft" cx="260" cy="260" r="146" />
              <polygon className="geometry-bold" points="260,78 417,169 417,351 260,442 103,351 103,169" />
              <polygon className="geometry-bold" points="260,112 385,385 135,385" />
              <polygon className="geometry-bold" points="260,408 135,135 385,135" />
              <path className="geometry-line" d="M103 169 L417 351 M417 169 L103 351 M260 78 L260 442 M103 260 L417 260 M167 113 L353 407 M353 113 L167 407" />
            </svg>
            <div className="wellness-core">
              <span>APH</span>
              <small>Performance<br/>Longevity</small>
            </div>
          </div>

          <div className="wellness-orbit">
            ${orbitItems.map((item) => html`
              <a key=${item.id} href="#contact" className="wellness-node" style=${{ '--angle': item.angle, '--reverse-angle': item.reverseAngle }} aria-label=${`${item.title} - start this path`}>
                <span className="wellness-node-line" aria-hidden="true"></span>
                <span className="wellness-node-content">
                  <strong>${item.title}</strong>
                  <em>Start this path</em>
                </span>
              </a>
            `)}
          </div>
        <//>
      </div>
    <//>
  `;
}
function About() {
  const coaches = [
    { name: 'Kareem', title: 'Co-Founder | Strength & Performance Coach', bio: 'Award-winning athlete and coach focused on building strength, confidence, discipline, and training systems that respect each client\'s real life.' },
    { name: 'Orane', title: 'Co-Founder | Conditioning & Lifestyle Coach', bio: 'Award-winning athlete and coach bringing a practical, adaptive approach to conditioning, sport performance, recovery, and sustainable routines.' }
  ];
  return html`
    <${SectionReveal} id="about" className="bg-black/20 py-24 sm:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
        <${motion.div} variants=${fadeUp}>
          <p className="font-display text-sm uppercase tracking-[.24em] gold-text">Meet Kareem & Orane</p>
          <h2 className="mt-4 font-display text-[clamp(2.3rem,5vw,5rem)] uppercase leading-none text-white">Award-winning athletes. Individual-first coaches.</h2>
          <p className="mt-6 text-lg leading-8 muted-text">Kareem and Orane are award-winning athletes with over 20 years of combined experience across sport, training, and coaching. Their approach is built on the belief that longevity and wellness are achievable for everyone when coaching is customized to the individual.</p>
          <div className="mt-8 grid gap-3 text-sm font-bold uppercase tracking-[.14em] text-white/78 sm:grid-cols-2">
            ${['All ages welcome', 'All capabilities welcome', 'Adapted around lifestyle', 'Multiple coaching disciplines'].map((item) => html`<span key=${item} className="border border-white/10 bg-white/[.04] px-4 py-3">${item}</span>`)}
          </div>
        <//>
        <div className="grid gap-5 sm:grid-cols-2">
          ${coaches.map((coach) => html`
            <${motion.article} key=${coach.name} variants=${fadeUp} whileHover=${{ y: -6 }} className="glass-card overflow-hidden">
              <div className="relative h-80 bg-gradient-to-br from-steel via-midnight to-ink">
                <div className="absolute inset-6 border border-bronze/35 bg-white/[.035]"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-5xl uppercase text-white">${coach.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[.18em] text-white/52">Coach image placeholder</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl uppercase text-white">${coach.title}</h3>
                <p className="mt-4 leading-7 muted-text">${coach.bio}</p>
              </div>
            <//>
          `)}
        </div>
      </div>
    <//>
  `;
}

function WhyChoose() {
  return html`
    <${SectionReveal} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(200,155,79,.14),transparent_28%),linear-gradient(180deg,rgba(19,34,53,.72),rgba(5,9,20,.96))]"></div>
      <div className="container-shell">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          ${stats.map((stat) => html`
            <${motion.div} key=${stat} variants=${fadeUp} className="border border-white/12 bg-black/20 p-6">
              <p className="font-display text-[clamp(2rem,4vw,3.6rem)] uppercase leading-none text-white">${stat.split(' ')[0]}</p>
              <p className="mt-3 font-bold uppercase tracking-[.14em] gold-text">${stat.replace(stat.split(' ')[0], '').trim()}</p>
            <//>
          `)}
        </div>
        <${motion.div} variants=${fadeUp} className="mt-12 max-w-4xl">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] uppercase leading-none text-white">No generic plans. No one-size-fits-all approach.</h2>
          <p className="mt-6 text-xl leading-8 muted-text">Every client receives coaching designed around their body, schedule, ability level, and long-term goals.</p>
        <//>
      </div>
    <//>
  `;
}

function Results() {
  return html`
    <${SectionReveal} id="results" className="results-video-section py-24 sm:py-32">
      <div className="results-video-bg" aria-hidden="true">
        <video src="https://vxgcregvvin0amcz.public.blob.vercel-storage.com/results-left.mp4" autoPlay muted loop playsInline preload="metadata"></video>
        <video src="https://vxgcregvvin0amcz.public.blob.vercel-storage.com/results-right.mp4" autoPlay muted loop playsInline preload="metadata"></video>
      </div>
      <div className="results-video-scrim" aria-hidden="true"></div>
      <div className="container-shell relative z-10">
        <${motion.div} variants=${fadeUp} className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[.24em] gold-text">Transformation & Results</p>
          <h2 className="mt-4 font-display text-[clamp(2.3rem,6vw,5.4rem)] uppercase leading-none text-white">Real Progress. Built Properly.</h2>
        <//>
        <div className="results-card-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          ${results.map((item, index) => html`
            <${motion.article} key=${item.title} variants=${fadeUp} whileHover=${{ y: -6 }} className="glass-card result-card p-6" tabIndex="0">
              <p className="font-display text-5xl text-white/10">0${index + 1}</p>
              <h3 className="mt-10 font-display text-3xl uppercase text-white">${item.title}</h3>
              <p className="result-card-teaser mt-3 leading-7 muted-text">Hover to see what this focuses on.</p>
              <div className="result-card-detail">
                <p>${item.description}</p>
              </div>
            <//>
          `)}
        </div>
      </div>
    <//>
  `;
}

function CTA() {
  return html`
    <${SectionReveal} className="py-12 sm:py-20">
      <div className="container-shell">
        <${motion.div} variants=${fadeUp} className="cta-video-panel relative overflow-hidden border border-bronze/35 p-8 shadow-premium sm:p-12 lg:p-16">
          <video className="cta-bg-video" src="https://vxgcregvvin0amcz.public.blob.vercel-storage.com/cta-bench-press.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"></video>
          <div className="cta-video-overlay" aria-hidden="true"></div>
          <div className="relative z-10 max-w-3xl">
            <p className="font-display text-sm uppercase tracking-[.24em] gold-text">Ready to train with purpose?</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,5rem)] uppercase leading-none text-white">Build a program that works with your lifestyle, not against it.</h2>
            <p className="mt-6 text-lg leading-8 muted-text">Book a consultation with Kareem & Orane and start building a program that works with your lifestyle, not against it.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <${Button} href="#contact">Book Consultation<//>
              <${Button} href="mailto:hello@example.com" variant="secondary">Send a Message<//>
            </div>
          </div>
        <//>
      </div>
    <//>
  `;
}

function Contact() {
  return html`
    <${SectionReveal} id="contact" className="bg-black/20 py-24 sm:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
        <${motion.div} variants=${fadeUp}>
          <p className="font-display text-sm uppercase tracking-[.24em] gold-text">Contact</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.8rem)] uppercase leading-none text-white">Start Your Training</h2>
          <p className="mt-6 text-lg leading-8 muted-text">Tell Kareem & Orane what you want to build. Strength, structure, better recovery, sport performance, confidence, or a full lifestyle reset.</p>
          <div className="mt-8 grid gap-4 text-sm uppercase tracking-[.14em] text-white/72">
            <p>Email: hello@example.com</p><p>Phone: (000) 000-0000</p><p>Instagram: @apairofhammers</p><p>Location / service area placeholder</p>
          </div>
        <//>
        <${motion.form} variants=${fadeUp} className="glass-card grid gap-4 p-6 sm:p-8" aria-label="Training consultation form">
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="sr-only">Name</span><input className="form-field" name="name" placeholder="Name" required /></label>
            <label><span className="sr-only">Email</span><input className="form-field" type="email" name="email" placeholder="Email" required /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="sr-only">Phone</span><input className="form-field" type="tel" name="phone" placeholder="Phone" /></label>
            <label><span className="sr-only">Training Goal</span><select className="form-field" name="goal" defaultValue=""><option value="" disabled>Training Goal</option><option>Strength</option><option>Conditioning</option><option>Sport-Specific Training</option><option>Recovery & Mobility</option><option>Nutrition & Lifestyle</option><option>Complete Coaching System</option></select></label>
          </div>
          <label><span className="sr-only">Message</span><textarea className="form-field min-h-[160px] resize-y" name="message" placeholder="Message" required></textarea></label>
          <button className="min-h-[54px] bg-bronze px-7 py-4 font-display text-sm uppercase tracking-[.18em] text-ink transition hover:bg-ember focus:outline-none focus:ring-4 focus:ring-bronze/25" type="submit">Submit</button>
        <//>
      </div>
    <//>
  `;
}

function App() {
  useEffect(() => {
    const fallback = window.setTimeout(() => document.body.classList.add('motion-fallback'), 1500);
    return () => window.clearTimeout(fallback);
  }, []);
  return html`
    <${Navbar} />
    <main id="main"><${Hero} /><${Programs} /><${About} /><${Results} /><${CTA} /><${Contact} /></main>
    <footer className="border-t border-white/10 bg-black/40 py-8">
      <div className="container-shell flex flex-col justify-between gap-4 text-sm muted-text sm:flex-row">
        <p className="font-display uppercase tracking-[.18em] text-white">APH · A Pair Of Hammers</p>
        <p>Personal training, performance coaching, recovery, nutrition, sleep, and mindset.</p>
      </div>
    </footer>
  `;
}

ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);






