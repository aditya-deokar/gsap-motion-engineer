---
name: gsap-core
description: Comprehensive GSAP core engine skill — gsap.to(), gsap.from(), gsap.fromTo(), gsap.set(), easings catalog, advanced staggers, gsap.matchMedia(), defaults, and natural language intent analysis. Use when creating or refining tweens, easing curves, entrance animations, responsive breakpoints, accessible motion, or foundational GSAP architecture.
license: MIT
---

# GSAP Core Engine

## When to Use This Skill

Apply this skill when creating or reviewing fundamental GSAP animations:
- Creating single tweens (`gsap.to`, `gsap.from`, `gsap.fromTo`, `gsap.set`).
- Choosing or tuning easing curves for organic, springy, or snapping feels.
- Orchestrating multi-element staggered entrances (`stagger` object syntax).
- Implementing responsive animations and accessibility controls via `gsap.matchMedia()`.
- Setting global animation defaults.

---

## 🎯 Natural Language Intent Classification

When given an animation prompt, check these criteria to formulate the optimal tween parameters:

```
User Prompt
  ├── "Fade in / slide in / reveal when loaded" ──> gsap.from() or gsap.fromTo() with autoAlpha
  ├── "Move to / change state / interactive response" ──> gsap.to()
  ├── "Instant state setup / reset before animating" ──> gsap.set()
  ├── "Sequence of multiple items (cards, list, grid)" ──> stagger object with from: "start" | "center" | "random"
  └── "Desktop vs mobile or prefers-reduced-motion" ──> gsap.matchMedia()
```

---

## Core Methods Deep Dive

### 1. `gsap.to(targets, vars)`
Animates targets from their current computed styles to destination values.
```javascript
gsap.to(".card", {
  x: 100,
  rotationY: 15,
  duration: 1.2,
  ease: "power3.out",
  force3D: true,
  onComplete: () => console.log("Card moved!"),
});
```

### 2. `gsap.from(targets, vars)`
Animates targets from specified initial values to their natural CSS state. Perfect for page-load and scroll entrances.
```javascript
// Best practice: Use autoAlpha to prevent Flash of Unstyled Content (FOUC)
gsap.from(".hero-headline", {
  y: 80,
  autoAlpha: 0,
  duration: 1.4,
  ease: "power4.out",
});
```

### 3. `gsap.fromTo(targets, fromVars, toVars)`
Explicit control over both starting and ending values. Essential when dynamic rerenders or user interruptions might leave the element in an indeterminate state.
```javascript
gsap.fromTo(".modal-backdrop", 
  { autoAlpha: 0, backdropFilter: "blur(0px)" },
  { autoAlpha: 1, backdropFilter: "blur(12px)", duration: 0.6, ease: "power2.out" }
);
```

### 4. `gsap.set(targets, vars)`
Instantly applies values without animating (duration 0). Used for initializing positions or resetting styles.
```javascript
// Initialize state before animation
gsap.set(".dropdown-menu", { autoAlpha: 0, y: -20, scale: 0.95, transformOrigin: "top center" });

// Complete property reset
gsap.set(".animated-item", { clearProps: "all" });
```

### 5. `gsap.delayedCall(delay, callback, params)`
High-precision timer synchronized with GSAP's internal ticker (immune to tab throttling issues that affect `setTimeout`).
```javascript
const timer = gsap.delayedCall(1.5, showToast, ["Saved successfully!"]);
// To cancel:
timer.kill();
```

---

## 🎨 Easing Catalog & Physics Selection

The choice of ease dictates the emotion of the motion:

| Easing | Character / Feel | Ideal Use Cases |
| :--- | :--- | :--- |
| `"power1.out"` / `"power2.out"` | Gentle, subtle deceleration | UI menus, dropdowns, tooltips |
| `"power3.out"` / `"power4.out"` | Modern, sleek agency deceleration | Hero sections, card entrances, page reveals |
| `"expo.out"` | Dramatic snap with long, ultra-smooth tail | High-end luxury typography reveals, bold entrances |
| `"back.out(1.7)"` | Overshoots destination then snaps back | Buttons, badges, notification icons, popups |
| `"elastic.out(1, 0.3)"` | Physical rubber-band jelly bounce | Playful micro-interactions, pull-to-refresh indicators |
| `"circ.out"` | Sharp, abrupt stop | High-speed technical interfaces, cyber/gaming UIs |
| `"none"` (linear) | Constant speed | Endless rotations, ticker marquees, scrubbed parallax |

```javascript
// Example: Bouncy pop-in
gsap.from(".badge", {
  scale: 0,
  autoAlpha: 0,
  duration: 0.8,
  ease: "back.out(1.7)",
});

// Example: Rubber-band alert
gsap.from(".alert-box", {
  scale: 0.3,
  autoAlpha: 0,
  duration: 1.2,
  ease: "elastic.out(1, 0.3)",
});
```

---

## ⚡ Stagger Choreography (Grid & Multi-Element)

Never animate groups with identical timing. Use `stagger` to create natural ripples:

```javascript
gsap.from(".grid-item", {
  y: 60,
  autoAlpha: 0,
  scale: 0.9,
  duration: 0.8,
  ease: "power3.out",
  stagger: {
    amount: 0.6,        // Total time distributed among all items (independent of count)
    from: "center",     // "start" | "center" | "end" | "edges" | "random" | index [0]
    grid: [4, 3],       // Automatically calculates 2D distance for rows/cols!
    axis: "y",          // Restrict stagger calculation along "x" or "y"
    ease: "power2.inOut" // Easing curve for the distribution itself
  }
});
```

---

## 📱 Responsive & Accessible Motion with `gsap.matchMedia()`

`gsap.matchMedia()` is the gold standard for handling screen sizes and respecting user vestibular disorders (`prefers-reduced-motion`):

```javascript
const mm = gsap.matchMedia();

mm.add({
  // Desktop
  isDesktop: "(min-width: 1024px)",
  // Mobile / Tablet
  isMobile: "(max-width: 1023px)",
  // Accessibility check
  reduceMotion: "(prefers-reduced-motion: reduce)",
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions;

  if (reduceMotion) {
    // Instant or gentle fade for accessibility compliance
    gsap.from(".hero-content", { autoAlpha: 0, duration: 0.3 });
    return;
  }

  if (isDesktop) {
    // Full cinematic experience for desktop
    gsap.from(".hero-title", { y: 100, autoAlpha: 0, duration: 1.4, ease: "power4.out" });
    gsap.from(".hero-3d-model", { scale: 0.8, autoAlpha: 0, duration: 2, ease: "power2.out" });
  }

  if (isMobile) {
    // Lightweight, compact motion for mobile batteries and smaller viewports
    gsap.from(".hero-title", { y: 40, autoAlpha: 0, duration: 0.8, ease: "power2.out" });
  }
});

// Auto-cleanup on unmount / teardown
// mm.revert();
```

---

## 🔧 Global Engine Defaults

Set sensible global defaults at app root to reduce boilerplate:

```javascript
gsap.defaults({
  duration: 1,
  ease: "power3.out",
  force3D: true, // Guarantees GPU acceleration layers across all tweens
});
```
