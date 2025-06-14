import { RangeSlideBehavior, RangeSliderHandleStyle } from './components/range-slider.types'
import { RangeSliderSF } from './range-slider.sf'

/**
 * Props for the RangeSlider component.
 */
interface RangeSliderProps {
    /** The name of the field as defined in the form schema */
    fieldName: string
    /** The minimum value of the slider range */
    min?: number
    /** The maximum value of the slider range */
    max?: number
    /** The step increment between values */
    step?: number
    /** The behavior when dragging the slider handle */
    behavior?: RangeSlideBehavior
    /** The color of the range fill area */
    rangeFillColor?: string
    /** The color of the slider handle */
    handleFillColor?: string
    /** The style of the slider handle */
    handleStyle?: RangeSliderHandleStyle
    /** Percentage adjustment for handle positioning */
    handleStylePercentAdjust?: number
    /** Width of the slider handle in pixels */
    handlerStyleWidth?: number
    /** Height of the slider handle in pixels */
    handlerStyleHeight?: number
    /** Height of the slider bar in pixels */
    slideBarHeight?: number
    /** Enable debug mode for development */
    debug?: boolean
}

/**
 * A range slider component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete range slider solution with:
 * - Automatic field binding and numeric value management
 * - Customizable visual appearance (colors, handle style, dimensions)
 * - Configurable behavior (snap, smooth sliding)
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (arrow keys, page up/down)
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 * - Debug mode for development and testing
 *
 * The component automatically connects to the form instance via context and manages
 * numeric state through the FORMULAR input engine, with extensive customization
 * options for visual appearance and behavior.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a numeric field name in your form's schema definition.
 * @param props.min - Minimum value for the slider (default: 0)
 * @param props.max - Maximum value for the slider (default: 100)
 * @param props.step - Step increment between values (default: 1)
 * @param props.behavior - Handle behavior: 'snap' or 'smooth' (default: 'smooth')
 * @param props.rangeFillColor - CSS color for the filled range area
 * @param props.handleFillColor - CSS color for the slider handle
 * @param props.handleStyle - Handle style: 'circle', 'square', 'rounded'
 * @param props.handleStylePercentAdjust - Fine-tune handle positioning
 * @param props.handlerStyleWidth - Handle width in pixels
 * @param props.handlerStyleHeight - Handle height in pixels
 * @param props.slideBarHeight - Slider track height in pixels
 * @param props.debug - Enable debug overlay and logging
 *
 * @returns A rendered range slider with customizable appearance and behavior
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RangeSlider fieldName="volume" min={0} max={100} step={1} />
 * ```
 *
 * @example
 * ```tsx
 * // Customized appearance
 * <RangeSlider
 *   fieldName="brightness"
 *   min={0}
 *   max={255}
 *   step={5}
 *   behavior="snap"
 *   handleStyle="circle"
 *   handlerStyleWidth={20}
 *   handlerStyleHeight={20}
 *   rangeFillColor="#3b82f6"
 *   handleFillColor="#1d4ed8"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with validation
 * const schema = {
 *   properties: [
 *     RangeBuilder.setId(1)
 *       .setName('score')
 *       .setLabel('Rating Score')
 *       .setValidationData(true, Validators.range(1, 10, 'Score must be between 1 and 10').build())
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <RangeSlider
 *     fieldName="score"
 *     min={1}
 *     max={10}
 *     step={0.5}
 *     behavior="snap"
 *   />
 * </FormularForm>
 * ```
 *
 * @remarks
 * - The fieldName must match a numeric field defined in your form schema
 * - Supports both integer and decimal values through the step parameter
 * - The component provides smooth visual feedback during value changes
 * - Keyboard navigation is fully supported with accessibility features
 * - All visual aspects can be customized through props
 * - Integrates with the form's submission and validation lifecycle
 * - Debug mode helps with development and troubleshooting
 * - Supports responsive design and works well on mobile devices
 */
export const RangeSlider = ({
    fieldName,
    min,
    max,
    step,
    behavior,
    rangeFillColor,
    handleFillColor,
    handleStyle,
    handleStylePercentAdjust,
    handlerStyleWidth,
    handlerStyleHeight,
    slideBarHeight,
    debug
}: RangeSliderProps) => (
    <RangeSliderSF
        fieldName={fieldName}
        min={min}
        max={max}
        step={step}
        behavior={behavior}
        rangeFillColor={rangeFillColor}
        handleFillColor={handleFillColor}
        handleStyle={handleStyle}
        handleStylePercentAdjust={handleStylePercentAdjust}
        handlerStyleWidth={handlerStyleWidth}
        handlerStyleHeight={handlerStyleHeight}
        slideBarHeight={slideBarHeight}
        debug={debug}
    />
)
