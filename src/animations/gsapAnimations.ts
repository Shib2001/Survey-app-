import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

// Reusable GSAP animation presets
export const fadeInUp = (element: string | Element, delay = 0) => {
  return gsap.fromTo(element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power3.out' }
  );
};

export const staggerReveal = (elements: string | Element[] | NodeListOf<Element>, stagger = 0.1) => {
  return gsap.fromTo(elements,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger, ease: 'power2.out' }
  );
};

export const scaleIn = (element: string | Element) => {
  return gsap.fromTo(element,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
  );
};

export const accordionOpen = (element: string | Element) => {
  return gsap.fromTo(element,
    { height: 0, opacity: 0 },
    { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.inOut' }
  );
};
