import { IFlexLayoutProps } from './flex-layout.types'
import { generateStyle } from './generate-style'

export const FlexLayout = ({
    id,
    grid = {
        rows: {
            '2xs': 'flex-col',
            xs: 'xs:flex-col',
            sm: 'sm:flex-row',
            md: 'md:flex-row'
        },
        gaps: {
            '2xs': 'gap-1'
        }
    },
    children
}: IFlexLayoutProps) => {
    const { rows, gaps } = grid || {}

    const className = `
                        h-screen
                        w-screen
                        flex
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
