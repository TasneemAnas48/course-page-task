import { LazyMotion, m, domAnimation } from "framer-motion";
import { ReactNode } from "react";

// Load animation features lazily
// const loadFeatures = () =>
//   import("framer-motion").then((res) => res.domAnimation);

// Extend m.div props to include all valid motion and HTML attributes
type RLazyMotionDivProps = React.ComponentProps<typeof m.div> & {
  children: ReactNode;
};

const RLazyMotionDiv = ({ children, ...motionProps }: RLazyMotionDivProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div {...motionProps}>{children}</m.div>
    </LazyMotion>
  );
};

export default RLazyMotionDiv;
