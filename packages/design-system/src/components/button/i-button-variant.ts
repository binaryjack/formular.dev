/**
 * Button Variant Types
 *
 * Type definitions for button variants using design system tokens.
 */

import type { Breakpoint } from '../../tokens/breakpoints'
import type { SemanticVariant } from '../../tokens/colors'
import type { FontWeight, TextTransform } from '../../tokens/typography'

export interface IButtonVariant {
    variant: SemanticVariant
    size: Breakpoint
    textCase: TextTransform
    weight: FontWeight
    rounded: boolean
    width: string
    height: string
    className: string
}

export type PartialButtonVariantType = Partial<IButtonVariant>
