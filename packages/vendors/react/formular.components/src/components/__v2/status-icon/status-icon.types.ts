export interface IStatusIconProps extends Partial<React.ComponentClass<'div'>> {
    id: string
    isLoading: boolean
    icon: React.ReactNode
    className?: string
}
