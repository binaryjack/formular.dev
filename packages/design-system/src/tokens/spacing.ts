/**
 * Design System Spacing
 *
 * Spacing tokens for consistent layout and component spacing.
 * Based on a rem-based scale with pixel equivalents.
 */

export const spacing = {
    // Base spacing scale (rem-based)
    0: '0rem', // 0px
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem', // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem', // 12px
    3.5: '0.875rem', // 14px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    11: '2.75rem', // 44px
    12: '3rem', // 48px
    14: '3.5rem', // 56px
    16: '4rem', // 64px
    18: '4.5rem', // 72px
    20: '5rem', // 80px
    24: '6rem', // 96px
    28: '7rem', // 112px
    32: '8rem', // 128px
    36: '9rem', // 144px
    40: '10rem', // 160px
    44: '11rem', // 176px
    48: '12rem', // 192px
    52: '13rem', // 208px
    56: '14rem', // 224px
    60: '15rem', // 240px
    64: '16rem', // 256px
    72: '18rem', // 288px
    80: '20rem', // 320px
    88: '22rem', // 352px
    96: '24rem', // 384px
    100: '25rem', // 400px
    112: '28rem', // 448px
    128: '32rem', // 512px
    144: '36rem', // 576px
    160: '40rem', // 640px
    176: '44rem', // 704px
    192: '48rem', // 768px
    208: '52rem', // 832px
    224: '56rem', // 896px
    240: '60rem', // 960px
    256: '64rem', // 1024px
    288: '72rem', // 1152px
    320: '80rem', // 1280px
    384: '96rem' // 1536px
} as const

// Component-specific spacing
export const componentSpacing = {
    // Field spacing
    field: {
        padding: spacing[3], // 12px
        margin: spacing[2], // 8px
        gap: spacing[2] // 8px
    },

    // Button spacing
    button: {
        paddingX: spacing[4], // 16px
        paddingY: spacing[2], // 8px
        gap: spacing[2] // 8px
    },

    // Card spacing
    card: {
        padding: spacing[6], // 24px
        margin: spacing[4], // 16px
        gap: spacing[4] // 16px
    },

    // Container spacing
    container: {
        padding: spacing[4], // 16px
        margin: spacing[0], // 0px
        gap: spacing[6] // 24px
    }
} as const

export type Spacing = typeof spacing
export type SpacingKey = keyof Spacing
export type ComponentSpacing = typeof componentSpacing
