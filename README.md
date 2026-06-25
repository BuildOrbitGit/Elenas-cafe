# Elena's Cafe Website

Premium, image-led Next.js website for Elena's Cafe in Surrey, BC.

## Overview

This site is built as a warm green-and-cream cafe experience using Elena's Cafe food, drink, exterior, and menu item photos as the core visual identity. It includes a video hero, refreshed-management story section, animated cafe favourites, interactive menu, real Google review excerpts, and a visit section with Google Maps.

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS v4
- Framer Motion
- Lucide icons
- Next Image Optimization

## Key Sections

- Sticky responsive navigation with Instagram link
- Enhanced video hero background
- Fresh Chapter story section with 3D orbit photo stack
- Cafe Favourites memory-wall section
- Searchable and category-filtered menu
- Product photos matched to labelled menu items
- Scrolling Google reviews section with animated keyword emphasis
- Visit/contact section with embedded Google Map

## Assets

Primary website assets are stored in:

- `public/elena/background`
- `public/elena/food`
- `public/elena/drinks`
- `public/elena/menu-items`
- `public/elena/video`

Raw extracted menu screenshots are stored in:

- `assets/elena-menu-photos-raw`

The processed menu item photos in `public/elena/menu-items` were cropped, warmed, sharpened, and optimized from the labelled source images.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Vercel

The project is ready for Vercel deployment as a standard Next.js app. Vercel should auto-detect the framework. The included `vercel.json` makes the expected commands explicit.

## Business Details Used

- Business name: Elena's Cafe
- Address: 5630 176 St, Surrey, BC V3S 4C6
- Instagram: https://www.instagram.com/elenacafecloverdale/
- Google Maps link is wired in the hero and visit section.

## Notes for Future Updates

- Replace placeholder phone, email, and hours in `src/components/HomePage.tsx` when confirmed.
- Add new menu item photos to `public/elena/menu-items` and attach them to matching menu objects in `HomePage.tsx`.
- Keep review text limited to verified public review excerpts.
