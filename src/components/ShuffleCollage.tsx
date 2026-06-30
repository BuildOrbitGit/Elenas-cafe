"use client";

import { motion } from "framer-motion";

const photos = [
  { src: "/tiny-twin/dome-1.jpeg", alt: "Ehsan and Sinaan sharing a Tiny Twin matcha" },
  { src: "/tiny-twin/dome-2.jpeg", alt: "Playful oversized Tiny Twin matcha scene" },
  { src: "/tiny-twin/dome-3.jpeg", alt: "Playful Tiny Twin matcha photo" },
];

const paths = [
  { x: [0, 10, -5, 0], y: [0, -12, 7, 0], r: [0, 1.2, -0.6, 0], duration: 8.2 },
  { x: [0, -8, 9, 0], y: [0, 8, -11, 0], r: [0, -1, 0.8, 0], duration: 9.1 },
  { x: [0, 7, -10, 0], y: [0, -9, 8, 0], r: [0, 0.7, -1.1, 0], duration: 7.7 },
  { x: [0, -11, 5, 0], y: [0, 10, -7, 0], r: [0, -0.8, 1, 0], duration: 8.8 },
  { x: [0, 6, -7, 0], y: [0, -11, 6, 0], r: [0, 1, -0.7, 0], duration: 9.6 },
  { x: [0, -6, 11, 0], y: [0, 7, -10, 0], r: [0, -1.1, 0.6, 0], duration: 8.4 },
  { x: [0, 9, -6, 0], y: [0, -8, 11, 0], r: [0, 0.9, -0.8, 0], duration: 9.3 },
  { x: [0, -10, 7, 0], y: [0, 11, -6, 0], r: [0, -0.7, 1.1, 0], duration: 7.9 },
  { x: [0, 8, -9, 0], y: [0, -10, 9, 0], r: [0, 1.1, -0.9, 0], duration: 8.7 },
];

export default function ShuffleCollage() {
  return (
    <div className="water-grid" aria-label="Nine flowing Tiny Twin portraits">
      {paths.map((path, index) => {
        const photo = photos[index % photos.length];
        return (
          <motion.figure
            className="water-portrait"
            key={index}
            animate={{ x: path.x, y: path.y, rotate: path.r }}
            transition={{
              duration: path.duration,
              delay: index * -0.73,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.34, 0.68, 1],
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} />
            <span className="portrait-shine" />
          </motion.figure>
        );
      })}
    </div>
  );
}
