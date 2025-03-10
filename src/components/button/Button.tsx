import Spinner from '../spinner/Spinner'
import useRippleEffect from './core/useRippleEffect'

export type ButtonVariantType = 'primary' | 'secondary' | 'info' | 'error' | 'success' | 'warning'
export type ButtonVariantSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xd'

export type ButtonCaseType = 'uppercase' | 'lowercase'

interface IButtonVariant {
    type: ButtonVariantType
    size: ButtonVariantSize
    case: ButtonCaseType
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
}
const Button = ({
    id,
    title,
    children,
    onClickCallback,
    variant,
    loading = false,
    icon
}: IButtonProps) => {
    const _variants = {
        rounded: false,
        size: 'sm',
        type: 'primary',
        bold: true,
        case: 'uppercase',
        ...variant
    }

    const { buttonRef, onClick, classRef, rippleStyle } = useRippleEffect(id, onClickCallback)
    return (
        <div id={id} className={` w-full button-wrapper relative overflow-hidden`}>
            <button
                ref={buttonRef}
                type="button"
                className={`btn-base ${_variants.size}
                        btn-${_variants.type} 
                        ${_variants.rounded ? 'rounded' : ''} 
                    
                        text-${_variants.size} 
                        font-${_variants.bold ? 'bold' : 'normal'} 

                        
                        ${_variants.case}`}
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
                    <span className={`flex ${_variants.type} ripple ${classRef} `}></span>
                    <div className={`content ${_variants.size}`}>{children}</div>
                    <style>{rippleStyle}</style>
                </div>
            </button>
        </div>
    )
}
export default Button
