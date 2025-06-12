import { default as React } from 'react';
export interface ITypographyProps<T extends HTMLElement> {
    size?: 'small' | 'medium' | 'large';
    ellipsis?: boolean;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    children: React.ReactNode;
    rest?: React.HTMLAttributes<T>;
}
export declare const Typography: <T extends HTMLElement>({ size, ellipsis, as: Tag, className, children, ...rest }: ITypographyProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
