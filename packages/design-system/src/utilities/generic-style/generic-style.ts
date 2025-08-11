import { ComponentSizeType, ComponentVariantType } from '@/types'
import { ExtendedVisualVariantType } from '../generic-component-styles'
import { ITypographyConfig } from '../generics-v2'

// ===============================================
// NEW VISUAL_VARIANT_RULE SYSTEM - MAIN EXPORTS
// ===============================================

export type ComponentType = 'button' | 'typography' | 'input' | 'accordion'
export type AppModeType = 'light' | 'dark'
export type FieldOfViewType = 'fore' | 'back' | 'border'
export type ShadesTypes = 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

// Core interfaces for the new system
export interface IVariantRule {
    shade: ShadesTypes
    fov: FieldOfViewType
}

export interface IVisualVariantRules {
    rules: IVariantRule[]
}

export interface IClasses {
    text: string[]
    backGround: string[]
    borders: string[]
    states: IStyleStates
    composed: string[]
}

export interface IComponentVariants {
    componentTypes: ComponentType[]
    variant?: ComponentVariantType
    aspect?: IComponentAspect
    visualVariant?: ExtendedVisualVariantType
    states?: Partial<IStyleStatesConfig>
    typography?: ITypographyConfig
    backgroundClassName?: string
    foregroundClassName?: string
    mode?: AppModeType
}

// Helper function for creating variant rules
export const VariantRule = (fov: FieldOfViewType, shade: ShadesTypes): IVariantRule => {
    return { shade, fov } as IVariantRule
}

// Main exports for the VISUAL_VARIANT_RULE system
export const VISUAL_VARIANT_RULE: Record<ExtendedVisualVariantType, IVisualVariantRules> = {
    ghost: {
        rules: [VariantRule('back', 50), VariantRule('fore', 600), VariantRule('border', 200)]
    },
    link: {
        rules: [VariantRule('back', 0), VariantRule('fore', 600), VariantRule('border', 0)]
    },
    outline: {
        rules: [VariantRule('back', 0), VariantRule('fore', 500), VariantRule('border', 500)]
    },
    solid: {
        rules: [VariantRule('back', 500), VariantRule('fore', 50), VariantRule('border', 500)]
    },
    elevated: {
        rules: [VariantRule('back', 500), VariantRule('fore', 50), VariantRule('border', 400)]
    },
    outlined: {
        rules: [VariantRule('back', 0), VariantRule('fore', 500), VariantRule('border', 500)]
    }
}

// Main style generation function
export const genericStyle = (variants: IComponentVariants): IClasses => {
    let output: IClasses = createFreshOutput()

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        console.log('🎨 genericStyle called with:', variants)
    }

    output = { ...output, ...defineVariants(variants, COMPONENT_STYLE_CONFIG) }

    if (process.env.NODE_ENV === 'development') {
        console.log('🎨 genericStyle result:', output)
        // Check for duplicate classes
        const allClasses = [...output.backGround, ...output.text, ...output.borders]
        const uniqueClasses = [...new Set(allClasses)]
        if (allClasses.length !== uniqueClasses.length) {
            console.warn('⚠️ Duplicate classes detected!', {
                total: allClasses.length,
                unique: uniqueClasses.length,
                duplicates: allClasses.filter((item, index) => allClasses.indexOf(item) !== index)
            })
        }
    }

    return output
}

// ===============================================
// INTERNAL IMPLEMENTATION - NOT FOR EXPORT
// ===============================================

type ComponentConfigType = Record<ComponentType, IComponentStyleConfig>

interface IComponentAspect {
    size?: ComponentSizeType
    borders?: boolean
    rounded?: boolean
    width?: string
    height?: string
}

interface IStyleStates {
    hover?: string
    ring?: string
    focused?: string
    pressed?: string
    disabled?: string
    errors?: string
}

interface IStyleStatesConfig {
    hasHover?: boolean
    hasRing?: boolean
    hasFocused?: boolean
    hasPressed?: boolean
    hasDisable?: boolean
    hasErrors?: boolean
}

interface IComponentStyleConfig {
    prefix: string
    defaultVariant: ComponentVariantType
    defaultVisualVariantType: ExtendedVisualVariantType
    defaultAspect: IComponentAspect
    defaultStates: IStyleStatesConfig
}

