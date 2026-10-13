---
name: gsap-production-patterns
description: Battle-tested agency-grade GSAP production patterns — epic hero section sequences, kinetic typography, magnetic cursor and buttons, 3D card tilts, loading screens, and infinite marquees. Use when building awe-inspiring hero sections, interactive micro-interactions, portfolio showcases, or complex choreography.
license: MIT
---

# GSAP Production Patterns Library

## When to Use This Skill

Apply this skill when you need battle-tested, agency-level animation systems that are immediately production-ready:
- Creating high-impact **Hero Sections** with layered reveals and parallax.
- Implementing **Kinetic Typography** (character reveals, line masking, typewriters).
- Building **Magnetic Buttons** and smooth custom cursors.
- Creating **3D Interactive Card Tilts** on hover.
- Implementing **Loading Screen / Curtain Wipe** sequences.
- Building **Seamless Infinite Marquees / Tickers**.

---

## 🌟 Pattern 1: Epic Agency Hero Section

A layered choreography system combining image scaling, staggered typography, elastic CTA entrance, and scrubbed scroll depth.

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initHeroAnimation() {
  const masterTl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  const titleSplit = new SplitText(".hero-title", { type: "words,chars" });

  // 1. Entrance Sequence
  masterTl
    .fromTo(
      ".hero-bg",
      { scale: 1.25, filter: "brightness(0.3)" },
      { scale: 1, filter: "brightness(1)", duration: 2, ease: "power2.out" }
    )
    .from(
      titleSplit.chars,
      {
        y: 100,
        autoAlpha: 0,
        rotationZ: 6,
        stagger: 0.02,
        duration: 1.2,
        ease: "power4.out",
      },
      "-=1.4"
    )
    .from(
      ".hero-subtitle",
      { y: 40, autoAlpha: 0, duration: 1 },
      "-=0.8"
    )
    .from(
      ".hero-cta",
      { scale: 0.7, autoAlpha: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(
      ".hero-scroll-indicator",
      { y: -10, autoAlpha: 0 },
      {
        y: 10,
        autoAlpha: 1,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      },
      "-=0.3"
    );

  // 2. Scroll Parallax Dismissal
  gsap.to(".hero-bg", {
    yPercent: 40,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".hero-content", {
    yPercent: -30,
    autoAlpha: 0.2,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}
```

---

## ✍️ Pattern 2: Kinetic Typography Master

### Masked Line Reveal (Editorial Baseline Rise)
The signature Awwwards headline reveal: text emerges upward from an invisible horizon line:
```javascript
export function animateMaskedLines(selector) {
  const element = document.querySelector(selector);
  if (!element) return;

  const split = new SplitText(element, {
    type: "lines,words",
    linesClass: "line-mask-wrapper",
  });

  split.lines.forEach((line) => {
    line.style.overflow = "hidden";
  });

  gsap.from(split.words, {
    yPercent: 110,
    duration: 1.3,
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

### Character Reveal with 3D Perspective
```javascript
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function animateSplitCharacters(selector) {
  const split = new SplitText(selector, { type: "chars,words" });

  gsap.from(split.chars, {
    y: 90,
    autoAlpha: 0,
    rotationX: -60,
    transformOrigin: "50% 50% -50px",
    stagger: {
      amount: 0.8,
      from: "start",
    },
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 80%",
    },
  });
}
```

### Typewriter with Blinking Cursor
```javascript
export function animateTypewriter(elementSelector, textString) {
  const target = document.querySelector(elementSelector);
  target.textContent = "";

  const tl = gsap.timeline({ repeat: 0 });
  const chars = textString.split("");

  chars.forEach((char) => {
    tl.call(() => {
      target.textContent += char;
    }, null, "+=0.04");
  });
}
```

---

## 🧲 Pattern 3: Magnetic Button & Smooth Cursor

Creates an interactive magnetic button that pulls towards the cursor when hovered, using high-speed `quickTo()`:

```javascript
import gsap from "gsap";

export function initMagneticButton(buttonElement) {
  const xTo = gsap.quickTo(buttonElement, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(buttonElement, "y", { duration: 0.4, ease: "power3" });

  buttonElement.addEventListener("mousemove", (e) => {
    const rect = buttonElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.4; // Magnetic strength factor
    const distanceY = (e.clientY - centerY) * 0.4;

    xTo(distanceX);
    yTo(distanceY);
  });

  buttonElement.addEventListener("mouseleave", () => {
    // Snap back to resting position with elastic overshoot
    gsap.to(buttonElement, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1.1, 0.4)",
    });
  });
}
```

---

## 🎴 Pattern 4: 3D Interactive Card Tilt

Gives cards tactile 3D perspective and responds organically to cursor position:

```javascript
export function initCardTilt(cardElement) {
  const rotXTo = gsap.quickTo(cardElement, "rotationX", { duration: 0.5, ease: "power2.out" });
  const rotYTo = gsap.quickTo(cardElement, "rotationY", { duration: 0.5, ease: "power2.out" });

  cardElement.addEventListener("mousemove", (e) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y / rect.height) - 0.5) * -20; // Tilt range -10deg to +10deg
    const rotY = ((x / rect.width) - 0.5) * 20;

    rotXTo(rotX);
    rotYTo(rotY);
  });

  cardElement.addEventListener("mouseleave", () => {
    gsap.to(cardElement, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  cardElement.addEventListener("mouseenter", () => {
    gsap.to(cardElement, { scale: 1.03, duration: 0.4, ease: "power2.out" });
  });
}
```
Required CSS:
```css
.card-container {
  perspective: 1000px;
}
.card-element {
  transform-style: preserve-3d;
  will-change: transform;
}
```

---

## ⏳ Pattern 5: Master Preloader & Curtain Sequence

Simulates a high-end agency page preloader with animated percentage counter and curtain wipe:

```javascript
import gsap from "gsap";

export function initPreloader(onLoadedCallback) {
  const counter = { val: 0 };
  const counterElement = document.querySelector(".loader-counter");

  const tl = gsap.timeline({
    onComplete: onLoadedCallback,
  });

  tl.to(counter, {
    val: 100,
    duration: 1.8,
    ease: "power2.inOut",
    onUpdate: () => {
      counterElement.textContent = Math.round(counter.val) + "%";
    },
  })
  .to(".loader-content", {
    autoAlpha: 0,
    y: -30,
    duration: 0.4,
  })
  .to(".loader-curtain", {
    yPercent: -100,
    duration: 1.2,
    ease: "power4.inOut",
  })
  .from(
    ".hero-section",
    {
      y: 60,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.out",
    },
    "-=0.6"
  );
}
```
HTML:
```html
<div class="loader-curtain">
  <div class="loader-content">
    <div class="loader-spinner"></div>
    <div class="loader-counter">0%</div>
  </div>
</div>
```

---

## 🔄 Pattern 6: Seamless Infinite Ticker / Marquee

Seamlessly animates items continuously without stutter using GSAP's horizontal loop helper:

```javascript
export function initInfiniteTicker(selector, speed = 50) {
  const items = gsap.utils.toArray(selector);
  const totalWidth = items.reduce((acc, el) => acc + el.offsetWidth, 0);

  gsap.to(items, {
    xPercent: -100,
    repeat: -1,
    duration: totalWidth / speed,
    ease: "none",
    modifiers: {
      xPercent: gsap.utils.wrap(-100, 0), // Infinitely wraps items back into view
    },
  });
}
```
