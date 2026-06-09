import { useEffect, useState, useRef } from "react";
import { clearLeavingClasses } from "../../utils/navigation";

const variantClassName = {
  fade: "fade",
  slideLeft: "slide-left",
  slideRight: "slide-right",
  slideUp: "slide-up",
  pageReveal: "page-reveal",
};

const directionClassName = {
  forward: "dir-forward",
  back: "dir-back",
  neutral: "dir-neutral",
};

export default function AnimatedView({
  children,
  variant = "pageReveal",
  duration = 420,
  className = "",
  animKey,
  direction = "neutral",
  "data-route-anim": dataRouteAnim,
}) {
  const [state, setState] = useState("enter");
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (el) clearLeavingClasses(el);

    setState("enter");

    const usesKeyframeAnim = variant === "pageReveal";

    if (usesKeyframeAnim) {
      const timer = window.setTimeout(() => setState("entered"), duration + 40);
      return () => window.clearTimeout(timer);
    }

    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setState("entered"));
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [animKey, direction, duration, variant]);

  const variantClass = variantClassName[variant] || variantClassName.pageReveal;
  const directionClass = directionClassName[direction] || directionClassName.neutral;

  return (
    <div
      ref={rootRef}
      className={`animated-view ${variantClass} ${directionClass} ${state} ${className}`}
      style={{ ["--anim-duration"]: `${duration}ms` }}
      data-route-anim={dataRouteAnim}
    >
      {children}
    </div>
  );
}
