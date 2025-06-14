import React from 'react'
import './typography.css'

export interface ITypographyProps<T extends HTMLElement> {
    size?: 'small' | 'medium' | 'large'
    ellipsis?: boolean
    as?: keyof JSX.IntrinsicElements
    className?: string
    children: React.ReactNode
    rest?: React.HTMLAttributes<T>
}

export const Typography = <T extends HTMLElement>({
    size = 'medium',
    ellipsis = false,
    as: Tag = 'span',
    className = '',
    children,
    ...rest
}: ITypographyProps<T>) => {
    const classes = `typography ${size} ${ellipsis ? 'ellipsis' : ''} ${className}`

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    )
}
