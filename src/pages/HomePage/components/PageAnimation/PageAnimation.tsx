import { ReactNode } from "react";
import { AnimatePresence, motion, TargetAndTransition } from "framer-motion";

type PageAnimationProps = {
  children: ReactNode;
  direction: AnimationDirection;
  currentPage: number;
};

type AnimationDirection = "forward" | "backward";

export const PageAnimation = ({
  children,
  direction,
  currentPage,
}: PageAnimationProps) => {
  const animationVariants = {
    initial: (direction: AnimationDirection): TargetAndTransition => ({
      x: direction === "forward" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: AnimationDirection): TargetAndTransition => ({
      x: direction === "forward" ? -100 : 100,
      opacity: 0,
    }),
  };
  return (
    <AnimatePresence mode={"wait"} custom={direction}>
      <motion.div
        key={currentPage}
        custom={direction}
        variants={animationVariants}
        initial={"initial"}
        animate={"center"}
        exit={"exit"}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
