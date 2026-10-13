---
name: gsap-motion-engineer
description: The master GSAP motion engineering and creative development skill. Translates natural language requests into surgical 60fps animations across React, Next.js, Vue, Svelte, and Vanilla JS. Features intent analysis, battle-tested production patterns, 60fps performance enforcement, and surgical debugging diagnostics. Use whenever creating or debugging GSAP animations, ScrollTrigger setups, kinetic typography, interactive UI, page transitions, or high-performance motion.
license: MIT
---

# GSAP Motion Engineer — Master Skill

> 🚀 **The Definitive Motion Engineering Suite for AI Coding Agents and Creative Developers**
> Inspired by the GSAP Master MCP Server and battle-tested across modern web frameworks. All official GSAP plugins (SplitText, MorphSVG, DrawSVG, Flip, Inertia, ScrollSmoother) are 100% free with standard `npm install gsap`.

---

## When to Use This Skill

Activate this skill whenever:
- Creating animations, interactive components, micro-interactions, or page transitions.
- The user requests animations in **React, Next.js, Vue, Nuxt, Svelte, Astro, or Vanilla JS**.
- Building scroll-driven experiences (pinning, scrub, parallax, reveal-on-scroll, progress bars).
- Crafting kinetic typography (text split by characters/words/lines, typewriter effects).
- Debugging animation bugs, memory leaks, React Strict Mode double-firing, or mobile lag.
- Enforcing butter-smooth 60fps performance and GPU hardware acceleration.

---

## 🧠 Step 1: AI Intent Analysis Engine

Before writing code, analyze the user's natural language request to classify the primary animation pattern and select the optimal techniques:

| Intent Category | Trigger Keywords | Core Techniques | Best Practices |
| :--- | :--- | :--- | :--- |
| **Scroll-Based** | `scroll`, `parallax`, `pin`, `scrub`, `reveal on scroll`, `viewport` | `ScrollTrigger`, `ScrollTrigger.batch()`, `yPercent`, `scrub: 1` | Use `ScrollTrigger.batch()` for multi-card grids; avoid animating `top`/`left`; add `invalidateOnRefresh: true` for responsive measurements. |
| **Entrance & Reveal** | `fade in`, `slide up`, `appear`, `stagger`, `page load`, `hero entrance` | `gsap.from()`, `gsap.fromTo()`, `stagger: 0.15`, `ease: "power3.out"` | Prevent FOUC with `gsap.set()` or initial CSS; use `power3.out` or `expo.out` for natural deceleration. |
| **Text Effects** | `typewriter`, `split text`, `character reveal`, `word by word`, `kinetic` | `SplitText` (`type: "chars,words,lines"`), `stagger`, `back.out(1.7)` | Wrap characters in overflow-hidden containers for masked slide-ups; handle responsive resize re-splitting. |
| **Interactive & Micro** | `hover`, `magnetic`, `cursor follow`, `tilt`, `drag`, `throw` | `Draggable`, `InertiaPlugin`, `quickTo()`, mouse event math | Use `gsap.quickTo()` for mousemove tracking (drastically faster than `gsap.to()`); handle touch fallbacks. |
| **SVG & Morphing** | `draw svg`, `stroke`, `path animation`, `shape morph`, `motion path` | `DrawSVGPlugin`, `MorphSVGPlugin`, `MotionPathPlugin` | Optimize SVG paths before animation; use `vector-effect="non-scaling-stroke"`. |
| **Complex Sequences** | `choreograph`, `timeline`, `step by step`, `scene`, `multi-step` | `gsap.timeline()`, position parameter (`"-=0.5"`), labels | Build modular nested timelines; use timeline labels for key transition checkpoints. |
| **Performance Critical** | `lag`, `jank`, `choppy`, `stutter`, `60fps`, `mobile safari` | GPU transforms (`x`, `y`, `scale`), `force3D: true`, `will-change` | Replace all layout properties (`width`, `height`, `left`, `top`) with CSS transforms; verify frame budget < 16.67ms. |

