import { sizeConverter } from '@adapters/react/hooks/screen/utils/screen.utils'
import Spinner from '@components/spinner/spinner'
import { getSpinnerVariant } from '@components/spinner/utils/spinner.variant.converter'
import { cx, generateButtonStyles, rippleColors } from 'formular.design.system'
import { IButtonProps } from './button.types'
import useRippleEffect from './ripple/use-ripple-effect'

export const Button = ({
    id,
    title,
    children,
    onClick,
    options = {
        variant: 'primary',
        size: 'sm',
        textCase: 'normal-case',
        weight: 'normal',
        rounded: false,
        width: 'unset',
        height: 'unset',
        className: ''
    },
    loading = false,
    icon,
    disabled,
    isToggle,
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
    } = options

    const btnBaseClasses = cx(
        generateButtonStyles('solid', variant, size), // This already includes 'btn' base class
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
        onClickCallback,
        ripples
    } = useRippleEffect(onClick, (disabled ?? false) || loading)

    const rColor = rippleColors(variant)
    // Enhanced click handler to ensure proper event handling
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Ensure click is only processed on the button element itself
        if (e.currentTarget !== e.target && !e.currentTarget.contains(e.target as Node)) {
            return
        }

        // Call the ripple effect handler (which includes the callback)
        onClickCallback(e)
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
            aria-pressed={isToggle ? 'true' : 'false'}
            style={{
                width: width ?? 'unset',
                height: height ?? 'unset'
            }}
            onClick={handleClick}
            className={`btn-wrapper ${btnBaseClasses} ${className ?? ''} p-1 relative overflow-hidden`}
        >
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    style={{
                        ...ripple.style,
                        position: 'absolute',
                        pointerEvents: 'none',
                        zIndex: 0,
                        borderRadius: '50%',
                        transform: `scale(${ripple.scale})`,
                        opacity: ripple.opacity,
                        background: rColor
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
