export const LEAVE_MS = 320;

const LEAVING_CLASSES = [
  "leaving",
  "leaving-forward",
  "leaving-back",
  "leaving-neutral",
];

export function learnRouteDepth(pathname) {
  if (!pathname.startsWith("/curso")) return 0;
  const parts = pathname.split("/").filter(Boolean);
  return Math.max(0, parts.length - 1);
}

export function normalizePath(path) {
  if (!path || typeof path !== "string") return "/";
  const sinQuery = path.split("?")[0].split("#")[0];
  const limpio = sinQuery.replace(/\/+$/, "");
  return limpio || "/";
}

export function clearLeavingClasses(root) {
  if (!root) return;
  LEAVING_CLASSES.forEach((cls) => root.classList.remove(cls));
}

export function navigateWithLeave(navigate, to, opts = {}) {
  try {
    const target = normalizePath(typeof to === "string" ? to : to?.pathname);
    const current = normalizePath(window.location.pathname);

    if (current === target) {
      clearLeavingClasses(
        document.querySelector("[data-route-anim]") ||
          document.querySelector(".learn-main .animated-view") ||
          document.querySelector(".animated-view")
      );
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      return;
    }

    const root =
      document.querySelector("[data-route-anim]") ||
      document.querySelector(".learn-main .animated-view") ||
      document.querySelector(".animated-view");

    if (!root) {
      navigate(to);
      return;
    }

    const goingForward = learnRouteDepth(target) > learnRouteDepth(current);
    const goingBack = learnRouteDepth(target) < learnRouteDepth(current);

    clearLeavingClasses(root);
    root.classList.add(
      goingForward ? "leaving-forward" : goingBack ? "leaving-back" : "leaving-neutral"
    );
    root.classList.add("leaving");

    const leaveMs = opts.leaveMs ?? LEAVE_MS;

    window.setTimeout(() => {
      navigate(to);
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

      requestAnimationFrame(() => {
        clearLeavingClasses(
          document.querySelector("[data-route-anim]") ||
            document.querySelector(".learn-main .animated-view") ||
            document.querySelector(".animated-view")
        );
      });
    }, leaveMs);
  } catch {
    navigate(to);
  }
}
