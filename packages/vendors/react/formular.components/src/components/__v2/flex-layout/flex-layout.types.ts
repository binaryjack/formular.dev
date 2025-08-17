export interface IFlexLayoutBreakPoints {
    '2xs'?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
}

export interface IFlexLayoutGrid {
    columns?: Partial<IFlexLayoutBreakPoints>
    rows?: Partial<IFlexLayoutBreakPoints>
    gaps?: Partial<IFlexLayoutBreakPoints>
}

export interface IFlexLayoutProps extends React.ComponentProps<'div'> {
    id: string
    grid?: IFlexLayoutGrid
    children?: React.ReactNode
}
