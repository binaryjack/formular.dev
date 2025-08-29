import { BorderModeType } from '@/types/enums/border-mode.enum'
import { ContrastType } from '@/types/enums/contrast-enum'
import { StrokeType } from '@/types/enums/stroke-type.enum'
import { VariantType } from '@/types/enums/variants-enum'
import { VisualVariantType } from '@/types/enums/visual-variant-enum'
import { IStatesConfig } from '@/types/interfaces/i-states-config'
import { ComponentsTypes } from '../../../../types/enums/components-enum'
import { ITypographyConfig } from '../../../../types/interfaces/i-typography-config'
import { AppModeType } from '../../types'
import { IComponentAspect } from './interfaces/i-component-aspect'
import { aspectResolver } from './resolvers/aspect-resolver'
import { borderResolver } from './resolvers/border-resolver'
import { colorResolver, IColors } from './resolvers/color-resolver'
import { componentResolver } from './resolvers/component-resolver'
import { stateResolver } from './resolvers/state-resolver'
import { typographyResolver } from './resolvers/typography-resolver'

/** preset */
export interface IComponentPreset {
    mode: AppModeType
    variant?: VariantType
    aspect?: IComponentAspect
    visualVariant?: VisualVariantType
    states?: Partial<IStatesConfig>
    typography?: ITypographyConfig
}

/** input */
export interface IComponentStyleConfig {
    mode?: AppModeType
    type?: ComponentsTypes
    variant?: VariantType
    visualVariant?: VisualVariantType
    borders?: IBorderStyle
    aspect?: IComponentAspect
    states?: IStatesConfig
    typography?: ITypographyConfig
    colorInversion?: boolean
    contrast?: ContrastType
}

export interface IBorderStyle {
    size: number
    stroke: StrokeType
    mode: BorderModeType[]
}

/** output */
export interface IGenericStyling extends IComponentStyleConfig, IColors {
    /** This represents all classes for background and text */
    background: string
    text: string
    border: string
}

export const genericStyling = (
    component: ComponentsTypes,
    config: Partial<IComponentStyleConfig>
): IGenericStyling | undefined => {
    const defaultVariant = config?.variant ?? 'primary'

    const output: IGenericStyling = {
        ...config,
        type: component,
        variant: defaultVariant,
        background: '',
        text: '',
        border: '',
        backgroundColor: '',
        textColor: '',
        borderColor: ''
    }

    let mode = config.mode ?? 'light'

    if (!output.type) {
        console.warn(`component config must have a type `)
    }

    /**pick the basic preset */
    const presetComponent = componentResolver(mode, output.type!, output.variant ?? defaultVariant)

    /** combine with the config  */
    const currentComponent = { ...presetComponent, ...output }

    const currentType = currentComponent.type!

    /** get the background variant color class */
    const colors = colorResolver(
        mode,
        currentComponent?.variant ?? defaultVariant,
        currentComponent?.visualVariant ?? 'solid',
        currentComponent.contrast ?? 'medium'
    )

    /** get the typography */
    const typography = typographyResolver(currentComponent?.typography)

    /** get the borders */
    const borders = borderResolver('component', currentComponent.borders)

    /** get the aspect - pass component type for proper sizing */
    const aspect = aspectResolver(
        currentType,
        currentComponent.aspect ?? { size: 'md', rounded: false }
    ) // Default aspect

    /** get the states */
    const states = stateResolver(currentType, currentComponent.states)

    const outputComponentClasses: IGenericStyling = {
        ...output,
        background: `${aspect} ${states}`,
        border: `${borders}`,
        text: `${typography}`,
        backgroundColor: `${colors.backgroundColor}`,
        borderColor: `${colors.borderColor}`,
        textColor: `${colors.textColor}`,
        type: currentType
    }

    return outputComponentClasses
}
