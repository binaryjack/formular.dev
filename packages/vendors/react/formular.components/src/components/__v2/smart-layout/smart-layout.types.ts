export interface ISmartLayoutBreakPoints {
    '2xs'?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
}

export interface ISmartLayoutGrid {
    columns?: Partial<ISmartLayoutBreakPoints>
    rows?: Partial<ISmartLayoutBreakPoints>
    gaps?: Partial<ISmartLayoutBreakPoints>
}

export interface ISmartLayoutProps extends React.ComponentProps<'div'> {
    id: string
    name?: string
    grid?: ISmartLayoutGrid
    children?: React.ReactNode
}
