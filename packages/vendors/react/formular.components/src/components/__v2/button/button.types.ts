import { IComponentVariants } from '../component-variants'

export interface IButtonProps extends Partial<React.ComponentProps<'button'>> {
    id: string
    title: string
    children?: React.ReactNode | string
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    loading?: boolean
    icon?: React.ReactNode
    disabled?: boolean
    isToggle?: boolean
    tabindex?: number
    variants?: Partial<IComponentVariants>
}
