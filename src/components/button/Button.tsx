import { useEffect } from 'react'

import { uniqueClass } from '../../dependency/uniqueClass'
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
const Button = ({
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
        textCase = 'normal-case'
    } = variant

    const btnBaseClasses = uniqueClass([
        'btn-base',
        size,
        `btn-${type}`,
        disabled ? 'disabled' : '',
        `text-${size}`,
        `font-${bold ? 'bold' : 'normal'}`,
        textCase
    ])

    const { buttonRef, onClick, classRef, rippleStyle } = useRippleEffect(
        id,
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
        <div id={id} className={`btn-wrapper ${rounded ? 'rounded' : ''}`}>
            <button
                ref={buttonRef}
                type="button"
                disabled={disabled}
                className={btnBaseClasses}
                title={title}
                onClick={onClick}
            >
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
                    <span className={`flex ${type} ripple ${classRef} `}></span>
                    <div className={`content ${size}`}>{children}</div>
                    <style>{rippleStyle}</style>
                </div>
            </button>
        </div>
    )
}
export default Button
