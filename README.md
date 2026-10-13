# 🚀 GSAP Motion Engineer

[![skills.sh](https://img.shields.io/badge/skills.sh-indexed-blueviolet?style=for-the-badge)](https://skills.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GSAP](https://img.shields.io/badge/GSAP-3.12+-green?style=for-the-badge&logo=greensock)](https://gsap.com)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-Ready-emerald?style=for-the-badge)](https://github.com/agent-skills)

> **The definitive GSAP animation & creative motion engineering skill suite for AI coding agents and frontend developers.**
> Transforms natural language requests into surgical, 60fps animations across **React 18/19, Next.js App Router, Vue 3, Nuxt 3, Svelte 4/5, Astro, and Vanilla JS**.

---

## ⚡ Quick Install via `skills.sh`

Install the complete motion engineering suite with one command in your project:

```bash
npx skills add aditya-deokar/gsap-motion-engineer
```

Or install specific modular skills:

```bash
# Install specific skills
npx skills add aditya-deokar/gsap-motion-engineer --skill gsap-core gsap-scrolltrigger gsap-production-patterns
```

### Install Globally for AI Agents
```bash
npx skills add aditya-deokar/gsap-motion-engineer -g
```

Works out of the box with:
- **Claude Code**
- **Cursor**
- **Google Antigravity**
- **Windsurf**
- **GitHub Copilot CLI**

---

## 🎯 What You Get — 10 Specialized Skills + Master Director

| Skill Package | Location | Focus Area & Capabilities |
| :--- | :--- | :--- |
| **Master Motion Director** | [`SKILL.md`](./SKILL.md) | Central intelligence coordinator, natural language intent parser, and framework quick-start router. |
| **`understand-and-create-animation`** | [`skills/understand-and-create-animation`](./skills/understand-and-create-animation) | **Flagship AI Motion Creator**: Translates any natural language animation prompt into production-ready 60fps code across React, Next.js, Vue, Svelte, and Vanilla JS. Includes companion CLI generator. |
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
[ Master Motion Director (SKILL.md) ]
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
