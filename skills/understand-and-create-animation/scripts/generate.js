#!/usr/bin/env node

/**
 * Production Code Generator for GSAP Motion Engineer Suite
 * Synthesizes surgical, 60fps animations across React, Next.js, Vue, Svelte, and Vanilla JS
 */

const args = process.argv.slice(2);
let request = '';
let framework = 'react';
let complexity = 'intermediate';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--request' || args[i] === '-r') {
    request = args[i + 1] || '';
    i++;
  } else if (args[i] === '--framework' || args[i] === '-f') {
    framework = args[i + 1] || 'react';
    i++;
  } else if (args[i] === '--complexity' || args[i] === '-c') {
    complexity = args[i + 1] || 'intermediate';
    i++;
  }
}

if (!request) {
  console.log(`
Usage:
  node generate.js --request "<animation description>" [--framework react|nextjs|vue|svelte|vanilla] [--complexity simple|intermediate|advanced]

Examples:
  node generate.js --request "fade in cards one by one when scrolling" --framework react
  node generate.js --request "create typewriter text effect with blinking cursor" --framework vanilla
  node generate.js --request "magnetic button with smooth mouse follow" --framework nextjs
`);
  process.exit(0);
}

const patterns = {
  scroll_based: ['scroll', 'scrolling', 'viewport', 'parallax', 'when scrolling', 'on scroll', 'scroll trigger', 'reveal on scroll'],
  text_animations: ['text', 'words', 'characters', 'letters', 'typewriter', 'typing', 'text reveal', 'kinetic'],
  interactive: ['hover', 'click', 'drag', 'interactive', 'magnetic', 'cursor', 'mouse'],
  entrance_animations: ['fade in', 'slide in', 'appear', 'entrance', 'reveal', 'page load', 'hero']
};

let detectedPattern = 'entrance_animations';
const lowerReq = request.toLowerCase();

for (const [pattern, keywords] of Object.entries(patterns)) {
  if (keywords.some(kw => lowerReq.includes(kw))) {
    detectedPattern = pattern;
    break;
  }
}

console.log(`\n🎯 AI Motion Generator: Analyzed Intent -> [${detectedPattern}] for [${framework}]`);
console.log(`Request: "${request}"\n`);
console.log(`========================= GENERATED CODE =========================\n`);

if (detectedPattern === 'scroll_based') {
  if (framework === 'react' || framework === 'nextjs') {
    console.log(`"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const container = useRef(null);

  useGSAP(() => {
    ScrollTrigger.batch(".scroll-card", {
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { y: 60, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out", force3D: true }
        );
      },
      start: "top 85%"
    });
  }, { scope: container });

  return (
    <div ref={container} className="grid grid-cols-3 gap-6 p-8">
      <div className="scroll-card p-6 bg-white shadow-lg rounded-xl">Card 1</div>
      <div className="scroll-card p-6 bg-white shadow-lg rounded-xl">Card 2</div>
      <div className="scroll-card p-6 bg-white shadow-lg rounded-xl">Card 3</div>
    </div>
  );
}`);
  } else {
    console.log(`import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch(".scroll-card", {
  onEnter: (batch) => {
    gsap.fromTo(batch,
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: "power3.out", force3D: true }
    );
  },
  start: "top 85%"
});`);
  }
} else if (detectedPattern === 'text_animations') {
  console.log(`import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const split = new SplitText(".animated-text", { type: "chars,words" });
gsap.fromTo(split.chars,
  { y: 80, autoAlpha: 0, rotationX: -60 },
  { y: 0, autoAlpha: 1, rotationX: 0, duration: 1, stagger: 0.02, ease: "back.out(1.7)", force3D: true }
);`);
} else if (detectedPattern === 'interactive') {
  console.log(`import gsap from "gsap";

export function initMagnetic(element) {
  const xTo = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3" });

  element.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    xTo((e.clientX - (left + width / 2)) * 0.4);
    yTo((e.clientY - (top + height / 2)) * 0.4);
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1.1, 0.4)" });
  });
}`);
} else {
  console.log(`import gsap from "gsap";

const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
tl.from(".hero-title", { y: 60, autoAlpha: 0 })
  .from(".hero-sub", { y: 30, autoAlpha: 0 }, "-=0.6")
  .from(".hero-cta", { scale: 0.8, autoAlpha: 0, ease: "back.out(1.7)" }, "-=0.4");`);
}

console.log(`\n========================= CRITICAL CSS =========================\n
.animated-element, .scroll-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}
`);
