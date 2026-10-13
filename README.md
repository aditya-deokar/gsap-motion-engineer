# 🚀 GSAP Motion Engineer

[![skills.sh](https://img.shields.io/badge/skills.sh-indexed-blueviolet?style=for-the-badge)](https://skills.sh/)
[![Release](https://img.shields.io/badge/release-v1.1.0-blue?style=for-the-badge)](https://github.com/aditya-deokar/gsap-motion-engineer/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GSAP](https://img.shields.io/badge/GSAP-3.12+-green?style=for-the-badge&logo=greensock)](https://gsap.com)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-Ready-emerald?style=for-the-badge)](https://github.com/agent-skills)

> **The definitive GSAP animation & creative motion engineering skill suite for AI coding agents and frontend developers.**
> Inspired by the GSAP Master MCP Server. Transforms natural language requests into surgical, 60fps animations across **React 18/19, Next.js App Router, Vue 3, Nuxt 3, Svelte 4/5, Astro, and Vanilla JS**.

---

## ⚡ Quick Install via `skills.sh`

Install the complete motion engineering suite with one command:

```bash
npx skills add aditya-deokar/gsap-motion-engineer
```

### Install Flagship AI Creator Only
```bash
npx skills add aditya-deokar/gsap-motion-engineer --skill understand-and-create-animation
```

### Install Globally for AI Agents (Claude Code, Cursor, Antigravity, Windsurf)
```bash
npx skills add aditya-deokar/gsap-motion-engineer -g
```

---

## 🧠 Flagship AI Engine: `understand-and-create-animation`

Inspired by the acclaimed `understand_and_create_animation` MCP tool, this skill translates natural language descriptions into complete, production-ready GSAP code with surgical precision.

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

## 🗺️ How the MCP Server Tools Map to This Suite

| GSAP Master MCP Tool | Reimagined Skill in this Suite | Capabilities |
| :--- | :--- | :--- |
| **`understand_and_create_animation`** | [`skills/understand-and-create-animation`](./skills/understand-and-create-animation) | AI intent analysis, multi-framework code synthesis, companion HTML/CSS, CLI generator. |
| **`get_gsap_api_expert`** | [`skills/gsap-core`](./skills/gsap-core) & [`skills/gsap-plugins`](./skills/gsap-plugins) | Comprehensive API references for tweens, easings, SplitText, Flip, Draggable, Inertia, DrawSVG, MorphSVG. |
| **`generate_complete_setup`** | [`skills/gsap-react`](./skills/gsap-react) & [`skills/gsap-frameworks`](./skills/gsap-frameworks) | Bulletproof setups for React 18/19, Next.js App Router, Vue 3, Nuxt 3, Svelte 4/5, and Astro. |
| **`debug_animation_issue`** | [`skills/gsap-debugger`](./skills/gsap-debugger) | Diagnostic decision trees for React Strict Mode double-firing, FOUC, layout shifts, Safari 100vh jump, and emergency reset. |
| **`optimize_for_performance`** | [`skills/gsap-performance`](./skills/gsap-performance) | 60fps GPU acceleration, layout-to-transform refactor guide, CSS layer containment, and live FPS monitor harness. |
| **`create_production_pattern`** | [`skills/gsap-production-patterns`](./skills/gsap-production-patterns) | Agency Hero sections, kinetic typography, magnetic cursor/buttons, 3D card tilt, loading screens, marquees. |

---

## 🎯 What You Get — 11 Specialized Skills + Master Director

| Skill Package | Location | Focus Area & Capabilities |
| :--- | :--- | :--- |
| **Master Motion Director** | [`SKILL.md`](./SKILL.md) | Central intelligence coordinator, natural language intent parser, and framework quick-start router. |
| **`understand-and-create-animation`** | [`skills/understand-and-create-animation`](./skills/understand-and-create-animation) | **Flagship AI Motion Creator**: Translates any natural language animation prompt into production-ready 60fps code across all frameworks. |
| **`gsap-core`** | [`skills/gsap-core`](./skills/gsap-core) | Core tweens (`to`, `from`, `fromTo`, `set`), easing catalog, 2D grid staggers, `gsap.matchMedia()`, and accessibility. |
| **`gsap-scrolltrigger`** | [`skills/gsap-scrolltrigger`](./skills/gsap-scrolltrigger) | Scroll-linked animations, pinning, scrubbing, `ScrollTrigger.batch()` for card grids, multi-speed parallax, and progress bars. |
| **`gsap-production-patterns`** | [`skills/gsap-production-patterns`](./skills/gsap-production-patterns) | **Agency-grade battle-tested patterns**: Hero sections, kinetic typography, magnetic cursor/buttons, 3D card tilt, loading screens, and marquees. |
| **`gsap-debugger`** | [`skills/gsap-debugger`](./skills/gsap-debugger) | **Surgical diagnostic playbook**: Resolves React 18/19 Strict Mode double-play, FOUC, ScrollTrigger pin spacing jumps, Safari 100vh jumping, and includes an emergency engine circuit-breaker. |
| **`gsap-performance`** | [`skills/gsap-performance`](./skills/gsap-performance) | **60fps GPU engineering**: Compositor vs layout properties, GPU acceleration (`force3D`), CSS containment, memory cleanup, and live FPS monitoring harness. |
| **`gsap-react`** | [`skills/gsap-react`](./skills/gsap-react) | Official `@gsap/react` `useGSAP` hook patterns, ref scoping, `contextSafe` event handlers, and Next.js App Router client boundary recipes. |
| **`gsap-frameworks`** | [`skills/gsap-frameworks`](./skills/gsap-frameworks) | Idiomatic architectures for Vue 3 (`<script setup>`), Nuxt 3 SSR, Svelte 4/5 (Runes), Astro view transitions, and Vanilla JS classes. |
| **`gsap-plugins`** | [`skills/gsap-plugins`](./skills/gsap-plugins) | Free modern plugins: SplitText, Flip, Draggable, Inertia, DrawSVG, MorphSVG, MotionPath, CustomEase, and GSDevTools. |
| **`gsap-timeline`** | [`skills/gsap-timeline`](./skills/gsap-timeline) | Multi-step choreography, position parameter master syntax (`"-=0.5"`, `"<"`, `">"`), labels, nested timelines, and playback control. |
| **`gsap-utils`** | [`skills/gsap-utils`](./skills/gsap-utils) | High-performance math helpers: `mapRange`, `clamp`, `normalize`, `interpolate`, `wrap`, `snap`, `toArray`, and `pipe`. |

---

## 🧠 Architecture Overview

```
User Prompt: "Create an Awwwards-style hero section with kinetic text and cards that reveal on scroll"
       │
       ▼
[ understand-and-create-animation / Master SKILL.md ]
       │  Categorizes Intent & Extracts Coordinates
       ├─────────────────────────┬─────────────────────────┐
       ▼                         ▼                         ▼
[ gsap-production-patterns ]  [ gsap-scrolltrigger ]   [ gsap-react / frameworks ]
  - Hero Layered Zoom           - ScrollTrigger.batch    - useGSAP with Scoped Ref
  - SplitText Kinetic Reveal    - Multi-Speed Parallax   - SSR Safe Registration
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
            { y: 0, autoAlpha: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
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

### 2. High-Speed Magnetic Button
```javascript
import gsap from "gsap";

export function createMagneticButton(btn) {
  const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

  btn.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = btn.getBoundingClientRect();
    xTo((e.clientX - (left + width / 2)) * 0.4);
    yTo((e.clientY - (top + height / 2)) * 0.4);
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1.1, 0.4)" });
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
