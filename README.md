# 🚀 GSAP Motion Engineer

[![skills.sh](https://img.shields.io/badge/skills.sh-indexed-blueviolet?style=for-the-badge)](https://skills.sh/)
[![Release](https://img.shields.io/badge/release-v1.1.0-blue?style=for-the-badge)](https://github.com/aditya-deokar/gsap-motion-engineer/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GSAP](https://img.shields.io/badge/GSAP-3.12+-green?style=for-the-badge&logo=greensock)](https://gsap.com)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-Ready-emerald?style=for-the-badge)](https://github.com/agent-skills)

> **The definitive GSAP animation & creative motion engineering skill suite for AI coding agents and frontend developers.**
> Transforms natural language requests into surgical, Awwwards-caliber 60fps animations across **React 18/19, Next.js App Router, Vue 3, Nuxt 3, Svelte 4/5, Astro, and Vanilla JS**.

---

## 💎 The Anti-AI-Slop Motion Design Standard

LLMs frequently generate disappointing, amateur animations ("AI Slop") because their pre-training data is saturated with mediocre, outdated tutorials. Typical AI-generated animations suffer from:
* ❌ **The "Everything Moves" Syndrome**: Fading in every single element with the same boring `y: 50, opacity: 0`.
* ❌ **Mechanical Easings**: Default `linear`, `ease`, or exaggerated, cartoonish `bounce`.
* ❌ **Unmasked Typography**: Sliding raw heading text blocks as solid chunks instead of masked line reveals.
* ❌ **Layout Thrashing**: Animating `top`, `left`, `width`, or `height`, destroying mobile FPS.
* ❌ **Jittery Scroll Scrubbing**: Un-synchronized browser scroll events that desync pinned stages.

### How GSAP Motion Engineer Enforces Awwwards-Level Craft:

1. **Focal Restraint**: Guides LLMs to animate only primary visual anchors while letting secondary metadata anchor cleanly.
2. **Organic Deceleration**: Enforces exponential decay curves (`power4.out`, `expo.out`, and snappy `cubic-bezier(0.16, 1, 0.3, 1)`).
3. **Kinetic Masked Typography**: Implements editorial line/word splitting wrapped in `overflow: hidden` horizon clipping.
4. **Smooth Inertia Synchronization**: Integrates Lenis momentum smooth-scrolling with the GSAP ticker for a unified 60fps/120fps render loop.
5. **Interruptible Physics**: Uses `overwrite: "auto"` and `gsap.quickTo()` so rapid user gestures never cause animation lockups.
6. **Compositor-Only Enforcement**: Exclusively targets GPU-composited properties (`x`, `y`, `scale`, `rotation`, `autoAlpha`).

---

## ⚡ Quick Install via `skills.sh`

Install all 12 specialized motion engineering skills with a single command:

```bash
npx skills add aditya-deokar/gsap-motion-engineer
```

### Install Flagship AI Creator Only
```bash
npx skills add aditya-deokar/gsap-motion-engineer --skill understand-and-create-animation
```

### Install Globally for AI Agents (Antigravity, Claude Code, Cursor, Windsurf)
```bash
npx skills add aditya-deokar/gsap-motion-engineer -g
```

---

## 🧠 Flagship AI Engine: `understand-and-create-animation`

Translates natural language descriptions into complete, production-ready GSAP code with surgical precision.

### How it Works:
1. **Natural Language Intake**: Just describe what you want:
   - *"Fade in portfolio cards one by one when scrolling into view"*
   - *"Create an epic hero title that reveals character by character on page load"*
   - *"Build a magnetic hover button with smooth mouse follow"*
2. **Intent Analysis & Scoring**: Categorizes intent into 7 patterns (`scroll_based`, `text_animations`, `interactive`, `entrance_animations`, `svg_animations`, `complex_sequences`, `performance_critical`).
3. **Multi-Framework Synthesis**: Automatically outputs idiomatic code for React (`useGSAP`), Next.js (SSR safe), Vue 3 (`onMounted`), Svelte, or Vanilla JS.
4. **Complete Package**: Generates code, required companion HTML markup, and critical GPU acceleration CSS.

### 💻 Built-in CLI Animation Generator

You can also run the generator directly in terminal:

```bash
# Scroll animation for React / Next.js
node skills/understand-and-create-animation/scripts/generate.js --request "fade in cards one by one when scrolling" --framework react

# Kinetic text typewriter for Vanilla JS
node skills/understand-and-create-animation/scripts/generate.js --request "typewriter text with blinking cursor" --framework vanilla

# Physics interactive drag with inertia
node skills/understand-and-create-animation/scripts/generate.js --request "draggable card with throwing physics" --framework react
```

---

## 🎯 What You Get — 12 Specialized Skills

| Skill Package | Location | Focus Area & Capabilities |
| :--- | :--- | :--- |
| **Master Motion Director** | [`skills/gsap-motion-engineer`](./skills/gsap-motion-engineer) | Central intelligence coordinator, Anti-AI-Slop manifesto, intent parser, and framework router. |
| **`understand-and-create-animation`** | [`skills/understand-and-create-animation`](./skills/understand-and-create-animation) | **Flagship AI Motion Creator**: Translates any natural language animation prompt into production-ready 60fps code across all frameworks. |
| **`gsap-core`** | [`skills/gsap-core`](./skills/gsap-core) | Core tweens (`to`, `from`, `fromTo`, `set`), easing catalog, 2D grid staggers, `gsap.matchMedia()`, and accessibility. |
| **`gsap-scrolltrigger`** | [`skills/gsap-scrolltrigger`](./skills/gsap-scrolltrigger) | Scroll-linked animations, pinning, scrubbing, `ScrollTrigger.batch()` for card grids, multi-speed parallax, and Lenis integration. |
| **`gsap-production-patterns`** | [`skills/gsap-production-patterns`](./skills/gsap-production-patterns) | **Agency-grade battle-tested patterns**: Hero sections, masked kinetic typography, magnetic cursor/buttons, 3D card tilt, loading screens, and marquees. |
| **`gsap-debugger`** | [`skills/gsap-debugger`](./skills/gsap-debugger) | **Surgical diagnostic playbook**: Resolves React Strict Mode double-play, FOUC, pin spacing jumps, Safari 100vh jumping, and emergency engine circuit-breaker. |
| **`gsap-performance`** | [`skills/gsap-performance`](./skills/gsap-performance) | **60fps GPU engineering**: Compositor vs layout properties, GPU acceleration (`force3D`), CSS containment, memory cleanup, and live FPS monitoring harness. |
| **`gsap-react`** | [`skills/gsap-react`](./skills/gsap-react) | Official `@gsap/react` `useGSAP` hook patterns, ref scoping, `contextSafe` event handlers, and Next.js App Router client boundary recipes. |
| **`gsap-frameworks`** | [`skills/gsap-frameworks`](./skills/gsap-frameworks) | Idiomatic architectures for Vue 3 (`<script setup>`), Nuxt 3 SSR, Svelte 4/5 (Runes), Astro view transitions, and Vanilla JS classes. |
| **`gsap-plugins`** | [`skills/gsap-plugins`](./skills/gsap-plugins) | SplitText, Flip, Draggable, Inertia, DrawSVG, MorphSVG, MotionPath, CustomEase, and GSDevTools. |
| **`gsap-timeline`** | [`skills/gsap-timeline`](./skills/gsap-timeline) | Multi-step choreography, position parameter master syntax (`"-=0.5"`, `"<"`), labels, nested timelines, and playback control. |
| **`gsap-utils`** | [`skills/gsap-utils`](./skills/gsap-utils) | High-performance math helpers: `mapRange`, `clamp`, `normalize`, `interpolate`, `wrap`, `snap`, `toArray`, and `pipe`. |

---

## 🧠 Architecture Overview

```
User Prompt: "Create an Awwwards-style hero section with kinetic text and cards that reveal on scroll"
       │
       ▼
[ understand-and-create-animation / gsap-motion-engineer ]
       │  Categorizes Intent & Extracts Coordinates
       ├─────────────────────────┬─────────────────────────┐
       ▼                         ▼                         ▼
[ gsap-production-patterns ]  [ gsap-scrolltrigger ]   [ gsap-react / frameworks ]
  - Hero Layered Zoom           - ScrollTrigger.batch    - useGSAP with Scoped Ref
  - Masked Kinetic Reveal       - Lenis Momentum Sync    - SSR Safe Registration
       │                         │                         │
       └─────────────────────────┼─────────────────────────┘
                                 ▼
                     [ gsap-performance ]
                       - Compositor Only (x, y, scale)
                       - force3D: true & will-change
                       - Frame Budget < 16.67ms (60 FPS)
                                 │
                                 ▼
                      [ gsap-debugger ]
                       - Pre-flight Validation
                       - Zero FOUC / Zero Memory Leaks
```

---

## ⚡ Quick Start Examples

### 1. React 18/19 & Next.js App Router
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

export default function PortfolioGrid() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".card", {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 60, autoAlpha: 0, scale: 0.95 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 1, stagger: 0.12, ease: "power4.out" }
          );
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="grid grid-cols-3 gap-6">
      <div className="card">Project 1</div>
      <div className="card">Project 2</div>
      <div className="card">Project 3</div>
    </div>
  );
}
```

### 2. High-Speed Magnetic Button (`gsap.quickTo`)
```javascript
import gsap from "gsap";

export function createMagneticButton(btn) {
  const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

  btn.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = btn.getBoundingClientRect();
    xTo((e.clientX - (left + width / 2)) * 0.35);
    yTo((e.clientY - (top + height / 2)) * 0.35);
  });

  btn.addEventListener("mouseleave", () => {
    xTo(0);
    yTo(0);
  });
}
```

---

## 🛡️ 60FPS Performance Guarantee

Every skill in this repository strictly enforces:
- ✅ **Compositor Isolation**: Exclusively animates `x`, `y`, `scale`, `rotation`, and `autoAlpha`. Zero layout reflows (`left`/`top`/`width`/`height` prohibited).
- ✅ **Hardware Acceleration**: Automatic promotion of animated elements to discrete GPU layers (`force3D: true`, `translateZ(0)`).
- ✅ **Memory Sanitation**: Strict cleanup on component unmount to eliminate orphan tweens and memory leaks.
- ✅ **Accessibility Compliance**: Built-in support for `(prefers-reduced-motion: reduce)`.

---

## 📜 License

MIT License © 2026 Aditya Deokar.
GSAP is a trademark of GreenSock, Inc. All standard GSAP plugins are free to use.
