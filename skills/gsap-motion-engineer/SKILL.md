---
name: gsap-motion-engineer
description: The master GSAP motion engineering and creative development skill suite. Translates natural language requests into award-winning, 60fps animations across React, Next.js, Vue, Svelte, and Vanilla JS. Enforces anti-AI-slop motion design principles, organic easing physics, kinetic typography masking, smooth momentum scroll orchestration, compositor-only GPU execution, and surgical debugging diagnostics.
license: MIT
---

# GSAP Motion Engineer — Master Architecture & Motion Director

> 🚀 **The Authoritative Motion Engineering Standard for AI Coding Agents & Creative Technologists**
> Translates natural language prompts into surgical, Awwwards-caliber motion across **React 18/19, Next.js App Router, Vue 3, Nuxt 3, Svelte 4/5, Astro, and Vanilla JS**.

---

## 💎 The Anti-AI-Slop Motion Manifesto: Guiding LLMs to Award-Winning Craft

Large Language Models (LLMs) default to predictable, low-craft animation patterns ("AI Slop") because generic training data is flooded with outdated, basic tutorials. When creating web animations, LLMs must strictly obey these **Creative Motion Engineering Laws**:

### 1. The "Everything Moves" Fallacy (Focal Restraint)
* **The AI Slop**: Fading and sliding every card, paragraph, icon, and button with the exact same `y: 50, opacity: 0`. It creates visual fatigue, cheapens the interface, and feels like a generic template.
* **The Master Standard**: Motion with intent. Choose **one** primary visual focal point (e.g., an editorial headline or hero visual). Secondary elements (labels, metadata, navigation) should either remain static or enter with a subtle, rapid opacity shift. Restraint is the hallmark of elite design.

### 2. The Organic Deceleration Easing Law
* **The AI Slop**: Default CSS `ease`, `linear`, `power1.out`, or aggressive cartoonish `bounce`. They feel either robotic, sluggish, or childish.
* **The Master Standard**: Real-world mass and exponential decay:
  * **High-End Luxury / Editorial**: `ease: "power4.out"` or `ease: "expo.out"` with durations `1.0s – 1.6s`. Fast initial burst that glides gracefully into rest.
  * **Snappy UI Micro-Interactions**: Custom cubic-bezier `cubic-bezier(0.16, 1, 0.3, 1)` or `ease: "power3.out"` with tight durations `0.25s – 0.4s`.
  * **Interactive Pointer/Cursor**: `gsap.quickTo()` with exponential dampening (`duration: 0.35, ease: "power3"`), never re-instantiating `gsap.to()` inside `mousemove` listeners.

### 3. Kinetic Masked Typography (Awwwards / Codrops Standard)
* **The AI Slop**: Translating a solid `<h1>` block upward with simple opacity.
* **The Master Standard**: Split text into lines or characters, wrap each line in a container with `overflow: hidden`, and slide each line up from `yPercent: 110` to `yPercent: 0`. The text emerges cleanly from an invisible horizon line.

