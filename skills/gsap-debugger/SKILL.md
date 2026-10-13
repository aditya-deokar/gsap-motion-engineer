---
name: gsap-debugger
description: Surgical GSAP debugging and diagnostic troubleshooting playbook. Instantly diagnoses and fixes React 18/19 strict mode double-firing, Flash of Unstyled Content (FOUC), ScrollTrigger pin spacing jumps, mobile Safari layout shift, timeline conflicts, memory leaks, and provides emergency reset commands. Use when animations lag, fail to trigger, repeat unexpectedly, or break on route changes.
license: MIT
---

# GSAP Debugger & Troubleshooting Matrix

## When to Use This Skill

Activate this skill whenever:
- Animations stutter, drop frames, or fail to play smoothly.
- ScrollTriggers trigger at incorrect offsets, fail to pin, or overlap adjacent sections.
- Animations play twice or break when navigating back/forward in React or Next.js.
- An unstyled flash of content appears before GSAP initializes (FOUC).
- You see `window is not defined` or hydration errors in Next.js / Nuxt.
- An emergency reset is needed to clear corrupted animation states.

---

## 🚨 Emergency Circuit Breaker

When all animations are desynchronized or stuck in an invalid state during development, run this emergency snippet to flush the entire GSAP engine:

```javascript
// EMERGENCY RESET: Clears all timelines, kills all scroll triggers, wipes inline styles
gsap.globalTimeline.clear();
if (window.ScrollTrigger) {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
gsap.set("*", { clearProps: "all" });
console.log("🛑 GSAP Engine completely reset.");
```

---

## 🔍 Diagnostic Matrix & Troubleshooting Tree

Use this decision tree to locate the root cause of the bug:

```
Symptoms
  ├── Jitter / lag / low FPS ──> Check CSS properties: Are you animating left/top/width/height?
  ├── Double-play in React ──> React Strict Mode running twice without useGSAP / context cleanup
  ├── Elements flash before hiding ──> FOUC (Flash of Unstyled Content) missing autoAlpha or CSS guard
  ├── ScrollTrigger offset wrong ──> Layout shift / images loaded after trigger created (missing refresh)
  ├── Section jumps when pinning ──> Missing pinSpacing or anticipatePin
  └── "window is not defined" ──> Next.js SSR executing DOM code on server
```

---

## 🛠️ The Top 8 GSAP Pitfalls & Guaranteed Fixes

### 1. React 18/19 Strict Mode Double Execution
**The Problem**: React mounts, unmounts, and remounts components in development. If using plain `useEffect`, tweens instantiate twice and fight each other.
**The Fix**: Use `@gsap/react` `useGSAP` hook or wrap inside `gsap.context()`:
```jsx
// ❌ WRONG
useEffect(() => {
  gsap.from(".box", { x: 100 });
}, []);

// ✅ CORRECT: Automatically cleans up and handles Strict Mode
useGSAP(() => {
  gsap.from(".box", { x: 100 });
}, { scope: containerRef });
```

---

### 2. Flash of Unstyled Content (FOUC)
**The Problem**: When using `gsap.from()`, elements start visible in CSS, then GSAP loads and snaps them to their "from" position a fraction of a second later, causing an ugly flash.
**The Fix**:
1. Add CSS guard:
```css
/* Hide until GSAP is ready */
.fouc-guard {
  visibility: hidden;
}
```
2. Always use `autoAlpha` instead of `opacity`:
```javascript
// GSAP automatically flips visibility: visible when animating from autoAlpha: 0!
gsap.from(".fouc-guard", {
  autoAlpha: 0,
  y: 40,
  duration: 1,
});
```

---

### 3. Next.js App Router SSR / Hydration Errors
**The Problem**: GSAP and ScrollTrigger access `window` and `document`. In Next.js App Router, components render on the server where `window` does not exist.
**The Fix**:
Add `"use client"` directive at top of file, and ensure plugins are registered safely:
```tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safe top-level registration in client components
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

---

### 4. Layout Property Thrashing (`left`, `top`, `width`, `height`)
**The Problem**: Animating `left`, `top`, `width`, or `height` forces the browser CPU to recalculate page layout on every single frame, causing frame drops.
**The Fix**: Convert directly to composite transforms:
```javascript
// ❌ BAD: Layout Reflow
gsap.to(".card", { left: 100, top: 50, width: 300 });

// ✅ GOOD: 100% GPU Accelerated
gsap.to(".card", { x: 100, y: 50, scaleX: 1.5, force3D: true });
```

---

### 5. ScrollTrigger Offsets Incorrect After Async Content Loads
**The Problem**: ScrollTrigger calculates trigger positions when the page initially loads. When dynamic images, fonts, or API data load later, page height expands, making triggers fire too early or too late.
**The Fix**:
```javascript
// Call refresh whenever content height changes
ScrollTrigger.refresh();

// Best practice: Refresh when images finish loading
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
```

---

### 6. Overlapping Tweens Fighting for the Same Target
**The Problem**: Triggering multiple tweens on the same element (e.g. rapid hover events) causes conflicting tweens to run concurrently, resulting in stutter.
**The Fix**: Use `overwrite: "auto"` or `gsap.quickTo()`:
```javascript
// Overwrite any active tweens on these properties
gsap.to(".button", {
  scale: 1.1,
  duration: 0.3,
  overwrite: "auto",
});
```

---

### 7. Section Jumps When Pinning
**The Problem**: When ScrollTrigger pins an element, it wraps it in a pin-spacer container. If the trigger doesn't anticipate the pin or has complex CSS margins, a visible jump occurs.
**The Fix**:
```javascript
ScrollTrigger.create({
  trigger: ".pinned-section",
  pin: true,
  anticipatePin: 1,      // Prevents tiny visible hitch before pinning
  pinSpacing: true,       // Ensures following content waits below
  invalidateOnRefresh: true,
});
```

---

### 8. Memory Leaks on Single Page App Route Changes
**The Problem**: Navigating between pages in React, Next.js, or Vue leaves background ScrollTriggers active, querying elements that no longer exist.
**The Fix**:
```javascript
// In Vue / Vanilla router hook:
router.afterEach(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
```
In React, `useGSAP` handles this automatically if `scope` is passed.

---

## 📋 Comprehensive Pre-Flight Debugging Checklist

Before deploying animations to production, verify:
- [ ] Are all plugins registered via `gsap.registerPlugin()`?
- [ ] Are all animated elements scoped within their component ref?
- [ ] Are you animating `x`/`y`/`scale` instead of `left`/`top`/`width`/`height`?
- [ ] Have you set `force3D: true` on complex transform animations?
- [ ] Have you tested with `markers: true` on ScrollTriggers?
- [ ] Is `autoAlpha` used instead of raw `opacity` to avoid FOUC?
- [ ] Does the page respect `(prefers-reduced-motion: reduce)`?
- [ ] Have you tested on a real mobile device (not just desktop devtools)?
