export interface IStatusIconProps extends Partial<React.ComponentProps<'div'>> {
    id: string
    isLoading: boolean
    icon: React.ReactNode
    className?: string
}
