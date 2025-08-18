import { Label } from '../label/label.ui'
import { IFlexLayoutProps } from './flex-layout.types'
import { generateStyle } from './generate-style'

export const FlexCell = ({
    id,
    name,
    grid = {
        gaps: {
            '2xs': 'gap-0'
        }
    },
    children
}: IFlexLayoutProps) => {
    const { gaps } = grid || {}

    const className = ` flex flex-col p-1 ${generateStyle(gaps)}`

    return (
        <div id={`flex-cell-${id}`} className={className}>
            {name && <Label htmlFor={`flex-cell-${id}`} text={name} />}
            {children}
        </div>
    )
}
