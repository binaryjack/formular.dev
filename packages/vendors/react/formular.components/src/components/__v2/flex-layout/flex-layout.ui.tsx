import { IFlexLayoutBreakPoints, IFlexLayoutProps } from './flex-layout.types'

export const FlexLayout = ({
    id,
    grid = {
        rows: {
            '2xs': 'flex-col',
            xs: 'xs:flex-row',
            sm: 'sm:flex-row',
            md: 'md:flex-row'
        },
        gaps: {
            '2xs': 'gap-1'
        }
    },
    children
}: IFlexLayoutProps) => {
    const { columns, rows, gaps } = grid || {}

    const generateStyle = (rules?: IFlexLayoutBreakPoints) => {
        if (!rules) return undefined
        const output = Object.values(rules)
            .filter((o) => o !== undefined || o !== '')
            .map((o) => `${o}`)
            .join(' ')

        return output
    }

    const className = `
                        h-screen
                        w-screen
                        flex
                        bg-slate-300
                        p-0
                        overflow-y-auto

                        ${generateStyle(rows)} 
                        ${generateStyle(gaps)}`

    return (
        <div id={id} className={className}>
            {children}
        </div>
    )
}
