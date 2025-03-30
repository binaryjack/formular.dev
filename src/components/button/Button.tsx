import { useEffect } from 'react'

import { conditionalClass } from '../../dependency/conditionalClass'
import Spinner from '../spinner/Spinner'
import useRippleEffect from './core/useRippleEffect'

export type ButtonVariantType = 'primary' | 'secondary' | 'info' | 'error' | 'success' | 'warning'
export type ButtonVariantSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xd'

export type ButtonCaseType = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'

interface IButtonVariant {
    type: ButtonVariantType
    size: ButtonVariantSize
    textCase: ButtonCaseType
    rounded: boolean
    bold: boolean
    width: string
    height: string
    className: string
}

interface IButtonProps {
    id: string
    title: string
    children?: React.ReactNode | string
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    variant?: Partial<IButtonVariant>
    loading?: boolean
    icon?: React.ReactNode
    disabled?: boolean
}
export const Button = ({
    id,
    title,
    children,
    onClickCallback,
    variant = {},
    loading = false,
    icon,
    disabled
}: IButtonProps) => {
    const {
        rounded = false,
        size = 'sm',
        type = 'primary',
        bold = false,
        textCase = 'normal-case',
        width = 'unset',
        height = 'unset',
        className
    } = variant

    const btnBaseClasses = conditionalClass([
        'btn-base',
        size,
        `btn-${type}`,
        disabled ? 'disabled' : '',
        `text-${size}`,
        `font-${bold ? 'bold' : 'normal'}`,
        textCase
    ])

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
            id={id}
            type="button"
            ref={buttonRef}
            disabled={disabled}
            className={`btn-wrapper ${rounded ? 'rounded' : ''} ${className}`}
            style={{ width: width, height: height }}
            onClick={onClick}
        >
            <div className={btnBaseClasses} title={title}>
                <div className={` flex flex-row  items-center justify-center overflow-hidden`}>
                    {loading ? (
                        <div className={`flex loading mr-2`}>
                            <Spinner width={18} height={18} strokeWidth={2} />
                        </div>
                    ) : icon ? (
                        <div className={`icon `}>{icon}</div>
                    ) : (
                        <></>
                    )}
                    <span
                        className={`relative flex ${type} ripple ${classRef} `}
                        style={{ ...rippleStyle }}
                    ></span>
                    <span className={`content ${size} text-nowrap text-ellipsis`}>{children}</span>
                </div>
            </div>
        </button>
    )
}
