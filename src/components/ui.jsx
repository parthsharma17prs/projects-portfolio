import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 1. Dot Pattern Background
export const DotPattern = ({ className, width = 16, height = 16, cx = 1, cy = 1, cr = 1 }) => {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-white/10",
        className
      )}
    >
      <defs>
        <pattern id="dotPattern" width={width} height={height} patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#dotPattern)" />
    </svg>
  );
};

// 2. Shiny Button
export const ShinyButton = ({ text = "Shiny Button", className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex h-12 items-center justify-center overflow-hidden rounded-full bg-brand-surface px-8 py-2 font-medium text-white shadow-xl ring-1 ring-white/10 transition-transform active:scale-95",
        className
      )}
      style={{ '--shimmer-width': '200px' }}
    >
      <span className="relative z-10 flex items-center gap-2">{text}</span>
      <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-shimmer" />
    </button>
  );
};

// 3. Border Beam
export const BorderBeam = ({ className, duration = 15, size = 200, colorFrom = "var(--color-brand-accent)", colorTo = "transparent" }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
      style={{
        "--size": size,
        "--duration": duration,
        "--anchor": 90,
        "--border-width": 1.5,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": "0s",
        animation: `border-beam ${duration}s infinite linear`,
      }}
    />
  );
};

// 4. Marquee
export const Marquee = ({ className, reverse, pauseOnHover = false, children, repeat = 4 }) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-[var(--gap)] min-w-full animate-marquee flex-row",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "direction-reverse"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

// 5. Animated Text Word by Word
export const AnimatedText = ({ text, className }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <motion.h1
      className={cn("flex flex-wrap gap-x-2", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};
