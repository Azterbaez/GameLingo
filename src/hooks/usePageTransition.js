import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { learnRouteDepth, normalizePath } from "../utils/navigation";

const ROUTE_WEIGHT = {
  "/": 0,
  "/informacion": 0,
  "/login": 10,
  "/register": 11,
  "/reset-password": 12,
  "/inicio": 20,
  "/perfil": 21,
};

export function routeTransitionDepth(pathname) {
  const path = normalizePath(pathname);

  if (path.startsWith("/curso")) {
    return 100 + learnRouteDepth(path);
  }

  return ROUTE_WEIGHT[path] ?? path.split("/").filter(Boolean).length * 5;
}

export function usePageTransition() {
  const { pathname } = useLocation();
  const prevDepth = useRef(routeTransitionDepth(pathname));
  const [direction, setDirection] = useState("neutral");

  const learnDepth = pathname.startsWith("/curso") ? learnRouteDepth(pathname) : 0;
  const isLearnStep = learnDepth > 0;
  const isLearnRoot = pathname.startsWith("/curso") && learnDepth === 0;

  useEffect(() => {
    const depth = routeTransitionDepth(pathname);

    if (depth > prevDepth.current) {
      setDirection("forward");
    } else if (depth < prevDepth.current) {
      setDirection("back");
    } else {
      setDirection("neutral");
    }

    prevDepth.current = depth;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  let duration = 900;
  if (isLearnStep) duration = 1100;
  else if (isLearnRoot) duration = 950;

  return {
    animKey: pathname,
    direction,
    duration,
    staggerClass: "animated-view--stagger",
  };
}
