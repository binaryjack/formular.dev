import { useEffect } from 'react'

import { sizeConverter } from '../../core/hooks/screen/utils/screen.utils'
import { conditionalClass } from '../../dependency/conditionalClass'
import {
    AppBreakPointSizesType,
    TextCaseType,
    TextWeightType,
    VariantNameType
} from '../../style/global.types'
import Spinner from '../spinner/Spinner'
import { getSpinnerVariant } from '../spinner/utils/spinner.variant.converter'
import useRippleEffect from './core/useRippleEffect'
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
}
export const Button = ({
    id,
    title,
    children,
    onClickCallback,
    variantProperties = {},
    loading = false,
    icon,
    disabled
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
        `text-${sizeConverter?.(size)}`,
        `${rounded ? 'rounded' : ''}`,
        textCase
    ])

    const sizes = getButtonXYSizes(size)

    const { buttonRef, onClick, classRef, rippleStyle } = useRippleEffect(
        onClickCallback,
        (disabled ?? false) || loading
    )

    useEffect(() => {
        const btn = buttonRef?.current as unknown as HTMLButtonElement
        if (!btn) return
        btn.setAttribute('aria-busy', loading ? 'true' : 'false')

        if (!btn.getAttribute('aria-title')) btn.setAttribute('aria-title', title)
        if (!btn.getAttribute('aria-label')) btn.setAttribute('aria-label', title)
    }, [buttonRef, loading, title])

    const handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const btn = buttonRef?.current as unknown as HTMLButtonElement
        if (!btn) return
        btn.setAttribute('aria-pressed', 'true')
    }

    const handleOnMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const btn = buttonRef?.current as unknown as HTMLButtonElement
        if (!btn) return
        btn.setAttribute('aria-pressed', 'false')
    }

    return (
        <button
            tabIndex={0}
            id={id}
            title={title}
            type="button"
            ref={buttonRef}
            disabled={disabled}
            className={`btn-wrapper ${btnBaseClasses} ${className} ${sizes.px} ${sizes.my}`}
            style={{
                maxWidth: width === 'unset' ? sizes.width : width,
                height: height === 'unset' ? sizes.height : height
            }}
            onClick={onClick}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
        >
            <div
                className={`flex flex-row flex-1  items-center 
                            2xs:justify-center 
                            xs:justify-center
                            sm:justify-center
                            md:justify-center
                            lg:justify-center
                            xl:justify-center
                            2xl:justify-center`}
            >
                <div className={` flex flex-row  items-center justify-center overflow-hidden`}>
                    {loading ? (
                        <div className={`flex loading ml-1 mr-1`}>
                            <Spinner {...getSpinnerVariant?.(size, variant)} />
                        </div>
                    ) : icon ? (
                        <div className={`icon `}>{icon}</div>
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
