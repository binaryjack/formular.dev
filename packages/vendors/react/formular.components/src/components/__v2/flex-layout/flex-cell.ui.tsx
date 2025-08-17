import { IFlexLayoutBreakPoints, IFlexLayoutProps } from './flex-layout.types'

export const FlexCell = ({
    id,
    grid = {
        gaps: {
            '2xs': 'gap-0'
        }
    },
    children
}: IFlexLayoutProps) => {
    const { gaps } = grid || {}

    const generateStyle = (rules?: IFlexLayoutBreakPoints) => {
        if (!rules) return undefined
        const output = Object.values(rules)
            .filter((o) => o !== undefined || o !== '')
            .map((o) => `${o}`)
            .join(' ')

        return output
    }

    const className = ` flex 
                    flex-col                      
                  
                     bg-slate-100

                        p-1
                    ${generateStyle(gaps)}`

    return (
        <div id={id} className={className}>
            {id}
            {children}
        </div>
    )
}
