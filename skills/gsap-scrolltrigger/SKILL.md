---
name: gsap-scrolltrigger
description: Master GSAP ScrollTrigger skill — scroll-linked tweens, timelines, section pinning, scrubbed parallax, ScrollTrigger.batch for card grids, progress bars, horizontal scrolling, and mobile viewport resize handling. Use when building scroll-driven animations, pinned hero/product showcases, scrub effects, or parallax.
license: MIT
---

# GSAP ScrollTrigger Master Skill

## When to Use This Skill

Apply this skill whenever creating or refining scroll-driven experiences:
- Triggering entrance animations when elements enter the viewport.
- Linking animations directly to scroll progress (`scrub: true` or `scrub: 1`).
- Pinning sections while content scrubs or transitions horizontally.
- Staggering cards or grid items cleanly on scroll with `ScrollTrigger.batch()`.
- Building parallax backgrounds and multi-speed floating elements.
- Handling dynamic DOM changes, accordion expansions, and mobile browser address bar resizes.

---

## ⚡ Registration & Basic Setup

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

## 🎯 ScrollTrigger Core Syntax

### 1. Trigger with `toggleActions`
Used for one-off or reversible entrance animations.
`toggleActions: "onEnter onLeave onEnterBack onLeaveBack"`
(Options: `play`, `pause`, `resume`, `reset`, `restart`, `complete`, `reverse`, `none`)

```javascript
gsap.from(".feature-card", {
  y: 80,
  autoAlpha: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".feature-card",
    start: "top 80%",             // When top of trigger hits 80% down the viewport
    end: "bottom 20%",
    toggleActions: "play none none reverse", // Plays entering down, reverses going up
    // markers: true,              // Enable during debugging to see trigger points!
  },
});
```

### 2. Scrubbed Animation (Scroll-Linked Timeline)
Binds the animation progress directly to the user's scrollbar.
- `scrub: true`: Locked 1:1 to scrollbar position.
- `scrub: 1` (Recommended): 1-second smooth physics interpolation (smooth catching up).

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".product-stage",
    start: "top top",
    end: "+=1500", // 1500px of scroll distance
    scrub: 1,      // 1-second smoothing dampening
    pin: true,     // Pin stage during scrubbing
    anticipatePin: 1,
  },
});

tl.to(".product-model", { rotationY: 180, scale: 1.2 })
  .to(".product-spec-callout", { autoAlpha: 1, x: 0 }, "-=0.5")
  .to(".product-bg", { filter: "brightness(0.4)" }, "<");
```

---

## 🚀 High-Performance Card Entrances with `ScrollTrigger.batch()`

Creating individual ScrollTriggers for 50+ cards creates DOM overhead. **`ScrollTrigger.batch()`** batches elements that enter the viewport simultaneously, playing a single stagger tween for maximum 60fps performance:

```javascript
ScrollTrigger.batch(".portfolio-card", {
  interval: 0.1, // Batch items entering within 100ms window
  batchMax: 3,   // Max items per batch
  onEnter: (batch) => {
    gsap.fromTo(
      batch,
      { y: 80, autoAlpha: 0, scale: 0.95 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  },
  onLeaveBack: (batch) => {
    // Optional: reset cards when scrolling back up above them
    gsap.to(batch, { autoAlpha: 0, y: 80, duration: 0.4, overwrite: "auto" });
  },
  start: "top 85%",
});
```

---

## 🌌 Multi-Speed Parallax Architecture

Achieve cinematic depth by moving background, midground, and foreground layers at varying rates:

```javascript
class ParallaxManager {
  constructor() {
    this.init();
  }

  init() {
    gsap.utils.toArray("[data-speed]").forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-speed")) || 0.5;
      const yShift = -100 * speed;

      gsap.to(element, {
        y: `${yShift}%`,
        ease: "none",
        scrollTrigger: {
          trigger: element.closest("section") || element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
  }
}

new ParallaxManager();
```
HTML Usage:
```html
<section class="hero-section">
  <div class="layer bg" data-speed="0.2"></div>
  <div class="layer mid" data-speed="0.5"></div>
  <div class="layer fg" data-speed="0.9"></div>
</section>
```

---

## 📊 Global Scroll Progress Bar

```javascript
gsap.to(".global-scroll-progress", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3,
  },
});
```
CSS:
```css
.global-scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #ec4899);
  transform-origin: left center;
  transform: scaleX(0);
  z-index: 9999;
}
```

---

## 🔄 Refresh & Layout Shift Management

When content changes asynchronously (image loads, fonts load, accordions expand, API data fetches):

```javascript
// Recalculate all trigger start and end positions accurately
ScrollTrigger.refresh();

// Best practice: Automatically recalculate when images finish loading
window.addEventListener("load", () => ScrollTrigger.refresh());

// If an accordion toggles:
function onAccordionToggle() {
  ScrollTrigger.refresh();
}
```

### Dynamic Positioning with `invalidateOnRefresh`
If your tween values depend on responsive calculations:
```javascript
gsap.to(".box", {
  x: () => window.innerWidth - 200, // Function-based dynamic value
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    scrub: true,
    invalidateOnRefresh: true, // Forces re-evaluation of functional values on resize!
  },
});
```

---

## 📱 Mobile Safari Address Bar Jumping Defense

On iOS and Android Safari/Chrome, the address bar retracts when scrolling, causing `100vh` jumps.
1. Use `ScrollTrigger.normalizeScroll(true)` to prevent address bar jitter.
2. Avoid CSS `100vh` on pinned containers; use `100svh` or `100dvh`.
3. Set `anticipatePin: 1` on pinned sections to avoid slight visible delay before pinning kicks in.
