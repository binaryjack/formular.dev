import { IComponentAspect } from '../interfaces/i-component-aspect'

export const aspectResolver = (prefix: string, aspect: IComponentAspect) => {
    const classes: string[] = []

    // Handle size (map to existing button size classes for buttons, otherwise use padding)
    if (aspect?.size) {
        // If this is for a button (prefix will help us determine), use btn-size classes
        if (prefix === 'button' || prefix === 'btn') {
            const buttonSizeMap = {
                '2xs': 'btn-2xs',
                xs: 'btn-xs',
                sm: 'btn-sm',
                md: 'btn-md',
                lg: 'btn-lg',
                xl: 'btn-xl',
                '2xl': 'btn-2xl'
            }
            classes.push(buttonSizeMap[aspect.size] || 'btn-md')
        } else {
            // For other components, use Tailwind padding classes
            // const sizeMap = {
            //     '2xs': 'p-1',
            //     xs: 'p-2',
            //     sm: 'p-3',
            //     md: 'p-4',
            //     lg: 'p-5',
            //     xl: 'p-6',
            //     '2xl': 'p-8'
            // }
            // classes.push(sizeMap[aspect.size] || 'p-4')
        }
    }

    // Handle rounded corners
    if (aspect?.rounded) {
        classes.push('rounded')
    }

    // Handle custom dimensions
    if (aspect?.width) {
        classes.push(`w-[${aspect.width}]`)
    }

    if (aspect?.height) {
        classes.push(`h-[${aspect.height}]`)
    }

    // Handle custom spacing
    if (aspect?.padding) {
        classes.push(`p-[${aspect.padding}]`)
    }

    if (aspect?.margin) {
        classes.push(`m-[${aspect.margin}]`)
    }

    return classes.join(' ')
}
