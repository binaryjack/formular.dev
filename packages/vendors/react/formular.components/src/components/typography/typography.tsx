import { cx } from 'formular.design.system'
import React from 'react'

export interface ITypographyProps<T extends HTMLElement> {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
    ellipsis?: boolean
    as?: keyof JSX.IntrinsicElements
    className?: string
    children: React.ReactNode
    rest?: React.HTMLAttributes<T>
}

export const Typography = <T extends HTMLElement>({
    size = 'base',
    weight = 'normal',
    ellipsis = false,
    as: Tag = 'span',
    className = '',
    children,
    ...rest
}: ITypographyProps<T>) => {
    const classes = cx(
        `text-${size}`,
        `font-${weight}`,
        {
            truncate: ellipsis
        },
        className
    )

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    )
}
