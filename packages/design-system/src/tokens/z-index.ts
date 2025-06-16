/**
 * Design System Z-Index
 *
 * Z-index tokens for consistent layering and stacking context.
 * Based on semantic layering principles.
 */

export const zIndex = {
    // Base levels
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800'
} as const

// Component-specific z-index
export const componentZIndex = {
    // Form components
    fieldDropdown: zIndex.dropdown, // 1000
    fieldValidation: zIndex.base, // 0

    // Navigation
    navbar: zIndex.sticky, // 1100
    sidebar: zIndex.docked, // 10

    // Overlays
    backdrop: zIndex.overlay, // 1300
    dialog: zIndex.modal, // 1400
    drawer: zIndex.modal, // 1400

    // Feedback
    notification: zIndex.toast, // 1700
    snackbar: zIndex.toast, // 1700

    // Interactive
    contextMenu: zIndex.popover, // 1500
    tooltip: zIndex.tooltip, // 1800

    // Special
    loadingOverlay: zIndex.overlay, // 1300
    debugPanel: '9999'
} as const

export type ZIndex = typeof zIndex
export type ZIndexKey = keyof ZIndex
export type ComponentZIndex = typeof componentZIndex
