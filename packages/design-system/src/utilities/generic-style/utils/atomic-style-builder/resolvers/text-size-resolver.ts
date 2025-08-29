import { ComponentSizeType } from '@/types'

export const textSizeResolver = (prefix: string, size: ComponentSizeType) => {
    // Map component sizes to Tailwind text size classes
    const sizeMap: Record<ComponentSizeType, string> = {
        '2xs': 'text-2xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl'
    }

    return sizeMap[size] || 'text-base'
}