### 4. Inertial Scroll & Smooth Ticker Synchronization
* **The AI Slop**: Binding raw `scrub: true` to jerky browser window scroll events, causing jittery pinned sections and desynced scrubs.
* **The Master Standard**: Pair ScrollTrigger with smooth momentum scrolling (e.g., Lenis). Always synchronize the render loop:
  ```javascript
  // Synchronize Lenis with GSAP Ticker
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
  Use `scrub: 1` or `scrub: 1.2` for weighted inertial lag.

### 5. Interruptible, Velocity-Preserving Interactions
* **The AI Slop**: Hardcoded `setTimeout()` delay chains or un-cancellable animations that lock the user or glitch when clicked rapidly.
* **The Master Standard**: Every interaction must be interruptible. Always pass `overwrite: "auto"`. If a user reverses a hover or clicks mid-animation, GSAP smoothly redirects momentum without snapping or resetting.

### 6. Compositor-Only Layer Protection
* **The AI Slop**: Animating `width`, `height`, `top`, `left`, `margin`, or `padding`. This triggers layout reflows (geometry recalculation), destroying frame rates on mobile.
* **The Master Standard**: 100% GPU-composited properties: `x`, `y`, `scale`, `rotation`, and `autoAlpha` (which automatically toggles `visibility: hidden` when opacity hits 0, eliminating GPU layer waste).

---

## 🧠 Step 1: AI Intent Analysis Engine

Before writing code, analyze the user's natural language request to classify the primary animation pattern and select optimal techniques:

| Intent Category | Trigger Keywords | Core Techniques | Best Practices |
| :--- | :--- | :--- | :--- |
| **Scroll-Based** | `scroll`, `parallax`, `pin`, `scrub`, `reveal on scroll`, `viewport` | `ScrollTrigger`, `ScrollTrigger.batch()`, `yPercent`, `scrub: 1`, Lenis sync | Use `ScrollTrigger.batch()` for multi-card grids; avoid animating `top`/`left`; add `invalidateOnRefresh: true` for responsive measurements. |
| **Entrance & Reveal** | `fade in`, `slide up`, `appear`, `stagger`, `page load`, `hero entrance` | `gsap.from()`, `gsap.fromTo()`, `stagger: 0.08`, `ease: "power4.out"` | Prevent FOUC with `autoAlpha: 0`; use `power4.out` or `expo.out` for natural deceleration. |
| **Text Effects** | `typewriter`, `split text`, `character reveal`, `word by word`, `kinetic` | `SplitText` (`type: "chars,words,lines"`), masked line containers, `stagger` | Wrap characters/lines in `overflow: hidden` containers for masked slide-ups; handle responsive resize re-splitting. |
| **Interactive & Micro** | `hover`, `magnetic`, `cursor follow`, `tilt`, `drag`, `throw` | `Draggable`, `InertiaPlugin`, `quickTo()`, mouse event math | Use `gsap.quickTo()` for mousemove tracking (drastically faster than `gsap.to()`); handle touch fallbacks. |
| **SVG & Morphing** | `draw svg`, `stroke`, `path animation`, `shape morph`, `motion path` | `DrawSVGPlugin`, `MorphSVGPlugin`, `MotionPathPlugin` | Optimize SVG paths before animation; use `vector-effect="non-scaling-stroke"`. |
| **Complex Sequences** | `choreograph`, `timeline`, `step by step`, `scene`, `multi-step` | `gsap.timeline()`, position parameter (`"-=0.5"`, `"<"`), labels | Build modular nested timelines; use timeline labels for key transition checkpoints. |
| **Performance Critical** | `lag`, `jank`, `choppy`, `stutter`, `60fps`, `mobile safari` | GPU transforms (`x`, `y`, `scale`), `force3D: true`, `will-change` | Replace all layout properties (`width`, `height`, `left`, `top`) with CSS transforms; verify frame budget < 16.67ms. |

---

## ⚡ Step 2: Multi-Framework Synthesis Architecture

Always generate idiomatic code matching the target framework:

### 1. React 18/19 & Next.js App Router (Client Components)
```bash
npm install gsap @gsap/react
```
```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialCards() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Batch Entrance for Cards (Compositor only, 60fps locked)
      ScrollTrigger.batch(".card", {
        interval: 0.1,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 60, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power4.out",
              force3D: true,
              clearProps: "transform",
            }
          );
        },
        start: "top 85%",
      });
    },
    { scope: container } // Scopes selector queries to container ref; cleans up automatically on unmount
  );

  return (
    <div ref={container} className="grid grid-cols-3 gap-6">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

### 2. Vue 3 / Nuxt 3 (`<script setup>`)
```bash
npm install gsap
```
```vue
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".fade-item", {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power4.out",
    });
  }, container.value);
});

onUnmounted(() => {
  ctx?.revert(); // Reverts tweens and kills triggers to prevent memory leaks on route change
});
</script>

<template>
  <div ref="container">
    <div class="fade-item">Item 1</div>
    <div class="fade-item">Item 2</div>
  </div>
</template>
```

### 3. Svelte 4/5 / SvelteKit
```bash
npm install gsap
```
```svelte
<script>
  import { onMount } from "svelte";
  import gsap from "gsap";

  let container;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from(".box", {
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, container);

    return () => ctx.revert();
  });
</script>

<div bind:this={container}>
  <div class="box">Animated Box</div>
</div>
```

### 4. Vanilla JavaScript
```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global performance defaults
gsap.defaults({ ease: "power4.out", duration: 1, force3D: true });

const tl = gsap.timeline();
tl.from(".hero-title", { y: 100, autoAlpha: 0, duration: 1.4 })
  .from(".hero-sub", { y: 30, autoAlpha: 0, duration: 0.8 }, "-=0.9");
```

---

## 🚨 Emergency Circuit Breaker & Diagnostics

When debugging or if animations get into an invalid state, use this emergency flush snippet:

```javascript
// Emergency Engine Flush
gsap.globalTimeline.clear();
if (window.ScrollTrigger) {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
gsap.set("*", { clearProps: "all" });
console.log("🛑 GSAP Engine completely reset.");
```

---

## 📚 Specialized Skills Reference Catalog

| Skill Directory | Focus Area |
| :--- | :--- |
| [**`skills/understand-and-create-animation`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/understand-and-create-animation) | **Flagship AI Motion Creator**: Translates any natural language prompt into production-ready 60fps code across all frameworks. |
| [**`skills/gsap-core`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-core) | Core tweens (`to`, `from`, `fromTo`, `set`), easing catalog, 2D grid staggers, `gsap.matchMedia()`, and accessibility. |
| [**`skills/gsap-scrolltrigger`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-scrolltrigger) | Scroll-linked animations, pinning, scrubbing, `ScrollTrigger.batch()`, multi-speed parallax, and Lenis integration. |
| [**`skills/gsap-production-patterns`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-production-patterns) | **Agency-grade battle-tested patterns**: Hero sections, kinetic typography, magnetic cursor/buttons, 3D card tilt, loading screens, and marquees. |
| [**`skills/gsap-debugger`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-debugger) | **Surgical diagnostic playbook**: Resolves React Strict Mode double-play, FOUC, pin spacing jumps, Safari 100vh jumping, and emergency reset. |
| [**`skills/gsap-performance`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-performance) | **60fps GPU engineering**: Compositor vs layout properties, GPU acceleration (`force3D`), CSS containment, and live FPS monitor harness. |
| [**`skills/gsap-react`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-react) | Official `@gsap/react` `useGSAP` hook patterns, ref scoping, `contextSafe` event handlers, and Next.js App Router recipes. |
| [**`skills/gsap-frameworks`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-frameworks) | Idiomatic architectures for Vue 3, Nuxt 3, Svelte 4/5, Astro view transitions, and Vanilla JS classes. |
| [**`skills/gsap-plugins`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-plugins) | SplitText, Flip, Draggable, Inertia, DrawSVG, MorphSVG, MotionPath, CustomEase, and GSDevTools. |
| [**`skills/gsap-timeline`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-timeline) | Multi-step choreography, position parameter master syntax (`"-=0.5"`, `"<"`), labels, nested timelines, and playback control. |
| [**`skills/gsap-utils`**](file:///c:/Users/adity/Documents/GSAP_SKILL/gsap-motion-engineer/skills/gsap-utils) | High-performance math helpers: `mapRange`, `clamp`, `normalize`, `interpolate`, `wrap`, `snap`, `toArray`, and `pipe`. |
