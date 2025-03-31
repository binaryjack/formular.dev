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
        'btn-base',
        size,
        `btn-${variant}`,
        disabled ? 'disabled' : '',
        `text-${String(size)}`,
        textCase
    ])

    const sizes = getButtonXYSizes(size)

    const { buttonRef, onClick, classRef, rippleStyle } = useRippleEffect(
        onClickCallback,
        (disabled ?? false) || loading
    )

    useEffect(() => {
        if (!buttonRef) return
        const btn = buttonRef.current as unknown as HTMLButtonElement
        if (!btn) return
        btn.setAttribute('aria-busy', loading ? 'true' : 'false')
    }, [buttonRef])

    return (
        <button
            tabIndex={0}
            id={id}
            type="button"
            ref={buttonRef}
            disabled={disabled}
            className={`btn-wrapper ${rounded ? 'rounded' : ''}   ${className} ${sizes.px}  ${sizes.my}   `}
            style={{
                width: width === 'unset' ? sizes.width : width,
                height: height === 'unset' ? sizes.height : height
            }}
            onClick={onClick}
        >
            <div className={btnBaseClasses} title={title}>
                <div className={` flex flex-row  items-center justify-center overflow-hidden`}>
                    {loading ? (
                        <div className={`flex loading ml-1`}>
                            <Spinner {...getSpinnerVariant?.(size, variant)} />
                        </div>
                    ) : icon ? (
                        <div className={`icon `}>{icon}</div>
                    ) : (
                        <></>
                    )}
                    <span
                        className={`relative flex ${variant} ripple ${classRef}`}
                        style={{ ...rippleStyle }}
                    ></span>
                    <span
                        className={`content ${sizeConverter?.(size)}  text-nowrap text-ellipsis ${weight}`}
                    >
                        {children}
                    </span>
                </div>
            </div>
        </button>
    )
}
