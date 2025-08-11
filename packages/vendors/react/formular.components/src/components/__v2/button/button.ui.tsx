import Spinner from '@components/spinner/spinner'
import { getSpinnerVariant } from '@components/spinner/utils/spinner.variant.converter'
import { clx, cx, genericStyle, rippleColors } from 'formular.design.system'
import { Typography } from '../typography/typography.ui'
import { IButtonProps } from './button.types'
import useRippleEffect from './ripple/use-ripple-effect'

export const Button = ({
    id,
    title,
    children,
    onClick,
    variants = {},
    loading = false,
    icon,
    disabled,
    isToggle,
    tabindex = -1
}: IButtonProps) => {
    const styles = genericStyle({
        componentTypes: ['button', 'typography'],
        ...variants
    })

    const {
        mainRef: buttonRef,
        castedRefObject,
        onClickCallback,
        ripples
    } = useRippleEffect(onClick, (disabled ?? false) || loading)

    const rColor = rippleColors(variants?.variant!)
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
            onClick={handleClick}
            className={cx(
                styles.backGround,
                styles.borders,
                ...Object.values(styles.states),
                'relative',
                'overflow-hidden'
            )}
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
                            <Spinner
                                {...getSpinnerVariant?.(
                                    variants?.aspect?.size!,
                                    variants?.variant!
                                )}
                            />
                        </div>
                    ) : icon ? (
                        <div className={`icon mx-[100px]`} style={{ pointerEvents: 'none' }}>
                            {icon}
                        </div>
                    ) : (
                        <></>
                    )}
                    <Typography
                        as={'span'}
                        className={clx(...styles.text, 'text-nowrap', 'elipsed-text')}
                        variants={{
                            variant: variants?.variant,
                            aspect: {
                                size: variants?.aspect?.size
                            }
                        }}
                        style={{ pointerEvents: 'none' }}
                    >
                        {children}
                    </Typography>
                </div>
            </div>
        </button>
    )
}
