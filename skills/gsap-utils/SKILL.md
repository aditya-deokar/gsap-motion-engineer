---
name: gsap-utils
description: Master skill for gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, distribute, and pipe. Use when performing mathematical mappings, converting scroll/cursor coordinates, building carousel wrapping logic, normalizing inputs, or composing utility functions.
license: MIT
---

# gsap.utils Master Utility Skill

## When to Use This Skill

Apply this skill whenever writing math, coordinate mapping, or data transformations for animations:
- Mapping mouse or scroll positions to transforms (`mapRange`, `normalize`, `interpolate`).
- Confining movement within min/max boundaries (`clamp`).
- Creating infinite continuous carousels (`wrap`, `wrapYoyo`).
- Converting selectors or NodeLists into guaranteed clean arrays (`toArray`).
- Generating deterministic or snapped values (`random`, `snap`).
- Chaining mathematical transformations into clean pipelines (`pipe`).

---

## 🛠️ Essential Utility Methods

### 1. `gsap.utils.mapRange(inMin, inMax, outMin, outMax, value)`
Maps a value from an input range to a corresponding output range. Essential for interactive cursor/scroll math:

```javascript
import gsap from "gsap";

// Map mouse X (0px to 1920px) to card rotation (-15deg to +15deg)
window.addEventListener("mousemove", (e) => {
  const rotation = gsap.utils.mapRange(0, window.innerWidth, -15, 15, e.clientX);
  gsap.to(".card", { rotationY: rotation, duration: 0.3 });
});

// Curried function for high-performance reuse:
const getTilt = gsap.utils.mapRange(0, window.innerHeight, -20, 20);
const tiltY = getTilt(e.clientY);
```

---

### 2. `gsap.utils.clamp(min, max, value)`
Clamps a number between a lower and upper bound:

```javascript
const clampSpeed = gsap.utils.clamp(-50, 50);

// Guarantees value never drops below -50 or exceeds 50
const safeSpeed = clampSpeed(calculatedDelta);
```

---

### 3. `gsap.utils.normalize(min, max, value)`
Normalizes any number within a range to a `0` to `1` decimal (ideal for progress indicators):

```javascript
// Convert scroll position (500px to 2500px) to decimal 0 -> 1:
const getScrollProgress = gsap.utils.normalize(500, 2500);
const progress = getScrollProgress(window.scrollY);
```

---

### 4. `gsap.utils.interpolate(start, end, progress)`
Linearly interpolates between two numbers, colors, or objects:

```javascript
// Number interpolation:
const midVal = gsap.utils.interpolate(0, 500, 0.5); // Returns 250

// Color interpolation:
const midColor = gsap.utils.interpolate("#ff0000", "#0000ff", 0.5); // Returns rgb(128, 0, 128)
```

---

### 5. `gsap.utils.toArray(targets)`
Safely converts strings, NodeLists, HTMLCollections, or arrays into a clean Array of DOM elements:

```javascript
// Avoids Array.from() boilerplate:
const cards = gsap.utils.toArray(".portfolio-card");
cards.forEach((card, index) => {
  gsap.from(card, { y: index * 20, autoAlpha: 0 });
});
```

---

### 6. `gsap.utils.wrap(min, max, value)`
Wraps a value within a range so that exceeding `max` wraps around to `min` (critical for infinite carousels):

```javascript
const wrapIndex = gsap.utils.wrap(0, 5); // 0, 1, 2, 3, 4

wrapIndex(5); // Returns 0
wrapIndex(6); // Returns 1
wrapIndex(-1); // Returns 4

// In animations (Infinite Ticker):
gsap.to(".carousel-item", {
  x: -1000,
  modifiers: {
    x: gsap.utils.wrap(-1000, 0), // Keeps items looping smoothly
  },
});
```

---

### 7. `gsap.utils.snap(snapIncrementOrArray, value)`
Snaps a value to the nearest increment or closest array value:

```javascript
// Snap to nearest 50:
const snapToGrid = gsap.utils.snap(50);
snapToGrid(48); // Returns 50
snapToGrid(22); // Returns 0

// Snap to closest values in an array:
const snapToBreakpoints = gsap.utils.snap([0, 100, 300, 800]);
snapToBreakpoints(120); // Returns 100
snapToBreakpoints(280); // Returns 300
```

---

### 8. `gsap.utils.pipe(fn1, fn2, fn3...)`
Composes multiple transformation functions into a single reusable pipeline:

```javascript
// Build a pipeline: Clamp -> Map -> Snap
const processCoordinate = gsap.utils.pipe(
  gsap.utils.clamp(0, 1000),             // 1. Confine within 0-1000
  gsap.utils.mapRange(0, 1000, 0, 100),  // 2. Map to 0-100 percentage
  gsap.utils.snap(5)                     // 3. Snap to 5% increments
);

const finalPercentage = processCoordinate(482); // Returns 50
```
