import {
    ComponentSizeType,
    TextCaseType,
    TextWeightType,
    VariantNameType,
    cx,
    generateButtonStyles
} from 'formular.design.system'
import Spinner from '../spinner/spinner'
import { getSpinnerVariant } from '../spinner/utils/spinner.variant.converter'

import { sizeConverter } from '@adapters/react/hooks/screen/utils/screen.utils'
import useRippleEffect from './core/use-ripple-effect'
import { getButtonXYSizes } from './utils/button.types'
export interface IButtonVariant {
    variant: VariantNameType
    size: ComponentSizeType
    textCase: TextCaseType
    weight: TextWeightType
    rounded: boolean
    width: string
    height: string
    className: string
}

interface IButtonProps {
    id: string
    title: string
    children?: React.ReactNode | string
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    variantProperties?: Partial<IButtonVariant>
    loading?: boolean
    icon?: React.ReactNode
    disabled?: boolean
    isToggle?: boolean
    isPressed?: boolean // Add this to properly handle toggle state
    tabindex?: number
}
export const Button = ({
    id,
    title,
    children,
    onClickCallback,
    variantProperties = {},
    loading = false,
    icon,
    disabled,
    isToggle,
    isPressed = false, // Add default value
    tabindex = -1
}: IButtonProps) => {
    const {
        rounded = false,
        size = 'sm',
        variant = 'primary',
        textCase = 'normal-case',
        width = 'unset',
        height = 'unset',
        weight = 'normal',
        className
    } = variantProperties

    const btnBaseClasses = cx(
        'btn-base', // Base button classes from design system
        generateButtonStyles('solid', variant as any, size as any),
        {
            'state-disabled': disabled,
            'state-loading': loading,
            rounded: rounded,
            'opacity-50': disabled || loading,
            'cursor-not-allowed': disabled || loading
        },
        textCase,
        className
    )

    const sizes = getButtonXYSizes(size)

    const {
        mainRef: buttonRef,
        castedRefObject,
        onClick,
        classRef,
        rippleStyle
    } = useRippleEffect(onClickCallback, (disabled ?? false) || loading)

    const handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        // Prevent default only if necessary to avoid interference with click events
    }

    const handleOnMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        // Prevent default only if necessary to avoid interference with click events
    }

    // Enhanced click handler to ensure proper event handling
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Ensure click is only processed on the button element itself
        if (e.currentTarget !== e.target && !e.currentTarget.contains(e.target as Node)) {
            return
        }

        // Stop propagation to prevent event bubbling issues
        e.stopPropagation()

        // Call the ripple effect handler
        onClick(e)
    }

    return (
        <button
            tabIndex={tabindex}
            id={id}
            title={title}
            type="button"
            ref={buttonRef}
            disabled={disabled || loading}
            aria-busy={disabled || loading ? 'true' : 'false'}
            aria-pressed={isToggle ? (isPressed ? 'true' : 'false') : undefined}
            className={`${btnBaseClasses} ${className ?? ''}`}
            style={{
                width: width ?? 'unset',
                maxWidth: sizes.width ?? 'unset',
                height: height ?? sizes.height
            }}
            onClick={handleClick}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
        >
            {/* Ripple effect - positioned absolutely to avoid affecting layout */}
            <span
                className={`absolute inset-0 ripple bg-${variant}-200 ${classRef}`}
                style={{ ...rippleStyle, pointerEvents: 'none' }}
            />

            <div
                /** Here after I want to keep all the breakpoints even if they does the same just in order to
                 * get used to them
                 */
                className={`flex flex-row flex-1 items-center 
                            2xs:justify-center 
                            xs:justify-center
                            sm:justify-center
                            md:justify-center
                            lg:justify-center
                            xl:justify-center
                            2xl:justify-center`}
                style={{ pointerEvents: 'none' }} // Prevent this div from interfering with click events
            >
                <div
                    className={`flex flex-row  items-center justify-center overflow-hidden`}
                    style={{ pointerEvents: 'none' }} // Prevent this div from interfering with click events
                >
                    {loading ? (
                        <div className={`flex loading mr-1`}>
                            <Spinner {...getSpinnerVariant?.(size, variant)} />
                        </div>
                    ) : icon ? (
                        <div className={`icon mx-[100px]`} style={{ pointerEvents: 'none' }}>
                            {icon}
                        </div>
                    ) : (
                        <></>
                    )}
                    <span
                        className={`flex content ${sizeConverter?.(size)} text-nowrap ${weight} `}
                        style={{ pointerEvents: 'none' }}
                    >
                        {children}
                    </span>
                </div>
            </div>
        </button>
    )
}
