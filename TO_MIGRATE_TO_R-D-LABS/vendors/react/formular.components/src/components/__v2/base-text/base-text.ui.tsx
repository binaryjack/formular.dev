import { IBaseTextProps } from './base-text.types'

export const BaseText = ({ id, text, htmlFor, className, ...rest }: IBaseTextProps) => {
    return (
        <>
            {htmlFor ? (
                <label id={id} htmlFor={htmlFor} className={className} {...rest}>
                    {text}
                </label>
            ) : (
                <span id={id} className={className} {...rest}>
                    {text}
                </span>
            )}
        </>
    )
}
