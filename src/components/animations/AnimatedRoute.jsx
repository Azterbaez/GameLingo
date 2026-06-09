import AnimatedView from "./AnimatedView";
import { usePageTransition } from "../../hooks/usePageTransition";

const AnimatedRoute = ({ children, className = "" }) => {
  const { animKey, direction, duration, staggerClass } = usePageTransition();

  return (
    <AnimatedView
      animKey={animKey}
      variant="pageReveal"
      direction={direction}
      duration={duration}
      className={`${staggerClass} ${className}`.trim()}
      data-route-anim
    >
      {children}
    </AnimatedView>
  );
};

export default AnimatedRoute;
