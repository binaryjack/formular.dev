import {
    ComponentSizeType,
    ComponentVariantType,
    cx,
    generateButtonStyles,
    TextCaseType,
    TextWeightType
} from 'formular.design.system'
import Spinner from '../spinner/spinner'
import { getSpinnerVariant } from '../spinner/utils/spinner.variant.converter'

import { sizeConverter } from '@adapters/react/hooks/screen/utils/screen.utils'
import useRippleEffect from './core/use-ripple-effect'
export interface IButtonVariant {
    variant: ComponentVariantType
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
        generateButtonStyles('solid', variant as any, size as any), // This already includes 'btn' base class
        {
            'state-disabled': disabled,
            'state-loading': loading,
            'opacity-50': disabled || loading,
            'cursor-not-allowed': disabled || loading
        },
        // Apply border-radius styling based on rounded prop
        !rounded && 'rounded-none', // When rounded=false, remove border-radius. When true, use default.
        textCase,
        className
    )

    const {
        mainRef: buttonRef,
        castedRefObject,
        onClick,
        ripples
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

        // Call the ripple effect handler (which includes the callback)
        onClick(e)
    }

    return (
        <button
            tabIndex={tabindex}
            id={id}
            title={title}
            type="button"
            ref={buttonRef}
            disabled={disabled}
            aria-busy={disabled || loading ? 'true' : 'false'}
            aria-pressed={isToggle ? (isPressed ? 'true' : 'false') : undefined}
            className={`btn-wrapper ${btnBaseClasses} ${className ?? ''} p-1 relative overflow-hidden`}
            style={{
                width: width ?? 'unset',
                height: height ?? 'unset'
            }}
            onClick={handleClick}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
        >
            {/* Ripple effects - positioned absolutely to avoid affecting layout */}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className={`absolute`}
                    style={{
                        ...ripple.style,
                        pointerEvents: 'none',
                        zIndex: 0,
                        borderRadius: '50%',
                        transform: `scale(${ripple.scale})`,
                        opacity: ripple.opacity,
                        backgroundColor:
                            variant === 'primary'
                                ? 'rgba(255, 255, 255, 0.8)'
                                : variant === 'secondary'
                                  ? 'rgba(255, 255, 255, 0.6)'
                                  : variant === 'danger'
                                    ? 'rgba(255, 255, 255, 0.8)'
                                    : variant === 'success'
                                      ? 'rgba(255, 255, 255, 0.8)'
                                      : variant === 'warning'
                                        ? 'rgba(0, 0, 0, 0.6)'
                                        : 'rgba(255, 255, 255, 0.8)' // info and default
                    }}
                />
            ))}

            <div
                /** Here after I want to keep all the breakpoints even if they does the same just in order to
                 * get used to them
                 */
                className={`relative z-10 flex flex-row flex-1 items-center 
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
