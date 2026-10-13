---
name: gsap-plugins
description: Master skill for all GSAP plugins — SplitText, Flip, Draggable, Inertia, DrawSVG, MorphSVG, MotionPath, CustomEase, and GSDevTools. All plugins are 100% free with standard npm install gsap. Use when implementing text splitting, FLIP layout animations, draggable/throwable UI, SVG stroke drawing, SVG path morphing, motion paths, or custom physics easing.
license: MIT
---

# GSAP Plugins Master Skill

## When to Use This Skill

Apply this skill when implementing advanced creative animations using GSAP plugins:
- **SplitText**: Splitting text into characters, words, or lines for kinetic typography.
- **Flip**: Seamless FLIP layout state transitions (filtering grids, expanding modals, reordering).
- **Draggable & Inertia**: Physics-based dragging, flicking/throwing momentum, snapping grids.
- **DrawSVG**: Animating SVG path stroke reveals (drawing icons, logos, illustrations).
- **MorphSVG**: Seamlessly morphing one SVG path into another.
- **MotionPath**: Moving objects along complex curved SVG paths.
- **CustomEase**: Creating bespoke cubic-bezier or SVG-defined easing curves.
- **GSDevTools**: Visual scrubber UI for fine-tuning timeline timings.

> 📦 **Plugin Availability**: All advanced GSAP plugins (SplitText, MorphSVG, DrawSVG, Flip, Inertia, ScrollSmoother, CustomEase) are fully included and accessible via standard `npm install gsap`. No private registry tokens or paid subscriptions are required.

---

## ⚡ Plugin Registration Blueprint

```javascript
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(
  SplitText,
  Flip,
  Draggable,
  InertiaPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  CustomEase
);
```

---

## ✍️ 1. SplitText (Kinetic Typography)

Splits text into wrapped spans without breaking accessibility or DOM structure:

```javascript
import { SplitText } from "gsap/SplitText";

// Split into characters and words
const split = new SplitText(".headline", {
  type: "chars,words,lines",
  charsClass: "char-item",
  linesClass: "line-item overflow-hidden", // Enables overflow-hidden line masking!
});

// Animate characters sliding up out of masked lines
gsap.from(split.chars, {
  yPercent: 120,
  autoAlpha: 0,
  rotationZ: 5,
  stagger: 0.02,
  duration: 1.2,
  ease: "power4.out",
});

// Revert back to original plain text if needed (e.g. on unmount or before window resize)
// split.revert();
```

---

## 🔄 2. Flip (FLIP Layout Animations)

First-Last-Invert-Play technique for high-performance layout transitions (expanding cards to fullscreen modals, filter grid rearranging):

```javascript
import { Flip } from "gsap/Flip";

function filterGrid(category) {
  // 1. Record current state of elements
  const state = Flip.getState(".grid-item");

  // 2. Perform DOM mutations (hide/show items, re-order flex/grid)
  document.querySelectorAll(".grid-item").forEach((el) => {
    el.style.display = el.dataset.category === category || category === "all" ? "block" : "none";
  });

  // 3. Animate smoothly from old layout to new layout!
  Flip.from(state, {
    duration: 0.7,
    ease: "power3.inOut",
    stagger: 0.05,
    absolute: true, // Prevents layout snapping during transition
    onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 }),
    onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.5 }),
  });
}
```

---

## 🖐️ 3. Draggable & Inertia (Physics-Based UI)

Physics-based dragging with flick momentum and grid snapping:

```javascript
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

Draggable.create(".carousel-track", {
  type: "x",
  bounds: ".carousel-container", // Confines movement to wrapper
  inertia: true,                // Enables smooth momentum throwing!
  edgeResistance: 0.65,         // Bouncy resistance at edges
  snap: {
    x: (endValue) => Math.round(endValue / 300) * 300, // Snaps to 300px card intervals!
  },
  onDragStart: () => gsap.to(".carousel-track", { cursor: "grabbing" }),
  onDragEnd: () => gsap.to(".carousel-track", { cursor: "grab" }),
});
```

---

## ✒️ 4. DrawSVGPlugin (Path Stroke Revealer)

Animates stroke-dashoffset on SVG paths seamlessly:

```javascript
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Draw signature/icon from 0% to 100%
gsap.fromTo(
  ".signature-path",
  { drawSVG: "0%" },
  { drawSVG: "100%", duration: 2.5, ease: "power2.inOut" }
);

// Segmented drawing: animate a moving dash segment along a line
gsap.fromTo(
  ".circuit-line",
  { drawSVG: "0% 10%" },
  { drawSVG: "90% 100%", duration: 2, repeat: -1, ease: "none" }
);
```

---

## 🧬 5. MorphSVGPlugin (Shape Shifting)

Seamlessly morphs complex SVG paths with unequal vertex counts:

```javascript
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Morphs button icon from play arrow to pause bars
gsap.to(".play-icon-path", {
  morphSVG: ".pause-icon-path",
  duration: 0.6,
  ease: "power2.inOut",
});
```

---

## 🛤️ 6. MotionPathPlugin (Animate Along Curves)

Moves elements along custom curved SVG paths:

```javascript
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.to(".airplane-icon", {
  duration: 5,
  repeat: -1,
  ease: "power1.inOut",
  motionPath: {
    path: "#flight-path-svg",
    align: "#flight-path-svg",
    autoRotate: true,        // Automatically orients icon to face direction of travel!
    alignOrigin: [0.5, 0.5],
  },
});
```

---

## 📈 7. CustomEase (Precision Physics)

Create bespoke easing curves matching custom physics or design specs:

```javascript
import { CustomEase } from "gsap/CustomEase";

// Create custom luxury ease
CustomEase.create("luxuryEase", "M0,0 C0.16,1 0.3,1 1,1");

gsap.to(".luxury-card", {
  y: 0,
  duration: 1.4,
  ease: "luxuryEase",
});
```
