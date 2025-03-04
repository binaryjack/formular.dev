import { useRef } from 'react'

import useRippleEffect from './core/useRippleEffect'

export type ButtonVariantType =
    | 'primary'
    | 'secondary'
    | 'ternary'
    | 'error'
    | 'success'
    | 'warning'
export type ButtonVariantSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonCaseType = 'uppercase' | 'lowercase'

interface IButtonVariant {
    type: ButtonVariantType
    size: ButtonVariantSize
    case: ButtonCaseType
    rounded: boolean
    bold: boolean
}

interface IButtonProps {
    children?: React.ReactNode | string
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    variant?: IButtonVariant
}
const Button = ({
    children,
    onClickCallback,
    variant = { rounded: false, size: 'sm', type: 'primary', bold: true, case: 'uppercase' }
}: IButtonProps) => {
    const buttonRef = useRef(null)
    const rippleRef = useRef(null)

    const { handleOnMouseDown, handleOnMouseUp, onClick } = useRippleEffect(
        rippleRef,
        buttonRef,
        onClickCallback
    )

    return (
        <section className="relative flex items-center justify-items-center">
            <button
                ref={buttonRef}
                type="button"
                className={` btn-base 
                        btn-${variant.type} 
                        ${variant.rounded ? 'rounded' : ''} 
                        text-${variant.size} 
                        font-${variant.bold ? 'bold' : 'normal'} 
                        ${variant.case}`}
                title={`Previous`}
                onClick={onClick}
                // onMouseDown={handleOnMouseDown}
                // onMouseUp={handleOnMouseUp}
            >
                <span ref={rippleRef}></span>
                {children}
            </button>
        </section>
    )
}
export default Button
