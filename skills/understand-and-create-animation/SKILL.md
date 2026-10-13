---
name: understand-and-create-animation
description: The flagship AI animation creator inspired by GSAP Master MCP Server. Understands any natural language animation request, analyzes motion intent, and generates complete, production-ready GSAP code with surgical precision across React, Next.js, Vue, Svelte, and Vanilla JS. Guarantees 60fps, mobile optimization, and accessibility.
license: MIT
---

# 🧠 Understand & Create Animation (AI Motion Creator)

> **Inspired by the flagship `understand_and_create_animation` engine from GSAP Master MCP Server.**
> Transforms any natural language description into production-ready, 60fps GSAP code with surgical precision.

---

## When to Use This Skill

Activate this skill whenever:
- The user describes an animation in natural language (e.g., *"fade in cards one by one when scrolling"*, *"create a hero title that reveals character by character"*, *"build smooth hover effects for navigation"*).
- You need complete, end-to-end animation code including JavaScript/TypeScript, companion HTML markup, and critical CSS.
- You need framework-tailored code for **React 18/19 (`useGSAP`), Next.js App Router, Vue 3, Svelte, or Vanilla JS**.
- You want surgical precision: zero layout reflows, locked 60fps, GPU acceleration, mobile responsiveness, and accessibility compliance.

---

## 🎯 Step 1: Natural Language Intent Analysis

Before writing code, analyze the user's prompt using the 7-pattern intent classification engine:

```
[ User Request ]
       │
       ├── Contains 'scroll', 'parallax', 'pin', 'viewport', 'cards on scroll'
       │   └── Pattern: scroll_based (ScrollTrigger, ScrollTrigger.batch, scrub, parallax)
       │
       ├── Contains 'text', 'typewriter', 'character', 'word', 'letters', 'heading'
       │   └── Pattern: text_animations (SplitText chars/words/lines, stagger, typewriter)
       │
       ├── Contains 'hover', 'click', 'drag', 'magnetic', 'cursor', 'interactive'
       │   └── Pattern: interactive (Draggable, InertiaPlugin, quickTo, ripple, magnetic)
       │
       ├── Contains 'hero', 'intro', 'fade in', 'entrance', 'appear', 'page load'
       │   └── Pattern: entrance_animations (gsap.from/fromTo, timeline, stagger, power3.out)
       │
       ├── Contains 'svg', 'draw', 'stroke', 'path', 'morph', 'vector'
       │   └── Pattern: svg_animations (DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin)
       │
       └── Contains 'smooth', 'lag', '60fps', 'optimize', 'mobile'
           └── Pattern: performance_critical (force3D, GPU layers, will-change, contain)
```

---

## ⚙️ Step 2: Automated Code Generators by Intent

### 🌊 Pattern A: Scroll-Based Animation (`scroll_based`)

#### For React 18/19 & Next.js:
```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const container = useRef(null);

  useGSAP(
    () => {
      // 1. Batch Entrance for Cards (60fps optimized)
      ScrollTrigger.batch(".scroll-card", {
        interval: 0.1,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 80, autoAlpha: 0, scale: 0.92 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
              force3D: true,
              clearProps: "transform",
            }
          );
        },
        start: "top 85%",
      });

      // 2. Parallax Background
      gsap.to(".parallax-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 3. Section Pinning (if requested)
      ScrollTrigger.create({
        trigger: ".pinned-showcase",
        start: "top top",
        end: "+=1200",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <section className="parallax-section relative h-screen overflow-hidden">
        <div className="parallax-bg absolute inset-0 bg-cover bg-center" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-12">
          <div className="scroll-card p-6 bg-white/10 backdrop-blur rounded-xl">Card 1</div>
          <div className="scroll-card p-6 bg-white/10 backdrop-blur rounded-xl">Card 2</div>
          <div className="scroll-card p-6 bg-white/10 backdrop-blur rounded-xl">Card 3</div>
        </div>
      </section>
    </div>
  );
}
```

#### For Vanilla JavaScript:
```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch(".scroll-card", {
  onEnter: (batch) => {
    gsap.fromTo(batch,
      { y: 80, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: "power3.out", force3D: true }
    );
  },
  start: "top 85%",
});
```

