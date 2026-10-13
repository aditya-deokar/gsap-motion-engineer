---
name: gsap-performance
description: High-performance 60fps GSAP engineering — compositor vs layout properties, GPU hardware acceleration, will-change, CSS layer containment, memory leak prevention, and real-time FPS monitoring harness. Use when optimizing animations for smooth 60fps, eliminating jank, reducing mobile battery consumption, or profiling performance.
license: MIT
---

# GSAP Performance & 60FPS Engineering

## When to Use This Skill

Apply this skill whenever:
- Ensuring all animations run at a locked 60fps (frame time < 16.67ms).
- Refactoring animations that suffer from stutter, lag, or dropped frames.
- Optimizing animations for mobile devices and battery efficiency.
- Auditing memory usage to prevent memory leaks and GC (Garbage Collection) pauses.
- Embedding an FPS and frame-budget monitoring tool into your app during development.

---

## 🏎️ The 16.67ms Frame Budget Rule

Modern displays refresh at 60Hz (or 120Hz on ProMotion displays). For 60fps motion, the browser has exactly **16.67 milliseconds** to calculate JavaScript, run layout, paint pixels, and composite layers:

```
[ JavaScript ] -> [ Style Recalc ] -> [ Layout (Reflow) ] -> [ Paint ] -> [ Composite ]
      │                                       │                     │             │
   GSAP Math                           (VERY EXPENSIVE)         (EXPENSIVE)   (FASTEST - GPU)
```

**Rule**: Animate **ONLY** properties that skip Layout and Paint, resolving directly on the GPU compositor thread:
- Compositor Properties: `transform` (`x`, `y`, `scale`, `rotation`, `skew`), `opacity`.

---

## 🔄 Layout to Transform Refactoring Dictionary

Always replace layout-triggering CSS properties with composite equivalents:

| Naive / Slow Property | 60FPS GPU Composite Replacement | Rationale |
| :--- | :--- | :--- |
| `left: 100px` | `x: 100` | Avoids reflow; operates purely on GPU matrix transform. |
| `top: 50px` | `y: 50` | Avoids reflow; subpixel rendering precision. |
| `width: 300px` | `scaleX: 1.5` or `xPercent` | Avoids recalculating sibling element geometries. |
| `height: 200px` | `scaleY: 1.5` | Avoids vertical document reflow. |
| `opacity: 0` | `autoAlpha: 0` | Automatically sets `visibility: hidden`, freeing GPU layers. |
| `margin-left: 20px` | `x: 20` | Zero layout impact on surrounding flow. |

---

## ⚡ GPU Acceleration Configuration

### 1. Enable `force3D: true`
Forces the browser to allocate a dedicated GPU compositor layer for the element:
```javascript
gsap.to(".card", {
  x: 200,
  rotation: 12,
  duration: 1,
  force3D: true, // Injects 3D transform matrix
});
```

### 2. Critical CSS Layer Hints
```css
.accelerated-element {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0); /* Promotes to dedicated GPU layer */
  -webkit-font-smoothing: antialiased;
}

/* Contain layout recalculations within this container */
.animation-stage {
  contain: layout style paint;
}
```

> [!WARNING]
> Do NOT apply `will-change: transform` to thousands of elements simultaneously, as this consumes excessive VRAM. Apply it only to actively animating elements, and remove it on complete using `clearProps: "will-change"`.

---

## 🧹 Memory Leak Prevention & Garbage Collection

Repeatedly creating animations in loops without cleaning them up exhausts browser memory:

```javascript
// 1. Clear properties after entrance animation completes
gsap.from(".banner", {
  y: 60,
  autoAlpha: 0,
  duration: 1,
  clearProps: "transform,opacity", // Restores clean CSS without inline style clutter
});

// 2. Kill orphaned tweens before starting new ones
gsap.killTweensOf(".character-sprite");

// 3. Kill unused timelines
myTimeline.kill();
```

---

## 📱 Mobile-Smooth & Battery-Efficient Mode

Mobile CPUs throttle rapidly under heavy JavaScript animations. When targeting mobile devices:

```javascript
const isMobile = window.innerWidth < 768;

if (isMobile) {
  // Use shorter durations, fewer simultaneous tweens, and simpler easing
  gsap.to(".feature-item", {
    y: 30,
    autoAlpha: 1,
    duration: 0.6,
    ease: "power2.out",
    force3D: true,
  });
} else {
  // Full desktop choreography with 3D rotation and depth
  gsap.to(".feature-item", {
    y: 80,
    rotationX: 15,
    autoAlpha: 1,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.15,
    force3D: true,
  });
}
```

---

## 📈 Real-Time FPS & Frame Budget Monitor

Embed this lightweight diagnostic FPS meter to profile motion in real time during development:

```javascript
export class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frames = 0;
    this.lastTime = performance.now();
    this.active = true;
    this.renderBadge();
    this.loop();
  }

  renderBadge() {
    this.badge = document.createElement("div");
    this.badge.style.cssText =
      "position:fixed;bottom:12px;right:12px;background:rgba(0,0,0,0.8);color:#22c55e;padding:6px 12px;border-radius:6px;font-family:monospace;font-size:12px;font-weight:bold;z-index:99999;pointer-events:none;border:1px solid #22c55e;";
    this.badge.textContent = "60 FPS";
    document.body.appendChild(this.badge);
  }

  loop() {
    if (!this.active) return;
    this.frames++;
    const now = performance.now();

    if (now >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.badge.textContent = `${this.fps} FPS`;

      if (this.fps < 50) {
        this.badge.style.color = "#ef4444";
        this.badge.style.borderColor = "#ef4444";
      } else if (this.fps < 58) {
        this.badge.style.color = "#eab308";
        this.badge.style.borderColor = "#eab308";
      } else {
        this.badge.style.color = "#22c55e";
        this.badge.style.borderColor = "#22c55e";
      }

      this.frames = 0;
      this.lastTime = now;
    }

    requestAnimationFrame(() => this.loop());
  }

  destroy() {
    this.active = false;
    this.badge?.remove();
  }
}

// In development:
if (process.env.NODE_ENV === "development") {
  new PerformanceMonitor();
}
```
