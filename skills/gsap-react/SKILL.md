---
name: gsap-react
description: Production GSAP engineering for React 18/19 and Next.js App Router — @gsap/react useGSAP hook, ref scoping, contextSafe event handlers, SSR safety, and reusable motion components. Use when integrating GSAP with React or Next.js, building animated React components, handling cleanups, or managing SSR.
license: MIT
---

# GSAP with React 18/19 & Next.js

## When to Use This Skill

Apply this skill whenever building or reviewing animations in React or Next.js:
- Setting up animations with the official `@gsap/react` `useGSAP` hook.
- Preventing memory leaks and duplicate animations in React 18/19 Strict Mode.
- Scoping selector queries to component containers using `{ scope: ref }`.
- Handling interactive events (clicks, hovers) safely using `contextSafe()`.
- Building safe animations in Next.js App Router without hydration or SSR errors.
- Creating reusable React motion components (`<ScrollReveal>`, `<Magnetic>`).

---

## 📦 Installation & Setup

```bash
npm install gsap @gsap/react
```

---

## ⚡ The Modern `useGSAP` Hook

The `@gsap/react` `useGSAP` hook replaces traditional `useEffect` / `useLayoutEffect`, handling SSR guards, ref scoping, and automatic cleanup when components unmount:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Any selector query is automatically scoped to `container.current`!
      gsap.from(".hero-title", {
        y: 80,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".hero-card", {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".hero-grid",
          start: "top 80%",
        },
      });
    },
    { scope: container } // CRITICAL: Scoping prevents cross-component selector pollution
  );

  return (
    <div ref={container}>
      <h1 className="hero-title">Welcome to Future</h1>
      <div className="hero-grid">
        <div className="hero-card">Card 1</div>
        <div className="hero-card">Card 2</div>
      </div>
    </div>
  );
}
```

---

## 🎯 Handling Click & Hover Events with `contextSafe`

When animations are triggered by user events (like button clicks) outside the initial `useGSAP` execution, use **`contextSafe`** so they are tracked by the cleanup context:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function InteractiveButton() {
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: container });

  // Wrap event handlers with contextSafe
  const handleClick = contextSafe(() => {
    gsap.to(".badge", {
      scale: 1.4,
      rotation: 360,
      duration: 0.6,
      ease: "back.out(2)",
      yoyo: true,
      repeat: 1,
    });
  });

  return (
    <div ref={container}>
      <button onClick={handleClick} className="btn">
        Click Me <span className="badge">★</span>
      </button>
    </div>
  );
}
```

---

## 🔄 Responding to React State Changes

Pass state dependencies directly to `useGSAP`. Set `revertOnUpdate: true` if previous animations should reset before new ones run:

```tsx
useGSAP(
  () => {
    gsap.fromTo(
      ".tab-panel",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  },
  {
    dependencies: [activeTab],
    revertOnUpdate: true, // Reverts and recreates animation whenever activeTab changes
    scope: container,
  }
);
```

---

## 🌐 Next.js App Router SSR Best Practices

1. **Always declare `"use client"`** at top of files containing GSAP animations.
2. **Safe Plugin Registration**: Register plugins outside component functions:
   ```tsx
   "use client";
   import gsap from "gsap";
   import { ScrollTrigger } from "gsap/ScrollTrigger";
   
   if (typeof window !== "undefined") {
     gsap.registerPlugin(ScrollTrigger);
   }
   ```
3. **Dynamic Import for Heavy Canvas/3D Components**:
   If using Three.js or complex GSAP canvas integrations, import them dynamically without SSR:
   ```tsx
   import dynamic from "next/dynamic";
   
   const CanvasScene = dynamic(() => import("@/components/CanvasScene"), {
     ssr: false,
   });
   ```

---

## 🧩 Reusable React Motion Component Pattern

A battle-tested `<ScrollReveal>` wrapper component:

```tsx
"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  y = 50,
  duration = 1,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(el.current, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: el }
  );

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
```
Usage:
```tsx
<ScrollReveal y={60} duration={1.2}>
  <h2>Animated Heading</h2>
</ScrollReveal>
```
