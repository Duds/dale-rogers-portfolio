/**
 * Unified Animation System
 * Provides consistent animation patterns across the entire portfolio
 */

export const animations = {
  // Duration tokens
  durations: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Easing functions
  easings: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  },

  // Stagger utility - creates sequential delays
  stagger: (index: number, baseDelay: number = 80): string => {
    return `${index * baseDelay}ms`;
  },

  // Animation presets
  presets: {
    fadeInUp: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      duration: '600ms',
      easing: 'easeOut',
      description: 'Element fades in while moving up from below',
    },
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: '400ms',
      easing: 'ease',
      description: 'Simple opacity fade in',
    },
    scaleIn: {
      from: { opacity: 0, transform: 'scale(0.95)' },
      to: { opacity: 1, transform: 'scale(1)' },
      duration: '300ms',
      easing: 'easeOut',
      description: 'Element scales up while fading in',
    },
    slideInRight: {
      from: { opacity: 0, transform: 'translateX(-20px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
      duration: '400ms',
      easing: 'easeOut',
      description: 'Element slides in from the left',
    },
    slideInLeft: {
      from: { opacity: 0, transform: 'translateX(20px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
      duration: '400ms',
      easing: 'easeOut',
      description: 'Element slides in from the right',
    },
    bounce: {
      keyframes: '0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); }',
      duration: '1000ms',
      easing: 'ease',
      iterationCount: 'infinite',
      description: 'Continuous gentle bounce',
    },
    pulse: {
      keyframes: '0%, 100% { opacity: 1; } 50% { opacity: 0.7; }',
      duration: '2000ms',
      easing: 'ease',
      iterationCount: 'infinite',
      description: 'Continuous opacity pulse',
    },
    spin: {
      keyframes: '0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }',
      duration: '1000ms',
      easing: 'linear',
      iterationCount: 'infinite',
      description: 'Continuous rotation',
    },
    spinSlow: {
      keyframes: '0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }',
      duration: '12000ms',
      easing: 'linear',
      iterationCount: 'infinite',
      description: 'Slow continuous rotation (for logo)',
    },
  },

  // Transition helpers
  transitions: {
    colors: {
      properties: 'color, background-color, border-color, text-decoration-color, fill, stroke',
      duration: '300ms',
      easing: 'ease',
    },
    transform: {
      properties: 'transform',
      duration: '300ms',
      easing: 'spring',
    },
    shadow: {
      properties: 'box-shadow',
      duration: '300ms',
      easing: 'ease',
    },
    all: {
      properties: 'all',
      duration: '300ms',
      easing: 'ease',
    },
  },
} as const;

// Type exports for TypeScript
export type AnimationDuration = keyof typeof animations.durations;
export type AnimationEasing = keyof typeof animations.easings;
export type AnimationPreset = keyof typeof animations.presets;
export type TransitionType = keyof typeof animations.transitions;

// Helper function to generate animation CSS string
export const getAnimation = (
  preset: AnimationPreset,
  duration?: AnimationDuration,
  delay?: number
): string => {
  const presetData = animations.presets[preset];
  const durationValue = duration ? animations.durations[duration] : presetData.duration;
  const delayValue = delay ? `${delay}ms` : '0ms';

  return `${preset} ${durationValue} ${presetData.easing} ${delayValue} forwards`;
};

// Helper function to generate transition CSS string
export const getTransition = (type: TransitionType, duration?: AnimationDuration): string => {
  const transitionData = animations.transitions[type];
  const durationValue = duration ? animations.durations[duration] : transitionData.duration;

  return `${transitionData.properties} ${durationValue} ${transitionData.easing}`;
};

// Export for use in CSS-in-JS or inline styles
export const cssVariables = {
  '--animation-fast': animations.durations.fast,
  '--animation-normal': animations.durations.normal,
  '--animation-slow': animations.durations.slow,
  '--animation-ease': animations.easings.ease,
  '--animation-spring': animations.easings.spring,
} as const;