---

### ✍️ Pattern B: Kinetic Text Animation (`text_animations`)

#### Character Reveal + Typewriter:
```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export default function TextAnimation() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Character 3D Stagger Reveal
      const splitTitle = new SplitText(".char-reveal", { type: "chars,words" });

      gsap.fromTo(
        splitTitle.chars,
        {
          y: 90,
          autoAlpha: 0,
          rotationX: -60,
          transformOrigin: "50% 50% -50px",
        },
        {
          y: 0,
          autoAlpha: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.8,
            from: "random",
          },
          force3D: true,
        }
      );

      // Blinking Cursor Typewriter
      const typewriterText = ".typewriter-target";
      const splitTypewriter = new SplitText(typewriterText, { type: "chars" });
      gsap.set(splitTypewriter.chars, { autoAlpha: 0 });

      const tl = gsap.timeline();
      tl.to(splitTypewriter.chars, {
        autoAlpha: 1,
        duration: 0.04,
        stagger: 0.04,
        ease: "none",
      }).to(".cursor-blink", {
        autoAlpha: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="p-12 text-center">
      <h1 className="char-reveal text-6xl font-bold">KINETIC REVEAL</h1>
      <p className="typewriter-target text-xl mt-6">Crafting precision motion systems...</p>
      <span className="cursor-blink text-xl">|</span>
    </div>
  );
}
```

---

### 🧲 Pattern C: Interactive UI & Physics (`interactive`)

#### Draggable Momentum & Magnetic Button:
```jsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function InteractiveAnimation() {
  const container = useRef(null);

  useGSAP(
    () => {
      // 1. Physics-based Drag with Inertia Throwing
      Draggable.create(".draggable-card", {
        type: "x,y",
        bounds: container.current,
        edgeResistance: 0.65,
        inertia: true,
        onDragStart: function () {
          gsap.to(this.target, { scale: 1.08, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" });
        },
        onDragEnd: function () {
          gsap.to(this.target, { scale: 1, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", duration: 0.5, ease: "elastic.out(1, 0.3)" });
        },
      });

      // 2. High-Speed Magnetic Follower
      const magneticBtn = container.current.querySelector(".magnetic-btn");
      const xTo = gsap.quickTo(magneticBtn, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(magneticBtn, "y", { duration: 0.4, ease: "power3" });

      magneticBtn.addEventListener("mousemove", (e) => {
        const rect = magneticBtn.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.4);
        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.4);
      });

      magneticBtn.addEventListener("mouseleave", () => {
        gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1.1, 0.4)" });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative h-screen p-12">
      <div className="draggable-card cursor-grab active:cursor-grabbing p-8 bg-blue-600 text-white rounded-2xl w-64 shadow-xl">
        Drag & Throw Me!
      </div>
      <button className="magnetic-btn mt-12 px-8 py-4 bg-purple-600 text-white font-bold rounded-full">
        Magnetic Action
      </button>
    </div>
  );
}
```

---

## 🎨 Step 3: Required Critical CSS

Every animation generated by this skill must include these hardware acceleration classes:

```css
/* Critical GPU Acceleration Layer */
.animated-element, .scroll-card, .char-reveal {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0); /* Promotes to discrete GPU layer */
  -webkit-font-smoothing: antialiased;
}

/* Prevent Layout Thrashing */
.animation-stage {
  contain: layout style paint;
}

/* Respect Motion Preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🚀 Step 4: Verification & Customization Checklist

After generating code:
- ✅ **Easing Tuning**: Adjust `ease: "power3.out"`, `"back.out(1.7)"`, or `"elastic.out(1, 0.3)"`.
- ✅ **Timing Control**: Adjust `duration` and `stagger` amounts.
- ✅ **Trigger Offsets**: Modify ScrollTrigger `start: "top 80%"` and `end: "bottom 20%"`.
- ✅ **Memory Cleanup**: Verify that `@gsap/react` `useGSAP` or `gsap.context()` handles unmount disposal.
