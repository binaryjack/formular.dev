/**
 * Legacy Component Variants Interface - DEPRECATED
 *
 * This file provides compatibility for the old generic style system.
 * NEW CODE SHOULD USE THE ATOMIC STYLE BUILDER INSTEAD.
 *
 * @deprecated Use the new atomic-style-builder system
 */

export interface IComponentVariants {
    componentTypes: string[]
    variant?: string
    visualVariant?: string
    typography?: any
    aspect?: any
    states?: any
    headerPreset?: string
    headerStyle?: any
}

export type HeaderPresetType = string
