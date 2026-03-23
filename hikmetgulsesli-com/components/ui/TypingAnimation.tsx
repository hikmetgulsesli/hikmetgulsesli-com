"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAnimationProps {
  roles: string[];
  speed?: number;
  eraseSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypingAnimation({
  roles,
  speed = 80,
  eraseSpeed = 50,
  pauseDuration = 2000,
  className = "",
  cursorClassName = "",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (roles.length === 0) return;
    
    const currentRole = roles[currentRoleIndex];

    if (!isErasing) {
      if (displayedText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsErasing(true);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, eraseSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsErasing(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, [displayedText, currentRoleIndex, isErasing, roles, speed, eraseSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={displayedText + currentRoleIndex}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
        >
          {displayedText}
        </motion.span>
      </AnimatePresence>
      <span
        className={`ml-1 inline-block w-0.5 h-5 bg-primary animate-pulse ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
}
