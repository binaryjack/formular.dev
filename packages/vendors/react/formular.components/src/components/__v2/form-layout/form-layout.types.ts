import { IFormLayoutVariants } from 'formular.design.system'

export interface IFormLayoutProps extends React.ComponentProps<'div'>, IFormLayoutVariants {
    children: React.ReactNode
    className?: string
    as?: 'form' | 'div' | 'section'
}