---

## ⚡ Step 2: Framework Quick-Start Matrix

Always generate idiomatic code matching the user's project framework:

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

export default function AnimatedComponent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Scoped animations — auto cleaned up on unmount!
      gsap.from(".card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid",
          start: "top 80%",
        },
      });
    },
    { scope: container } // CRITICAL: Scopes all selector queries to this ref
  );

  return (
    <div ref={container} className="grid">
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
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
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, container.value);
});

onUnmounted(() => {
  ctx?.revert(); // Essential: prevents memory leaks on route changes
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
      gsap.from(".box", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" });
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

// Global high-performance defaults
gsap.defaults({ ease: "power3.out", duration: 1, force3D: true });

const tl = gsap.timeline();
tl.from(".hero-title", { y: 80, opacity: 0, duration: 1.2 })
  .from(".hero-sub", { y: 40, opacity: 0 }, "-=0.8");
```

---

## 🛡️ Non-Negotiable 60FPS Performance Golden Rules

1. **Animate ONLY Compositor Properties**:
   - ✅ DO ANIMATE: `x`, `y`, `scale`, `scaleX`, `scaleY`, `rotation`, `opacity`, `autoAlpha`.
   - ❌ NEVER ANIMATE: `left`, `top`, `bottom`, `right`, `width`, `height`, `margin`, `padding` (these trigger expensive browser layout reflows and paint jank).
2. **Always Use `autoAlpha` Instead of Raw `opacity`**:
   - `autoAlpha: 0` automatically sets `visibility: hidden` when opacity hits 0, preventing hidden elements from blocking clicks and consuming GPU render layers.
3. **Hardware Acceleration Hints**:
   ```css
   .animated-element {
     will-change: transform, opacity;
     backface-visibility: hidden;
     transform: translateZ(0); /* Force discrete compositing layer */
   }
   ```
4. **Clean Up Everything on Unmount**:
   - In React: use `@gsap/react` `useGSAP` with `{ scope: ref }`.
   - In Vue/Svelte/Vanilla: wrap animations in `gsap.context()` and call `ctx.revert()` on component destruction.

---

## 📚 Specialized Skills Reference Catalog

For in-depth recipes, consult the specialized sub-skills in this repository:

| Skill Directory | Focus Area |
| :--- | :--- |
| **`skills/understand-and-create-animation`** | Flagship AI animation creator: translates any prompt into complete, production-ready 60fps code across all frameworks. |
| **`skills/gsap-core`** | Core engine API, tweens, easings catalog, matchMedia, staggers, and intent engine. |
| **`skills/gsap-scrolltrigger`** | Pinning, scrub, ScrollTrigger.batch, multi-speed parallax, progress bars, refresh handling. |
| **`skills/gsap-production-patterns`** | Hero entrance sequences, kinetic text reveals, magnetic buttons, 3D card tilt, loading screens. |
| **`skills/gsap-debugger`** | Diagnostic decision tree, FOUC, React strict-mode double firing, Safari 100vh jumping, emergency reset. |
| **`skills/gsap-performance`** | 60fps GPU engineering, layout-to-transform refactor guide, CSS containment, FPS monitoring harness. |
| **`skills/gsap-react`** | React 18/19, Next.js App Router, `@gsap/react` `useGSAP`, SSR client boundary handling, scoped refs. |
| **`skills/gsap-frameworks`** | Vue 3, Nuxt 3, Svelte 4/5, SvelteKit, Astro, and Vanilla JS production architectures. |
| **`skills/gsap-plugins`** | SplitText, Flip, Draggable, Inertia, DrawSVG, MorphSVG, MotionPath, CustomEase (100% free plugins). |
| **`skills/gsap-timeline`** | Choreography, nested timelines, labels, relative position syntax (`-=0.5`, `"<"`), playback control. |
| **`skills/gsap-utils`** | Math helpers (`clamp`, `mapRange`, `normalize`, `pipe`, `wrap`, `toArray`, `snap`). |
