---
name: gsap-frameworks
description: Official GSAP integration patterns for Vue 3, Nuxt 3, Svelte 4/5, SvelteKit, Astro, and Vanilla JS. Covers lifecycle hooks (onMounted, onMount), gsap.context() scoping, cleanup on unmount, SSR guards, and Astro view transitions. Use when building animations in Vue, Nuxt, Svelte, Astro, or Vanilla JS.
license: MIT
---

# GSAP with Vue 3, Nuxt, Svelte, Astro & Vanilla JS

## When to Use This Skill

Apply this skill when implementing or reviewing animations in non-React environments:
- **Vue 3** Composition API (`<script setup>`) with `onMounted` and `gsap.context()`.
- **Nuxt 3** with SSR guards and route transitions.
- **Svelte 4 / Svelte 5 (Runes)** and SvelteKit lifecycles (`onMount`, `$effect`).
- **Astro** island components and `astro:page-load` view transitions.
- **Vanilla JavaScript** modular class systems and clean DOM architectures.

---

## 🟢 1. Vue 3 Composition API (`<script setup>`)

In Vue 3, always wrap animations inside `gsap.context()` during `onMounted`, and call `ctx.revert()` in `onUnmounted`:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
let ctx;

onMounted(() => {
  // Scopes all selector strings to container.value
  ctx = gsap.context(() => {
    gsap.from(".headline", {
      y: 60,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".card", {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".card-grid",
        start: "top 80%",
      },
    });
  }, container.value);
});

onUnmounted(() => {
  ctx?.revert(); // Essential: cleans up all tweens & scroll triggers on route change
});
</script>

<template>
  <div ref="container" class="page-container">
    <h1 class="headline">Vue 3 GSAP Motion</h1>
    <div class="card-grid">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
    </div>
  </div>
</template>
```

---

## 💚 2. Nuxt 3 (SSR & Page Transitions)

Nuxt 3 renders HTML on the server. Guard against SSR window errors:

```vue
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const page = ref(null);
let ctx;

onMounted(() => {
  // Nuxt client-only execution
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      gsap.from(".hero", { autoAlpha: 0, scale: 0.95, duration: 1 });
    }, page.value);
  }
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <main ref="page">
    <div class="hero">Nuxt 3 Motion</div>
  </main>
</template>
```

---

## 🟠 3. Svelte 4 & Svelte 5 (Runes)

### Svelte 4 (`onMount`)
```svelte
<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  let container;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svelte-box", {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }, container);

    // Returned cleanup function runs on component destroy
    return () => ctx.revert();
  });
</script>

<div bind:this={container}>
  <div class="svelte-box">Svelte Motion</div>
</div>
```

### Svelte 5 (Runes `$effect`)
```svelte
<script>
  import gsap from "gsap";

  let container = $state();

  $effect(() => {
    if (!container) return;
    const ctx = gsap.context(() => {
      gsap.from(".box", { y: 40, autoAlpha: 0, duration: 0.8 });
    }, container);

    return () => ctx.revert();
  });
</script>

<div bind:this={container}>
  <div class="box">Svelte 5 Runes</div>
</div>
```

---

## 🚀 4. Astro (Islands & View Transitions)

Astro swaps DOM nodes on navigation. Listen to `astro:page-load` to initialize and re-initialize GSAP cleanly:

```astro
---
// Component template
---
<div class="astro-container">
  <h1 class="reveal-text">Astro + GSAP</h1>
</div>

<script>
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  function init() {
    gsap.from(".reveal-text", {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
    });
  }

  // Runs on initial page load AND every Astro view transition navigation
  document.addEventListener("astro:page-load", init);

  // Clean up before swap
  document.addEventListener("astro:before-swap", () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>
```

---

## 💻 5. Vanilla JavaScript (Class-Based Pattern)

For modern vanilla web applications, organize animations in modular ES6 classes:

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class InteractiveHero {
  constructor(containerSelector = ".hero-section") {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.ctx = gsap.context(() => {
      this.initAnimations();
    }, this.container);
  }

  initAnimations() {
    gsap.from(".hero-title", {
      y: 70,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power4.out",
    });

    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: this.container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  destroy() {
    this.ctx?.revert(); // Full teardown
  }
}

// Instantiate
const hero = new InteractiveHero();
```