const defaultStyleStates: IStyleStates = {
    hover: undefined,
    ring: undefined,
    focused: undefined,
    pressed: undefined,
    disabled: undefined,
    errors: undefined
}

// Factory function to create fresh default output objects
const createFreshOutput = (): IClasses => ({
    backGround: [],
    borders: [],
    composed: [],
    states: { ...defaultStyleStates },
    text: []
})

const COMPONENT_STYLE_CONFIG: Record<ComponentType, IComponentStyleConfig> = {
    button: {
        prefix: 'btn',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: true,
            hasRing: true,
            hasFocused: true,
            hasPressed: true,
            hasDisable: true,
            hasErrors: true
        }
    },
    typography: {
        prefix: 'text',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    },
    input: {
        prefix: 'text',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    },
    accordion: {
        prefix: 'text',
        defaultVariant: 'primary',
        defaultAspect: {
            rounded: false,
            borders: false,
            size: 'md',
            width: undefined,
            height: undefined
        },
        defaultVisualVariantType: 'solid',
        defaultStates: {
            hasHover: false,
            hasRing: false,
            hasFocused: false,
            hasPressed: false,
            hasDisable: true,
            hasErrors: true
        }
    }
}

const defineStates = (componentType: ComponentType, states?: IStyleStatesConfig): IStyleStates => {
    if (!states) return defaultStyleStates

    const output: IStyleStates = { ...defaultStyleStates }

    if (states.hasDisable) {
        output.disabled = `${componentType}-disabled`
    }
    if (states.hasErrors) {
        output.errors = `${componentType}-error`
    }
    if (states.hasFocused) {
        output.focused = `focus:${componentType}-focus`
    }
    if (states.hasHover) {
        output.hover = `hover:${componentType}-hover`
    }
    if (states.hasPressed) {
        output.pressed = `pressed:${componentType}-pressed`
    }
    if (states.hasRing) {
        output.ring = `ring:${componentType}-ring`
    }
    return output
}

const defineCustomSize = (property: string, parameter?: string): string | undefined => {
    if (!parameter) return
    return `${property}-[${parameter}]`
}

const defineVariants = (variants: IComponentVariants, config: ComponentConfigType): IClasses => {
    if (process.env.NODE_ENV === 'development' && variants.componentTypes.length === 0) {
        console.log(`GenericStyle V2: Processing failed has ${variants.componentTypes.length}`)
        return createFreshOutput()
    }
    const defaultVariant = variants?.variant ?? 'primary'
    const foreVariant = variants?.typography?.variant
        ? variants?.typography?.variant
        : defaultVariant

    const visualVariantRule = VISUAL_VARIANT_RULE[variants?.visualVariant ?? 'solid']
    const fore = visualVariantRule.rules.find(o => o.fov === 'fore')
    const back = visualVariantRule.rules.find(o => o.fov === 'back')
    const border = visualVariantRule.rules.find(o => o.fov === 'border')

    const output: IClasses = createFreshOutput()

    const conmponentHasTypo = variants.componentTypes.includes('typography')

    for (const c of variants.componentTypes) {
        const currentC = config[c]
        if (c === 'typography') {
            output.text.push(`${currentC?.prefix}-${foreVariant}-${fore?.shade}`)
            output.text.push(
                `${currentC?.prefix}-${variants.typography?.size ?? currentC?.defaultAspect?.size ?? 'md'}`
            )
        } else {
            output.backGround.push(`${currentC?.prefix}-${defaultVariant}-${back?.shade}`)
            output.backGround.push(
                `${currentC?.prefix}-${variants.aspect?.size ?? currentC?.defaultAspect?.size ?? 'md'}`
            )
        }

        if (variants?.aspect?.borders ?? currentC.defaultAspect.borders) {
            output.borders.push(`${currentC?.prefix}-${foreVariant}-${border?.shade}`)
        }

        if (variants?.aspect?.rounded ?? currentC.defaultAspect.rounded) {
            output.backGround.push(`rounded`)
        }

        const width = defineCustomSize('w', variants?.aspect?.width ?? currentC.defaultAspect.width)
        if (width) {
            output.backGround.push(width)
        }

        const height = defineCustomSize(
            'h',
            variants?.aspect?.height ?? currentC.defaultAspect.height
        )
        if (height) {
            output.backGround.push(height)
        }
        output.states = defineStates(c, variants.states)
    }

    return output
}
