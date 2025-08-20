import { Label } from '../label/label.ui'
import { generateStyle } from './generate-style'
import { ISmartLayoutProps } from './smart-layout.types'

export const SmartLayout = ({
    id,
    name,
    grid = {
        rows: {
            '2xs': 'flex-col ',
            xs: 'xs:flex-col',
            sm: 'sm:flex-row',
            md: 'md:flex-row'
        },
        gaps: {
            '2xs': 'gap-1'
        }
    },
    children
}: ISmartLayoutProps) => {
    const { rows, gaps } = grid || {}

    const layoutStyleClasses = ` 
                        h-auto
                        w-full
                        flex
                        flex-col
                        p-0
                        relative
                        ${generateStyle(rows)} 
                        ${generateStyle(gaps)}`

    return (
        <div className={`flex flex-col`}>
            {name && <Label htmlFor={id} text={name} />}
            <div id={id} className={layoutStyleClasses}>
                {children}
            </div>
        </div>
    )
}
