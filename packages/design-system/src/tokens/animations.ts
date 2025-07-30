/**
 * Design System Animations
 *
 * Animation tokens for consistent motion and transitions.
 * Based on modern motion design principles.
 */

export const animations = {
    // Durations
    duration: {
        fastest: '100ms',
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '500ms',
        slowest: '1000ms'
    },

    // Easing functions
    easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Custom easing for specific use cases
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },

    // Keyframes
    keyframes: {
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
        },
        fadeOut: {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' }
        },
        slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideLeft: {
            '0%': { transform: 'translateX(10px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideRight: {
            '0%': { transform: 'translateX(-10px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' }
        },
        scaleOut: {
            '0%': { transform: 'scale(1)', opacity: '1' },
            '100%': { transform: 'scale(0.95)', opacity: '0' }
        },
        spin: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
        },
        pulse: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' }
        },
        bounce: {
            '0%, 100%': {
                transform: 'translateY(-25%)',
                animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
            },
            '50%': {
                transform: 'translateY(0)',
                animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
            }
        },
        drawerSlideInLeft: {
            '0%': { transform: 'translateX(-100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        drawerSlideOutLeft: {
            '0%': { transform: 'translateX(0)', opacity: '1' },
            '100%': { transform: 'translateX(-100%)', opacity: '0' }
        },
        drawerSlideInRight: {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        drawerSlideOutRight: {
            '0%': { transform: 'translateX(0)', opacity: '1' },
            '100%': { transform: 'translateX(100%)', opacity: '0' }
        },
        drawerSlideInTop: {
            '0%': { transform: 'translateY(-100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        drawerSlideOutTop: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(-100%)', opacity: '0' }
        },
        drawerSlideInBottom: {
            '0%': { transform: 'translateY(100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        drawerSlideOutBottom: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(100%)', opacity: '0' }
        }
    },

    // Pre-defined animations
    presets: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-out': 'fadeOut 200ms ease-in',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
        'slide-left': 'slideLeft 300ms ease-out',
        'slide-right': 'slideRight 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
        'scale-out': 'scaleOut 200ms ease-in',
        'drawer-slide-in-left': 'drawerSlideInLeft 300ms ease-out',
        'drawer-slide-out-left': 'drawerSlideOutLeft 300ms ease-in',
        'drawer-slide-in-right': 'drawerSlideInRight 300ms ease-out',
        'drawer-slide-out-right': 'drawerSlideOutRight 300ms ease-in',
        'drawer-slide-in-top': 'drawerSlideInTop 300ms ease-out',
        'drawer-slide-out-top': 'drawerSlideOutTop 300ms ease-in',
        'drawer-slide-in-bottom': 'drawerSlideInBottom 300ms ease-out',
        'drawer-slide-out-bottom': 'drawerSlideOutBottom 300ms ease-in',
        spin: 'spin 1s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite'
    }
} as const

// Component-specific animations
export const componentAnimations = {
    // Field animations
    field: {
        focus: `all ${animations.duration.fast} ${animations.easing.easeOut}`,
        error: `all ${animations.duration.normal} ${animations.easing.easeOut}`
    },

    // Button animations
    button: {
        hover: `all ${animations.duration.fast} ${animations.easing.easeOut}`,
        press: `all ${animations.duration.fastest} ${animations.easing.easeIn}`
    },

    // Modal animations
    modal: {
        enter: animations.presets['scale-in'],
        exit: animations.presets['scale-out']
    },

    // Dropdown animations
    dropdown: {
        enter: animations.presets['slide-down'],
        exit: animations.presets['fade-out']
    },

    // Tooltip animations
    tooltip: {
        enter: animations.presets['fade-in'],
        exit: animations.presets['fade-out']
    },

    drawer: {
        enterLeft: animations.presets['drawer-slide-in-left'],
        exitLeft: animations.presets['drawer-slide-out-left'],
        enterRight: animations.presets['drawer-slide-in-right'],
        exitRight: animations.presets['drawer-slide-out-right'],
        enterTop: animations.presets['drawer-slide-in-top'],
        exitTop: animations.presets['drawer-slide-out-top'],
        enterBottom: animations.presets['drawer-slide-in-bottom'],
        exitBottom: animations.presets['drawer-slide-out-bottom']
    }
} as const

export type Animations = typeof animations
export type AnimationDuration = keyof typeof animations.duration
export type AnimationEasing = keyof typeof animations.easing
export type AnimationKeyframe = keyof typeof animations.keyframes
export type AnimationPreset = keyof typeof animations.presets
