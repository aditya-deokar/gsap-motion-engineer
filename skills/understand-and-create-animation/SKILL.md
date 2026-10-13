---
name: understand-and-create-animation
description: The flagship AI motion creator and intent analysis engine. Translates natural language animation requests into production-ready, 60fps GSAP code with surgical precision across React, Next.js, Vue, Svelte, and Vanilla JS. Enforces anti-AI-slop design principles, masked kinetic typography, organic deceleration easings, and GPU-composited execution.
license: MIT
---

# 🧠 Understand & Create Animation — AI Motion Engine

> **The Definitive Natural Language to Production-Ready GSAP Synthesis Engine**
> Converts any animation prompt into surgical, 60fps code with companion HTML markup, GPU-optimized CSS, and framework lifecycle hooks.

---

## 💎 The Anti-AI-Slop Motion Directive (Rules for LLMs)

When generating animations from user prompts, LLMs must avoid generic "AI slop" defaults:

1. **Never Animate Everything**: Avoid giving every element on a page an entrance tween. Focus energy on the primary anchor (hero title or featured card). Secondary elements should enter with subtle, quick opacity changes or remain static.
2. **Never Use Default Easings**: Prohibit `linear`, `ease`, `power1.out`, or cartoonish `bounce`. Use `ease: "power4.out"` or `ease: "expo.out"` for dramatic, editorial deceleration. For snappy UI toggles, use `cubic-bezier(0.16, 1, 0.3, 1)`.
3. **Always Mask Split Typography**: Never translate a raw `<h1>` or `<p>` element as an unmasked solid block. Always split into lines/words and wrap them in containers with `overflow: hidden`, sliding characters up from `yPercent: 110`.
4. **Compositor Only**: Animate exclusively `transform` (`x`, `y`, `scale`, `rotation`) and `autoAlpha`. Never animate `top`, `left`, `width`, `height`, or `margin`.
5. **Defensive & Interruptible**: Always add `overwrite: "auto"` on interactive triggers so user clicks or rapid hovers don't fight running animations.

---

## 🎯 Step 1: Natural Language Intent Analysis Engine

Before producing code, parse the user's natural language request through the 7-pattern intent classifier:

```
[ Natural Language Request ]
       │
       ├── Contains 'scroll', 'parallax', 'pin', 'viewport', 'scrub', 'cards on scroll'
       │   └── Pattern: scroll_based (ScrollTrigger, ScrollTrigger.batch, scrub: 1, Lenis sync)
       │
       ├── Contains 'text', 'typewriter', 'character', 'word', 'letters', 'heading', 'kinetic'
       │   └── Pattern: text_animations (SplitText chars/words/lines, masked line overflow, stagger)
       │
       ├── Contains 'hover', 'click', 'drag', 'magnetic', 'cursor', 'interactive', 'tilt'
       │   └── Pattern: interactive (Draggable, InertiaPlugin, gsap.quickTo, mouse physics)
       │
       ├── Contains 'hero', 'intro', 'fade in', 'entrance', 'appear', 'page load', 'reveal'
       │   └── Pattern: entrance_animations (gsap.from/fromTo, timeline, stagger, power4.out)
       │
       ├── Contains 'svg', 'draw', 'stroke', 'path', 'morph', 'vector', 'shape'
       │   └── Pattern: svg_animations (DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin)
       │
       ├── Contains 'sequence', 'timeline', 'choreography', 'step by step', 'scene'
       │   └── Pattern: complex_sequences (gsap.timeline, labels, relative position syntax)
       │
       └── Contains 'smooth', 'lag', '60fps', 'optimize', 'mobile', 'perf'
           └── Pattern: performance_critical (force3D: true, will-change, GPU layers, clearProps)
```

---

## ⚙️ Step 2: Production Code Generators by Pattern

### 🌊 Pattern A: Scroll-Based Animation (`scroll_based`)

