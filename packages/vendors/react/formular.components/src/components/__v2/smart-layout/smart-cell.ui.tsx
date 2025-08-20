import { Label } from '../label/label.ui'
import { generateStyle } from './generate-style'
import { ISmartLayoutProps } from './smart-layout.types'

export const SmartCell = ({
    id,
    name,
    grid = {
        gaps: {
            '2xs': 'gap-0'
        }
    },
    children
}: ISmartLayoutProps) => {
    const { gaps } = grid || {}

    const className = ` flex flex-col p-1 ${generateStyle(gaps)}`

    return (
        <div id={`flex-cell-${id}`} className={className}>
            {name && <Label htmlFor={`flex-cell-${id}`} text={name} />}
            {children}
        </div>
    )
}
