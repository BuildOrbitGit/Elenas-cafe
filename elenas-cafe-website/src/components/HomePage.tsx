"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Clock,
  Coffee,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type CafeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "food" | "drink" | "atmosphere";
};

type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  sizes?: { label: string; price: string }[];
  badges?: string[];
  image?: {
    src: string;
    alt: string;
  };
};

type MenuCategory = {
  id: string;
  label: string;
  eyebrow: string;
  items: MenuItem[];
  note?: string;
};

const images: CafeImage[] = [
  // Add or replace more food images in /public/elena/food and update this list.
  { src: "/elena/food/food-1.jpg", alt: "French toast with berries and whipped cream at Elena's Cafe", width: 229, height: 287, kind: "food" },
  { src: "/elena/food/food-2.jpg", alt: "Chicken focaccia panini with chips at Elena's Cafe", width: 229, height: 287, kind: "food" },
  { src: "/elena/food/food-3.jpg", alt: "Fresh breakfast bowl with greens and eggs at Elena's Cafe", width: 229, height: 287, kind: "food" },
  { src: "/elena/food/food-4.jpg", alt: "Chocolate glazed mini donuts at Elena's Cafe", width: 225, height: 225, kind: "food" },
  // Add or replace more drink images in /public/elena/drinks and update this list.
  { src: "/elena/drinks/drink-1.jpg", alt: "Creamy hot chocolate with whipped cream at Elena's Cafe", width: 229, height: 287, kind: "drink" },
  { src: "/elena/drinks/drink-2.jpg", alt: "Iced matcha drink with whipped cream at Elena's Cafe", width: 229, height: 287, kind: "drink" },
  // Replace or add atmosphere/interior images in /public/elena/background when available.
  { src: "/elena/background/exterior-1.jpg", alt: "Green exterior entrance of Elena's Cafe", width: 221, height: 166, kind: "atmosphere" },
];

const navLinks = ["Home", "Menu", "Reviews", "Visit"];

const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Elena%27s%20Cafe%205630%20176%20St%20Surrey%20BC%20V3S%204C6";
const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Elena%27s%20Cafe%205630%20176%20St%20Surrey%20BC%20V3S%204C6&output=embed";
const instagramUrl = "https://www.instagram.com/elenacafecloverdale/";

const featured = [
  {
    title: "Chicken Panini",
    description: "Pressed focaccia, tender chicken, greens, and a crisp cafe-style side.",
    image: { src: "/elena/menu-items/deluxe-chicken-panini.jpg", alt: "Deluxe chicken panini sandwich at Elena's Cafe", width: 900, height: 675, kind: "food" as const },
  },
  {
    title: "Hot Chocolate",
    description: "Rich, cozy, whipped, and finished with a cheerful seasonal sparkle.",
    image: images[4],
  },
  {
    title: "Breakfast Bowls",
    description: "Fresh greens, eggs, vegetables, and balanced brunch comfort.",
    image: { src: "/elena/menu-items/ultimate-loaded-breakfast.jpg", alt: "Ultimate loaded breakfast at Elena's Cafe", width: 900, height: 675, kind: "food" as const },
  },
  {
    title: "Coffee",
    description: "Fresh drip, espresso classics, lattes, mochas, and slow cafe moments.",
    image: { src: "/elena/menu-items/spanish-latte-espresso.jpg", alt: "Spanish latte espresso with latte art at Elena's Cafe", width: 900, height: 675, kind: "drink" as const },
  },
  {
    title: "Baked Goods",
    description: "Sweet treats, donuts, muffins, and small bites made for coffee.",
    image: images[3],
  },
  {
    title: "Perogies",
    description: "Comfort food classics with a warm local-cafe feel.",
    image: { src: "/elena/menu-items/classic-english-breakfast.jpg", alt: "Classic comfort breakfast plate at Elena's Cafe", width: 900, height: 675, kind: "food" as const },
  },
  {
    title: "Cabbage Rolls",
    description: "Hearty lunch favourites with generous portions and friendly service.",
    image: { src: "/elena/menu-items/chipotle-bowl.jpg", alt: "Hearty chipotle bowl at Elena's Cafe", width: 900, height: 675, kind: "food" as const },
  },
  {
    title: "Rice Bowls",
    description: "Saucy, filling bowls with chicken, beans, vegetables, and bright sauces.",
    image: { src: "/elena/menu-items/saucy-sunday-bowl.jpg", alt: "Saucy Sunday rice bowl at Elena's Cafe", width: 900, height: 675, kind: "food" as const },
  },
];

