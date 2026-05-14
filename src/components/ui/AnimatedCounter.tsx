import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  to,
  duration = 1.6,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (val) => {
        node.textContent = `${prefix}${Math.round(val).toLocaleString('es-PE')}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
