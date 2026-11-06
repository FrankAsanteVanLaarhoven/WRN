import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useStaggerEntrance = (deps: any[] = [], selector: string = '.gsap-fade-in') => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements || elements.length === 0) return;

    gsap.fromTo(
      elements,
      { opacity: 0, y: 14, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'all'
      }
    );
  }, deps);

  return containerRef;
};

export const animateClick = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { scale: 0.96 },
    { scale: 1, duration: 0.2, ease: 'back.out(2)' }
  );
};

