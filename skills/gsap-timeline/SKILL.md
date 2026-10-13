---
name: gsap-timeline
description: Advanced GSAP timeline choreography skill — sequencing, position parameter master syntax ("-=0.5", "<", ">"), timeline labels, nested timeline architecture, and playback controls. Use when orchestrating multi-step animations, complex keyframed sequences, synchronized scenes, or interactive playback controls.
license: MIT
---

# GSAP Timeline & Choreography Master Skill

## When to Use This Skill

Apply this skill whenever building multi-step or multi-element choreographed animations:
- Coordinating sequential or overlapping tweens without brittle `delay` math.
- Using the **Position Parameter** (`"-=0.5"`, `"<"`, `">"`, labels) for surgical timing.
- Building modular **Nested Timelines** for complex scenes and page transitions.
- Controlling playback interactively (`play()`, `pause()`, `reverse()`, `seek()`, `timeScale()`).
- Synchronizing callbacks (`onComplete`, `onUpdate`) across an entire sequence.

---

## ⚡ Creating a Timeline & Inherited Defaults

Avoid repeating `ease` and `duration` on every tween by setting `defaults` on the timeline:

```javascript
import gsap from "gsap";

const tl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power3.out",
    force3D: true,
  },
  paused: false,
  onComplete: () => console.log("Sequence complete!"),
});

// All chained tweens inherit duration: 1 and ease: "power3.out" automatically!
tl.from(".title", { y: 60, autoAlpha: 0 })
  .from(".subtitle", { y: 30, autoAlpha: 0 }, "-=0.6")
  .from(".cta-button", { scale: 0.8, autoAlpha: 0, ease: "back.out(1.7)" }, "-=0.4");
```

---

## ⏱️ The Position Parameter Master Reference

The position parameter is the secret to fluid choreography. It is passed as the optional 3rd argument in `.to()`, `.from()`, `.fromTo()`, or `.add()`:

| Syntax | Behavior | Example |
| :--- | :--- | :--- |
| *(Omitted)* | Appends to the very end of the timeline | `tl.to(".box", { x: 100 })` |
| `1.5` | Starts at exact absolute timeline time (1.5s) | `tl.to(".box", { x: 100 }, 1.5)` |
| `"+=0.5"` | Starts 0.5s **after** previous animation ends (gap) | `tl.to(".box", { x: 100 }, "+=0.5")` |
| `"-=0.5"` | Starts 0.5s **before** previous animation ends (overlap) | `tl.to(".box", { x: 100 }, "-=0.5")` |
| `"<"` | Starts **at the exact same time** as previous animation | `tl.to(".box", { x: 100 }, "<")` |
| `">"` | Starts **at the exact end** of previous animation | `tl.to(".box", { x: 100 }, ">")` |
| `"<0.2"` | Starts 0.2s **after start** of previous animation | `tl.to(".box", { x: 100 }, "<0.2")` |
| `"myLabel"` | Starts at the position of label `"myLabel"` | `tl.to(".box", { x: 100 }, "myLabel")` |
| `"myLabel+=0.3"` | Starts 0.3s after label `"myLabel"` | `tl.to(".box", { x: 100 }, "myLabel+=0.3")` |

### Fluid Choreography Example:
```javascript
const tl = gsap.timeline();

tl.to(".background", { scale: 1.1, duration: 2 })
  // Starts 1.2s before background finishes:
  .from(".headline", { y: 80, autoAlpha: 0, duration: 1.2 }, "-=1.2")
  // Starts at the EXACT same time as headline:
  .from(".avatar", { scale: 0, autoAlpha: 0, duration: 0.8 }, "<")
  // Starts 0.2s after headline begins:
  .from(".subtext", { y: 40, autoAlpha: 0, duration: 1 }, "<0.2");
```

---

## 🏷️ Timeline Labels

Labels act as named checkpoints on the timeline:

```javascript
const tl = gsap.timeline();

tl.to(".panel-1", { x: 100 })
  .addLabel("scene2") // Set checkpoint
  .to(".panel-2", { x: 200 })
  .to(".panel-3", { x: 300 });

// Jump directly to checkpoint:
tl.play("scene2");

// Seek to 1s after checkpoint:
tl.seek("scene2+=1");
```

---

## 🧩 Modular Nested Timeline Architecture

For complex, multi-section sites, break animations into isolated helper functions returning mini-timelines, then assemble them into a master timeline:

```javascript
function createHeaderTimeline() {
  const tl = gsap.timeline();
  tl.from(".logo", { y: -30, autoAlpha: 0, duration: 0.8 })
    .from(".nav-link", { y: -20, autoAlpha: 0, stagger: 0.1 }, "-=0.4");
  return tl;
}

function createHeroTimeline() {
  const tl = gsap.timeline();
  tl.from(".hero-title", { y: 70, autoAlpha: 0, duration: 1.2 })
    .from(".hero-image", { scale: 0.9, autoAlpha: 0, duration: 1.4 }, "-=0.8");
  return tl;
}

// Master Choreographer
const masterTl = gsap.timeline({ defaults: { ease: "power3.out" } });

masterTl
  .add(createHeaderTimeline())
  .add(createHeroTimeline(), "-=0.4"); // Seamless handoff with overlap
```

---

## 🎛️ Dynamic Playback Controls

Timelines expose comprehensive playback methods:

```javascript
const tl = gsap.timeline({ paused: true });

// Play forward
tl.play();

// Reverse smoothly
tl.reverse();

// Pause
tl.pause();

// Restart from beginning
tl.restart();

// Double speed
tl.timeScale(2);

// Half speed slow-motion
tl.timeScale(0.5);

// Smoothly scrub to 75% progress
gsap.to(tl, { progress: 0.75, duration: 1, ease: "power2.out" });
```