#### For React 18/19 & Next.js App Router:
```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      // 1. Batch Staggered Entrance for Cards (Compositor only, 60fps locked)
      ScrollTrigger.batch(".scroll-card", {
        interval: 0.1,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 70, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.1,
              stagger: 0.12,
              ease: "power4.out",
              force3D: true,
              clearProps: "transform",
            }
          );
        },
        start: "top 85%",
      });

      // 2. Parallax Media Layer
      gsap.to(".parallax-media", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // 1-second smooth physics catching up
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative py-24 px-8 overflow-hidden">
      <div className="parallax-wrapper relative h-96 overflow-hidden rounded-2xl mb-12">
        <div className="parallax-media absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="scroll-card p-6 bg-neutral-900 border border-neutral-800 rounded-xl">Card 1</div>
        <div className="scroll-card p-6 bg-neutral-900 border border-neutral-800 rounded-xl">Card 2</div>
        <div className="scroll-card p-6 bg-neutral-900 border border-neutral-800 rounded-xl">Card 3</div>
      </div>
    </section>
  );
}
```

---

### ✍️ Pattern B: Kinetic Masked Typography (`text_animations`)

#### Vanilla JS / Framework Agnostic:
```javascript
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function initMaskedTypography(selector = ".editorial-title") {
  const element = document.querySelector(selector);
  if (!element) return;

  // Split into lines first, then wrap each line in overflow-hidden mask
  const split = new SplitText(element, {
    type: "lines,words",
    linesClass: "line-mask-wrapper",
  });

  // Apply CSS overflow:hidden to each line wrapper
  split.lines.forEach((line) => {
    line.style.overflow = "hidden";
  });

  // Animate words from below their respective line mask
  gsap.from(split.words, {
    yPercent: 110,
    duration: 1.2,
    stagger: 0.04,
    ease: "power4.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
}
```

---

### 🧲 Pattern C: Magnetic UI Micro-Interaction (`interactive`)

#### High-Performance Mouse Tracker using `gsap.quickTo`:
```javascript
import gsap from "gsap";

export function initMagneticButton(buttonSelector = ".magnetic-btn") {
  const btn = document.querySelector(buttonSelector);
  if (!btn) return;

  // quickTo creates highly optimized, persistent transform updaters
  const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

  btn.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate displacement distance with dampening factor (0.35)
    const deltaX = (clientX - centerX) * 0.35;
    const deltaY = (clientY - centerY) * 0.35;

    xTo(deltaX);
    yTo(deltaY);
  });

  btn.addEventListener("mouseleave", () => {
    // Snap smoothly back to origin
    xTo(0);
    yTo(0);
  });
}
```

---

### 👑 Pattern D: Epic Hero Section Choreography (`entrance_animations`)

```javascript
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function buildHeroTimeline() {
  const masterTl = gsap.timeline({ defaults: { ease: "power4.out" } });

  const titleSplit = new SplitText(".hero-title", {
    type: "lines,words",
    linesClass: "overflow-hidden",
  });

  masterTl
    .fromTo(
      ".hero-backdrop",
      { scale: 1.2, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 2, ease: "power2.out" }
    )
    .from(
      titleSplit.words,
      { yPercent: 110, duration: 1.3, stagger: 0.05 },
      "-=1.5"
    )
    .from(
      ".hero-subtitle",
      { y: 30, autoAlpha: 0, duration: 0.9 },
      "-=0.9"
    )
    .from(
      ".hero-actions",
      { y: 20, autoAlpha: 0, duration: 0.8 },
      "-=0.6"
    );

  return masterTl;
}
```

---

## 📱 Accessibility & Reduced Motion Guard

Always wrap non-essential animations with a reduced-motion media query check:

```javascript
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced) {
  // Graceful fallback: instant or subtle opacity transition only
  gsap.set(".animated-content", { autoAlpha: 1, y: 0 });
} else {
  // Execute full choreography
}
```
