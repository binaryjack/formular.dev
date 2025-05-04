import { useEffect } from 'react'
import { sizeConverter } from '../../core/hooks/screen/utils/screen.utils'
import {
    AppBreakPointSizesType,
    TextCaseType,
    TextWeightType,
    VariantNameType
} from '../../style/global.types'
import Spinner from '../spinner/spinner'
import { getSpinnerVariant } from '../spinner/utils/spinner.variant.converter'

import { conditionalClass } from '@core/framework/utility/conditional-class'
import useRippleEffect from './core/use-ripple-effect'
import { getButtonXYSizes } from './utils/button.types'
export interface IButtonVariant {
    variant: VariantNameType
    size: AppBreakPointSizesType
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

    const btnBaseClasses = conditionalClass([
        `${sizeConverter?.(size)}`,
        `btn-${variant}`,
        disabled ? 'disabled' : '',
        loading ? 'loading' : '',
        `text-${sizeConverter?.(size)}`,
        `${rounded ? 'rounded' : ''}`,
        textCase
    ])

    const sizes = getButtonXYSizes(size)

    const {
        mainRef: buttonRef,
        castedRefObject,
        onClick,
        classRef,
        rippleStyle
    } = useRippleEffect(onClickCallback, (disabled ?? false) || loading)

    useEffect(() => {
        if (!castedRefObject?.getAttribute('aria-title'))
            castedRefObject?.setAttribute('aria-title', title)
        if (!castedRefObject?.getAttribute('aria-label'))
            castedRefObject?.setAttribute('aria-label', title)

        castedRefObject?.setAttribute('aria-pressed', 'undefined')
    }, [castedRefObject, title])

    useEffect(() => {
        castedRefObject?.setAttribute('aria-busy', loading ? 'true' : 'false')
    }, [buttonRef, loading])

    useEffect(() => {
        if (isToggle === undefined) return
        castedRefObject?.setAttribute('aria-pressed', isToggle ? 'true' : 'false')
    }, [isToggle])

    const handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // e.stopPropagation()
        // e.preventDefault()
    }

    const handleOnMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // e.stopPropagation()
        // e.preventDefault()
    }

    return (
        <button
            tabIndex={tabindex}
            id={id}
            title={title}
            type="button"
            ref={buttonRef}
            disabled={disabled}
            className={`btn-wrapper ${btnBaseClasses} ${className} ${sizes.px} ${sizes.my}`}
            style={{
                width: width ?? 'unset',
                maxWidth: sizes.width ?? 'unset',
                height: height ?? sizes.height
            }}
            onClick={onClick}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
        >
            <div
                /** Here after I want to keep all the breakpoints even if they does the same just in order to
                 * get used to them
                 */
                className={`flex flex-row flex-1  items-center 
                            2xs:justify-center 
                            xs:justify-center
                            sm:justify-center
                            md:justify-center
                            lg:justify-center
                            xl:justify-center
                            2xl:justify-center`}
            >
                <div className={`flex flex-row  items-center justify-center overflow-hidden`}>
                    {loading ? (
                        <div className={`flex loading  mr-1`}>
                            <Spinner {...getSpinnerVariant?.(size, variant)} />
                        </div>
                    ) : icon ? (
                        <div className={`icon mx-[100px]`}>{icon}</div>
                    ) : (
                        <></>
                    )}
                    <span
                        className={`relative flex ripple ${variant} ${classRef}`}
                        style={{ ...rippleStyle }}
                    />
                    <span
                        className={`flex content ${sizeConverter?.(size)} text-nowrap ${weight} `}
                    >
                        {children}
                    </span>
                </div>
            </div>
        </button>
    )
}
