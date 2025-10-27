'use client';

import { ReactNode, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Flex } from '@mantine/core';

interface TransitionsProps {
  children: ReactNode;
  transition?: string;
  delay?: number;
  duration?: number;
  width?: string | number;
  runOnce?: boolean;
}

function Transitions({
  children,
  transition = 'fade-up',
  delay = 5000,
  duration = 1000,
  width,
  runOnce,
}: TransitionsProps) {
  // Initialize AOS (Animate On Scroll) effect on component mount or when dependencies change
  useEffect(() => {
    AOS.init({
      // Animations should only happen once
      once: runOnce,
      // Duration of the animation in milliseconds
      duration: duration,
      // Easing function for the animation
      easing: 'ease-out-cubic',
    });
    // Re-run the effect if duration or runOnce props change
  }, [duration, runOnce]);

  return (
    <Flex
      // Unique key to ensure Flex component re-renders correctly
      key={null}
      w={width}
      direction={'column'}
      justify={'center'}
      align={'center'}
      // Set the AOS transition type from props
      data-aos={transition}
      // Set the delay for the AOS animation
      data-aos-delay={delay}
    >
      {children}
    </Flex>
  );
}

export default Transitions;