const categories: MenuCategory[] = [
  {
    id: "espresso",
    label: "Espresso",
    eyebrow: "Fresh espresso bar",
    items: [
      { name: "Fresh Drip Regular", sizes: [{ label: "12oz", price: "$2.75" }, { label: "16oz", price: "$3.30" }] },
      { name: "Fresh Drip Dark Roast", sizes: [{ label: "12oz", price: "$2.75" }, { label: "16oz", price: "$3.30" }] },
      { name: "Americano", sizes: [{ label: "12oz", price: "$3.60" }, { label: "16oz", price: "$4.20" }] },
      { name: "Flat White", sizes: [{ label: "12oz", price: "$4.75" }, { label: "16oz", price: "$5.25" }] },
      { name: "Cafe Latte", sizes: [{ label: "12oz", price: "$5.00" }, { label: "16oz", price: "$5.50" }], badges: ["Popular"] },
      { name: "Cappuccino", sizes: [{ label: "12oz", price: "$4.78" }, { label: "16oz", price: "$6.30" }] },
      { name: "Caramel Macchiato", sizes: [{ label: "12oz", price: "$5.50" }, { label: "16oz", price: "$6.50" }], badges: ["Popular"] },
      { name: "Dark Chocolate Mocha", sizes: [{ label: "12oz", price: "$6.55" }, { label: "16oz", price: "$7.55" }] },
      { name: "White Chocolate Mocha", sizes: [{ label: "12oz", price: "$6.55" }, { label: "16oz", price: "$7.55" }] },
      {
        name: "Spanish Latte",
        sizes: [{ label: "12oz", price: "$5.30" }, { label: "16oz", price: "$6.30" }],
        image: { src: "/elena/menu-items/spanish-latte-espresso.jpg", alt: "Spanish latte espresso with peacock latte art at Elena's Cafe" },
      },
      {
        name: "Caramelized Biscoff Latte",
        description: "Creamy biscoff latte finished with whipped cream and cookie crumble.",
        image: { src: "/elena/menu-items/caramelized-biscoff-latte.jpg", alt: "Caramelized biscoff latte at Elena's Cafe" },
        badges: ["Photo favourite"],
      },
      { name: "London Fog", sizes: [{ label: "12oz", price: "$4.00" }, { label: "16oz", price: "$4.75" }] },
      { name: "Chai Latte", sizes: [{ label: "12oz", price: "$4.00" }, { label: "16oz", price: "$4.75" }] },
      { name: "Matcha Espresso Latte", sizes: [{ label: "12oz", price: "$5.25" }, { label: "16oz", price: "$5.75" }] },
    ],
  },
  {
    id: "hot-drinks",
    label: "Hot Drinks",
    eyebrow: "Warm cups",
    items: [
      { name: "London Fog", sizes: [{ label: "12oz", price: "$4.15" }, { label: "16oz", price: "$4.89" }] },
      { name: "Earl Grey", sizes: [{ label: "12oz", price: "$4.15" }, { label: "16oz", price: "$4.89" }] },
      { name: "Matcha Latte", sizes: [{ label: "12oz", price: "$4.50" }, { label: "16oz", price: "$5.00" }], badges: ["Vegetarian"] },
      { name: "Hot Chocolate", price: "$4.50", description: "12oz", badges: ["Customer Favourite"] },
      { name: "Steamed Milk", sizes: [{ label: "12oz", price: "$3.50" }, { label: "16oz", price: "$4.50" }] },
      {
        name: "Tea",
        price: "$3.70",
        description: "12oz. Options include Matcha Jasmine, Crimson Berry, Herbal China Mao Jian, and Ayurvedic Ginger Fresh.",
      },
    ],
  },
  {
    id: "cold-drinks",
    label: "Cold Drinks",
    eyebrow: "Fresh and chilled",
    items: [
      { name: "Iced Americano", price: "$4.50" },
      { name: "Iced Cafe Latte", price: "$5.50", badges: ["Popular"] },
      { name: "Iced Tiramisu Latte", description: "Layered iced tiramisu latte with vanilla cream.", image: { src: "/elena/menu-items/iced-tiramisu-latte.jpg", alt: "Iced tiramisu latte at Elena's Cafe" }, badges: ["Photo favourite"] },
      { name: "Iced Caramel Macchiato", price: "$6.50", image: { src: "/elena/menu-items/iced-caramel-macchiato.jpg", alt: "Iced caramel macchiato at Elena's Cafe" } },
      { name: "Iced Matcha", price: "$5.00", badges: ["Customer Favourite"], image: { src: "/elena/menu-items/iced-matcha-latte.jpg", alt: "Iced matcha latte with whipped cream at Elena's Cafe" } },
      { name: "Pop", price: "$2.50" },
      { name: "Water", price: "$2.50" },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    eyebrow: "Pressed and fresh",
    items: [
      { name: "Pesto Breakfast Sandwich", price: "$10.00", image: { src: "/elena/menu-items/pesto-breakfast-sandwich.jpg", alt: "Pesto breakfast sandwich at Elena's Cafe" } },
      { name: "Chicken Focaccia Panini", price: "$10.00", badges: ["Customer Favourite", "Halal-Friendly"], image: { src: "/elena/menu-items/deluxe-chicken-panini.jpg", alt: "Deluxe chicken panini sandwich at Elena's Cafe" } },
      { name: "Chicken Croissant Sandwich", description: "Warm croissant sandwich with chicken and fresh greens.", image: { src: "/elena/menu-items/chicken-croissant-sandwich.jpg", alt: "Chicken croissant sandwich at Elena's Cafe" }, badges: ["Photo favourite"] },
      { name: "Mediterranean Panini", price: "$12.50" },
      { name: "Vegetarian Panini Sandwich", description: "Pressed vegetarian panini with fresh greens and melted cheese.", image: { src: "/elena/menu-items/vegetarian-panini-sandwich.jpg", alt: "Vegetarian panini sandwich at Elena's Cafe" }, badges: ["Vegetarian"] },
      { name: "Egg and Cheese Bacon Croissant", price: "$10.00" },
      { name: "Snack Sized Tuna Melt", price: "$7.00" },
      { name: "Grilled Cheese Sandwich", price: "$5.50", badges: ["Vegetarian"] },
    ],
  },
  {
    id: "bowls",
    label: "Bowls",
    eyebrow: "Saucy rice bowls",
    note: "Additional charges apply for add-ons.",
    items: [
      { name: "Saucy Sunday", description: "Rice, white and black beans, corn, chicken, and 3 sauces.", price: "$11.50", badges: ["Popular"], image: { src: "/elena/menu-items/saucy-sunday-bowl.jpg", alt: "Saucy Sunday bowl at Elena's Cafe" } },
      { name: "Green Goddess", description: "Rice, sauteed vegetables, corn, chicken, and green sauce.", price: "$11.50" },
      { name: "BBQ Bowl", description: "Rice, corn, cucumber, onion, chicken, and BBQ sauce.", price: "$11.50" },
      { name: "Chipotle Bowl", description: "Rice, black and white beans, chicken, and chipotle sauce.", price: "$11.50", image: { src: "/elena/menu-items/chipotle-bowl.jpg", alt: "Chipotle bowl at Elena's Cafe" } },
      {
        name: "Customized Bowls",
        description: "Rice, lettuce, or quinoa with chicken, one vegetable option, any two beans, and any two sauces.",
        price: "$13.25",
      },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    eyebrow: "All-day comfort",
    items: [
      { name: "All Day Special", description: "2 eggs any style, 2 strips of bacon or sausage, 2 slices of toast, hash browns, and 8oz coffee.", price: "$12.99", badges: ["Popular"], image: { src: "/elena/menu-items/classic-english-breakfast.jpg", alt: "Classic English breakfast plate at Elena's Cafe" } },
      { name: "Ultimate Loaded Breakfast", description: "Loaded breakfast bowl with eggs, potatoes, beans, and toast.", image: { src: "/elena/menu-items/ultimate-loaded-breakfast.jpg", alt: "Ultimate loaded breakfast at Elena's Cafe" }, badges: ["Photo favourite"] },
      { name: "Cheese Omelette", description: "Served with hash browns.", price: "$13.99" },
      { name: "Cheese and Ham Omelette", description: "Served with hash browns.", price: "$14.75" },
      { name: "Cheese and Vegetable Omelette", description: "Served with hash browns.", price: "$13.99", badges: ["Vegetarian"] },
      { name: "Omelette Extras", description: "Tomato, mushroom, bell pepper, onion, cheese, bacon, sausage, or ham." },
      { name: "Eggs Benedict", image: { src: "/elena/menu-items/bacon-egg-benedict.jpg", alt: "Bacon egg benedict plate at Elena's Cafe" } },
      { name: "French Toast with Bacon", image: { src: "/elena/menu-items/elenas-classic-french-toast.jpg", alt: "Elena's classic French toast with berries at Elena's Cafe" } },
      { name: "Avocado Toast with Eggs", image: { src: "/elena/menu-items/avocado-toast-with-eggs.jpg", alt: "Avocado toast with eggs at Elena's Cafe" }, badges: ["Vegetarian"] },
      { name: "Pancakes with Syrup and Butter" },
      { name: "Bagel with Cream Cheese" },
    ],
  },
  {
    id: "lunch",
    label: "Lunch",
    eyebrow: "Classic cafe plates",
    note: "Sandwiches include one side: chips, soup, potato salad, or hash browns.",
    items: [
      { name: "Turkey", price: "$14.99" },
      { name: "BLT", price: "$13.75" },
      { name: "Grilled Ham and Cheese", price: "$13.60" },
      { name: "Roast Beef", price: "$13.75" },
      { name: "Tuna", price: "$12.50" },
      { name: "Egg Salad", price: "$12.50" },
      { name: "Soup of the Day with Bread", price: "$11.60" },
      { name: "Hot Turkey Cheese Bun", description: "With homemade bun or cracker.", price: "$11.50" },
      { name: "Cabbage Rolls", price: "$13.80", badges: ["Comfort Classic"] },
      { name: "Perogies with Cream", price: "$13.89", badges: ["Customer Favourite"] },
    ],
  },
];

const reviews = [
  [
    "Daniel L",
    "Drove by this place in the morning and decided to stop in for a quick try. Ordered a few things — nothing fancy, nothing dramatic, just the basics. And honestly? That’s exactly why it works.",
  ],
  [
    "Mohamed B",
    "My son and I tried this local spot. We had the deluxe chicken Panini, and the ultimate loaded breakfast and a couple of sodas. The meal was great.",
  ],
  [
    "Afra A",
    "Tried their hot chocolate, which was too good—no words for the chicken panini; 10/10. Overall the ambiance was cozy, aesthetic & welcoming.",
  ],
  [
    "WhimsicalWanderlust",
    "I absolutely fell in love with this Cafe and the delicious on sight baked goods and coffee. The service is exceptional and friendly with a cozy, nature atmosphere.",
  ],
  [
    "Adnan Y",
    "Visited today for brunch and had an amazing time. The vibe, ambiance and decor was awesome. Staff was very friendly, respectful and welcoming.",
  ],
  [
    "M P",
    "Delicious panini, and a really good cup of coffee! Trendy interior, and a good spot for a coffee date, to study or work, or take a crew for a lunch.",
  ],
  [
    "Anvir D",
    "My favourite cafe by far, an absolute hidden gem. Not only are the food and drinks delicious, the owners are the best!",
  ],
  [
    "Catherine H",
    "It was a fabulous experience. The restaurant is small and parking can be an issue but we had great food and amazing beverages.",
  ],
];

const reviewTestimonials = reviews.map(([name, text]) => ({
  name,
  text,
  role: "Google review excerpt",
}));

const reviewColumns = [
  reviewTestimonials.slice(0, 3),
  reviewTestimonials.slice(3, 6),
  reviewTestimonials.slice(6, 8),
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const reviewSpotlightTerms = [
  "ultimate loaded breakfast",
  "loaded breakfast",
  "hot chocolate",
  "chicken panini",
  "baked goods",
  "beverages",
  "panini",
  "coffee",
  "brunch",
  "food",
  "drinks",
];

function slug(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ReviewTextSpotlight({ text, seed }: { text: string; seed: number }) {
  const matcher = new RegExp(`(${reviewSpotlightTerms.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(matcher).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        const isSpotlight = reviewSpotlightTerms.some((term) => term.toLowerCase() === part.toLowerCase());

        if (!isSpotlight) return <span key={`${part}-${index}`}>{part}</span>;

        return (
          <motion.span
            key={`${part}-${index}`}
            data-review-spotlight="true"
            className="relative inline-block origin-center font-semibold text-emerald-950"
            animate={{
              scale: [1, 1, 2.15, 2.15, 1],
              color: ["#153322", "#153322", "#c98910", "#c98910", "#153322"],
              textShadow: [
                "0 0 0 rgba(201, 137, 16, 0)",
                "0 0 0 rgba(201, 137, 16, 0)",
                "0 18px 42px rgba(201, 137, 16, 0.48)",
                "0 18px 42px rgba(201, 137, 16, 0.48)",
                "0 0 0 rgba(201, 137, 16, 0)",
              ],
              zIndex: [1, 1, 20, 20, 1],
            }}
            transition={{
              duration: 1.55,
              delay: ((seed + index) % 9) * 1,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "easeInOut",
            }}
          >
            {part}
          </motion.span>
        );
      })}
    </>
  );
}

function RatingStars({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label="4.3 star rating">
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} className={compact ? "h-4 w-4 fill-current" : "h-5 w-5 fill-current"} />
      ))}
    </div>
  );
}

function PartialRatingStars({ compact = false }: { compact?: boolean }) {
  const size = compact ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label="4.3 star rating">
      {[0, 1, 2, 3].map((star) => (
        <Star key={star} className={`${size} fill-current`} />
      ))}
      <span className={`relative inline-block ${size}`}>
        <Star className={`absolute inset-0 ${size} text-amber-500/25 fill-current`} />
        <span className="absolute inset-0 block w-[60%] overflow-hidden">
          <Star className={`${size} fill-current text-amber-500`} />
        </span>
      </span>
    </div>
  );
}

function ReviewColumn({
  items,
  duration,
  className = "",
}: {
  items: typeof reviewTestimonials;
  duration: number;
  className?: string;
}) {
  const loopedItems = [...items, ...items, ...items];

  return (
    <div className={`min-w-0 overflow-hidden ${className}`}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex list-none flex-col gap-5 p-0"
      >
        {loopedItems.map((review, index) => {
          const initials = review.name
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <motion.li
              key={`${review.name}-${index}`}
              aria-hidden={index >= items.length}
              tabIndex={index >= items.length ? -1 : 0}
              whileHover={{
                scale: 1.025,
                y: -6,
                transition: { type: "spring", stiffness: 360, damping: 20 },
              }}
              className="group rounded-[1.75rem] border border-emerald-950/10 bg-[#fffaf0]/92 p-6 shadow-xl shadow-emerald-950/8 outline-none transition focus:ring-2 focus:ring-olive-600/30"
            >
              <blockquote>
                <div className="inline-flex rounded-full border border-emerald-950/10 bg-white/70 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-olive-700">
                  Google review
                </div>
                <p className="mt-4 text-[0.98rem] leading-7 text-stone-700">
                  &quot;<ReviewTextSpotlight text={review.text} seed={index} />&quot;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-950 font-bold text-cream ring-4 ring-white transition group-hover:bg-olive-800">
                    {initials}
                  </div>
                  <div>
                    <cite className="not-italic font-display text-xl leading-none text-emerald-950">{review.name}</cite>
                    <p className="mt-1 text-sm font-semibold text-olive-700">{review.role}</p>
                  </div>
                </footer>
              </blockquote>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#fffaf0]/90 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-olive-600/30 hover:bg-white hover:shadow-xl hover:shadow-emerald-950/10"
    >
      {item.image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950/5">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover saturate-[1.08] contrast-[1.04] transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/22 via-transparent to-transparent" />
        </div>
      ) : null}
      <div className={item.image ? "p-5" : "p-4"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl text-emerald-950">{item.name}</h3>
            {item.description ? <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p> : null}
          </div>
          {item.price ? (
            <span className="shrink-0 rounded-full bg-emerald-950 px-3 py-1.5 text-sm font-semibold text-cream">
              {item.price}
            </span>
          ) : null}
        </div>
        {item.sizes ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {item.sizes.map((size) => (
              <div key={size.label} className="flex items-center justify-between rounded-full bg-emerald-950/5 px-3 py-2 text-sm text-emerald-950">
                <span>{size.label}</span>
                <strong>{size.price}</strong>
              </div>
            ))}
          </div>
        ) : null}
        {item.badges ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-emerald-900/10 bg-olive-100 px-2.5 py-1 text-xs font-semibold text-emerald-900">
                {badge}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [query, setQuery] = useState("");
  const { scrollYProgress } = useScroll();
  const wallY = useTransform(scrollYProgress, [0.12, 0.62], [80, -80]);

  const currentCategory = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = normalized
      ? categories.flatMap((category) =>
          category.items.map((item) => ({
            ...item,
            searchCategory: category.label,
          })),
        )
      : currentCategory.items.map((item) => ({ ...item, searchCategory: currentCategory.label }));

    if (!normalized) return source;
    return source.filter((item) =>
      [item.name, item.description, item.searchCategory, ...(item.badges ?? [])].join(" ").toLowerCase().includes(normalized),
    );
  }, [currentCategory, query]);

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-stone-800">
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-emerald-950/8 bg-[#fff7e7]/58 shadow-sm shadow-emerald-950/5 backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="font-display text-2xl text-emerald-950">
            Elena&apos;s Cafe
          </a>
          <div className="hidden items-center gap-8 rounded-full border border-emerald-950/8 bg-[#fffaf0]/54 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-sm shadow-emerald-950/5 backdrop-blur-xl lg:flex">
            {navLinks.map((link) => (
              <a key={link} href={`#${slug(link)}`} className="transition hover:text-olive-700">
                {link}
              </a>
            ))}
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-emerald-950/10 bg-[#fffaf0]/70 px-5 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-950/10 backdrop-blur-xl transition hover:bg-white lg:inline-flex"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
          <button
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            className="rounded-full border border-emerald-950/10 bg-white/60 p-3 text-emerald-950 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div className="fixed inset-0 z-[60] bg-emerald-950/35 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="ml-auto h-full w-80 bg-cream p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-emerald-950">Elena&apos;s Cafe</span>
                <button aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} className="rounded-full bg-white p-2 text-emerald-950">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-10 grid gap-4">
                {navLinks.map((link) => (
                  <a key={link} href={`#${slug(link)}`} onClick={() => setMobileOpen(false)} className="rounded-2xl bg-white/70 px-4 py-4 font-semibold text-emerald-950">
                    {link}
                  </a>
                ))}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-emerald-950 px-4 py-4 font-semibold text-cream"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 text-white lg:px-8">
        <video
          className="absolute inset-0 h-full w-full object-cover saturate-[1.08] contrast-[1.03]"
          src="/elena/video/hero-cafe.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Warm cafe video background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/58 via-emerald-950/22 to-emerald-950/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,247,231,0.08),transparent_26rem),linear-gradient(180deg,rgba(21,51,34,0.04),rgba(21,51,34,0.36))]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-cream drop-shadow-lg">
              <Sparkles className="h-4 w-4 text-olive-200" />
              Warm local cafe under refreshed management
            </div>
            <h1 className="font-display text-6xl leading-[0.92] tracking-normal text-cream [text-shadow:0_8px_36px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl">
              Fresh Coffee.
              <span className="block text-olive-200">Comfort Food.</span>
              <span className="block text-white">Cozy Moments.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-cream/90 [text-shadow:0_3px_18px_rgba(0,0,0,0.65)]">
              A warm local cafe serving fresh drinks, baked goods, hearty brunch favourites, paninis, breakfast bowls, and comforting homemade meals in a cozy nature-inspired space.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-emerald-950 shadow-xl shadow-emerald-950/30 transition hover:bg-cream">
                <Coffee className="h-5 w-5" />
                View Menu
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-emerald-950 shadow-xl shadow-emerald-950/30 transition hover:bg-cream"
              >
                <MapPin className="h-5 w-5" />
                Visit Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="section-eyebrow">A local small business</p>
            <h2 id="story-title" className="section-title text-left">A Fresh Chapter for Elena&apos;s Cafe</h2>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              Elena&apos;s Cafe is a cozy local cafe under refreshed management, offering a diverse menu of classic cafe favourites, comforting meals, fresh drinks, baked goods, and unique in-house items.
            </p>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              The cafe is built around simple, honest, fresh food, warm service, and a welcoming atmosphere for coffee dates, brunch, studying, working, or catching up with friends.
            </p>
            <div className="mt-8 grid gap-3 rounded-2xl border border-emerald-950/10 bg-[#fffaf0]/88 p-3 shadow-xl shadow-emerald-950/10 sm:grid-cols-2">
              {["New refreshed management", "Diverse menu", "Unique in-house items", "Cozy nature atmosphere"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-xl border border-emerald-950/8 bg-white/75 px-4 py-5 text-center text-sm font-bold text-emerald-950 shadow-sm"
                >
                  <Leaf className="mx-auto mb-2 h-4 w-4 text-olive-700" />
                  <span className="block">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="relative min-h-[600px] [perspective:1300px]">
            <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-950/10 bg-olive-100/45 shadow-inner shadow-emerald-950/8" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[510px] w-[510px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-olive-700/25"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.86, rotateX: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ rotateY: 5, rotateX: -4, scale: 1.02 }}
              className="absolute left-1/2 top-1/2 z-20 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[3rem] border border-white/75 bg-white shadow-2xl shadow-emerald-950/24 [transform-style:preserve-3d]"
            >
              <Image src="/elena/menu-items/avocado-toast-with-eggs.jpg" alt="Avocado toast with eggs at Elena's Cafe" fill sizes="360px" className="object-cover saturate-[1.12] contrast-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/38 via-transparent to-white/5" />
              <p className="absolute bottom-6 left-6 max-w-56 font-display text-3xl leading-none text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.45)]">Fresh cafe favourites</p>
            </motion.div>

            {[
              { src: images[6].src, alt: images[6].alt, className: "left-0 top-12 h-56 w-72", rotate: -7, delay: 0.1 },
              { src: "/elena/menu-items/iced-matcha-latte.jpg", alt: "Iced matcha latte at Elena's Cafe", className: "right-0 top-24 h-60 w-48", rotate: 8, delay: 0.2 },
              { src: "/elena/menu-items/spanish-latte-espresso.jpg", alt: "Spanish latte espresso at Elena's Cafe", className: "bottom-12 left-8 h-52 w-52", rotate: 10, delay: 0.3 },
              { src: images[3].src, alt: images[3].alt, className: "bottom-4 right-14 h-48 w-56", rotate: -5, delay: 0.4 },
            ].map((image) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.88, y: 28, rotate: image.rotate }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: image.rotate }}
                viewport={{ once: true }}
                animate={{ y: [0, -12, 0], rotate: [image.rotate, image.rotate + 1.8, image.rotate] }}
                transition={{ delay: image.delay, duration: 6 + image.delay * 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                whileHover={{ scale: 1.06, rotate: image.rotate + 4, zIndex: 30 }}
                className={`absolute z-10 overflow-hidden rounded-[2rem] border border-white/75 bg-white shadow-2xl shadow-emerald-950/18 ${image.className}`}
              >
                <Image src={image.src} alt={image.alt} fill sizes="280px" className="object-cover saturate-[1.14] contrast-[1.06]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative" aria-labelledby="favourites-title">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffaf0_0%,#edf4e5_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow">Signature menu wall</p>
            <h2 id="favourites-title" className="section-title">Cafe Favourites, Made Fresh</h2>
            <p className="section-copy">
              From rich coffee and fresh baked goods to paninis, breakfast bowls, perogies, cabbage rolls, and comforting lunch favourites.
            </p>
          </motion.div>

          <motion.div style={{ y: wallY }} className="relative mt-14 rounded-[2.5rem] border border-emerald-950/10 bg-[#f8efd9]/75 p-5 shadow-inner shadow-emerald-950/8 sm:p-7">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(90deg,rgba(21,51,34,0.035)_1px,transparent_1px),linear-gradient(rgba(21,51,34,0.025)_1px,transparent_1px)] bg-[size:34px_34px]" />
            <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26, rotate: index % 2 ? 4 : -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: [-3, 2, -2, 3, -1, 2, -3, 1][index] }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -12, rotate: 0, scale: 1.035, zIndex: 20 }}
                className={[
                  "group relative rounded-[1.6rem] bg-white p-3 shadow-2xl shadow-emerald-950/12 transition [transform-style:preserve-3d]",
                  index === 0 || index === 7 ? "sm:col-span-2" : "",
                ].join(" ")}
              >
                <div className="absolute left-1/2 top-0 z-20 h-7 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-sm bg-cream/75 shadow-md shadow-emerald-950/10 backdrop-blur-sm" />
                <div className={`relative overflow-hidden rounded-[1.15rem] ${index === 0 || index === 7 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes={index === 0 || index === 7 ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 50vw, 24vw"}
                    className="object-cover saturate-[1.14] contrast-[1.05] transition duration-700 group-hover:scale-108"
                  />
                </div>
                <div className="px-2 pb-3 pt-4">
                  <h3 className="font-display text-3xl leading-none text-emerald-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                </div>
              </motion.article>
            ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="menu" className="section-pad paper-texture bg-[#f4ecd9]" aria-labelledby="menu-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.32fr_1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="section-eyebrow">Modern cafe menu</p>
              <h2 id="menu-title" className="section-title text-left">Food & Drinks Menu Preview</h2>
              <p className="section-copy text-left">
                Menu favourites, organized for quick browsing. Search coffee, panini, bowl, breakfast, perogies, and more.
              </p>
              <label className="mt-8 flex items-center gap-3 rounded-full border border-emerald-950/10 bg-white/80 px-5 py-4 shadow-sm">
                <Search className="h-5 w-5 text-olive-700" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search menu favourites"
                  className="w-full bg-transparent text-emerald-950 outline-none placeholder:text-stone-500"
                />
              </label>
              <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setQuery("");
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      activeCategory === category.id ? "bg-emerald-950 text-cream shadow-lg shadow-emerald-950/20" : "bg-white/70 text-emerald-950 hover:bg-olive-100"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setQuery("");
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${activeCategory === category.id ? "bg-emerald-950 text-cream" : "bg-white/80 text-emerald-950"}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${query}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[2rem] border border-white/65 bg-white/55 p-4 shadow-2xl shadow-emerald-950/8 backdrop-blur md:p-6"
                >
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-emerald-950/10 pb-5">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-olive-700">{query ? "Search results" : currentCategory.eyebrow}</p>
                      <h3 className="mt-2 font-display text-4xl text-emerald-950">{query ? "Matching Menu Favourites" : currentCategory.label}</h3>
                    </div>
                    {currentCategory.note && !query ? <p className="max-w-sm text-sm font-semibold text-stone-600">{currentCategory.note}</p> : null}
                  </div>
                  <div className="columns-1 gap-4 md:columns-2">
                    {filteredItems.length ? (
                      filteredItems.map((item) => (
                        <div key={`${item.searchCategory}-${item.name}`} className="mb-4 break-inside-avoid">
                          <MenuItemCard item={item} />
                        </div>
                      ))
                    ) : (
                      <p className="p-6 text-stone-600">No menu favourites match that search yet.</p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="relative overflow-hidden bg-[#e7f0dc] px-5 py-24 lg:px-8" aria-labelledby="reviews-title">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,250,240,0.72),transparent_28rem),radial-gradient(circle_at_82%_50%,rgba(123,136,72,0.14),transparent_24rem)]" />
        <motion.div
          initial={{ opacity: 0, y: 46, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-7xl"
        >
          <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
            <div className="rounded-full border border-emerald-950/10 bg-[#fffaf0]/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-olive-700 shadow-sm">
              Google Reviews
            </div>
            <h2 id="reviews-title" className="section-title mt-6">Loved for Coffee, Brunch, and Cozy Service</h2>
            <div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-[#fffaf0] px-7 py-5 shadow-2xl shadow-emerald-950/12">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-olive-200/45 blur-2xl" />
              <div className="absolute -bottom-10 left-8 h-20 w-20 rounded-full bg-amber-200/35 blur-2xl" />
              <div className="relative flex items-center gap-5">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-950 text-cream shadow-lg shadow-emerald-950/20">
                  <span className="font-display text-3xl leading-none">4.3</span>
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-olive-700">Google rating</p>
                  <div className="mt-1 flex items-center gap-2">
                    <PartialRatingStars compact />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mx-auto flex max-h-[720px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_9%,black_91%,transparent)]"
            role="region"
            aria-label="Scrolling Elena's Cafe Google reviews"
          >
            <ReviewColumn items={reviewColumns[0]} duration={22} />
            <ReviewColumn items={reviewColumns[1]} duration={26} className="hidden md:block" />
            <ReviewColumn items={reviewColumns[2]} duration={24} className="hidden lg:block" />
          </div>
        </motion.div>
      </section>

      <section id="visit" className="section-pad bg-cream" aria-labelledby="visit-title">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-emerald-950 p-8 text-cream shadow-2xl shadow-emerald-950/20 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-olive-200">Visit Elena&apos;s Cafe</p>
            <h2 id="visit-title" className="mt-4 font-display text-5xl leading-none lg:text-6xl">Come Visit Elena&apos;s Cafe</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cream/80">
              Stop by for coffee, brunch, lunch, baked goods, or a cozy place to slow down and enjoy something fresh.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [MapPin, "Address", "5630 176 St, Surrey, BC V3S 4C6"],
                [Phone, "Phone", "Add phone number here"],
                [Mail, "Email", "Add email address here"],
                [Clock, "Hours", "Add opening hours here"],
              ].map(([Icon, label, value]) => {
                const IconComponent = Icon as typeof MapPin;
                return (
                  <div key={label as string} className="rounded-2xl border border-white/10 bg-white/8 p-5">
                    <IconComponent className="h-5 w-5 text-olive-200" />
                    <p className="mt-3 font-bold">{label as string}</p>
                    <p className="mt-1 text-sm text-cream/70">{value as string}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cream px-6 py-4 font-bold text-emerald-950">Get Directions</a>
              <a href="#" className="rounded-full border border-white/20 px-6 py-4 font-bold text-cream">Call Now</a>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-80 overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-950/12">
              <Image src={images[6].src} alt={images[6].alt} fill sizes="50vw" className="object-cover saturate-[1.12] contrast-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/55 to-transparent" />
              <p className="absolute bottom-6 left-6 font-display text-3xl text-white">Green cafe glow, cozy evening visits.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white/70 shadow-lg shadow-emerald-950/8">
                <iframe
                  title="Google Map showing Elena's Cafe at 5630 176 St, Surrey, BC"
                  src={googleMapsEmbedUrl}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="grid min-h-48 place-items-center rounded-[2rem] border border-emerald-950/10 bg-white/70 p-6 text-center shadow-lg shadow-emerald-950/8">
                <Sparkles className="mb-3 h-8 w-8 text-olive-700" />
                <p className="font-display text-2xl text-emerald-950">Instagram placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-emerald-950 px-5 py-10 text-cream lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-3xl">Elena&apos;s Cafe</p>
            <p className="mt-2 text-cream/70">Fresh coffee, comforting food, and cozy moments.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-cream/80">
            {navLinks.map((link) => (
              <a key={link} href={`#${slug(link)}`} className="hover:text-white">
                {link}
              </a>
            ))}
          </div>
          <p className="text-sm text-cream/60">&copy; Elena&apos;s Cafe. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
