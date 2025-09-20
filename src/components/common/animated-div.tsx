
"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  variants: "fadeIn" | "fadeInDown" | "stagger" | "fadeInUp";
  staggerChildren?: number;
  once?: boolean;
}

const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    hidden: {},
  },
};

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function AnimatedDiv({
  children,
  className,
  variants,
  staggerChildren,
  once = true,
}: AnimatedDivProps) {
  const selectedVariants = animationVariants[variants];

  if (staggerChildren) {
    selectedVariants.visible.transition.staggerChildren = staggerChildren;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={selectedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once }}
    >
      {children}
    </motion.div>
  );
}

    