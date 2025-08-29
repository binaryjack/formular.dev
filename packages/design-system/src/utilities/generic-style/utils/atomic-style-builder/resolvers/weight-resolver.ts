import { TextWeightType } from '@/types/types/text-weight.type'

export const weightResolver = (prefix: string, weight: TextWeightType) => {
    // Map weight types to Tailwind font weight classes
    const weightMap: Record<TextWeightType, string> = {
        thin: 'font-thin',
        extralight: 'font-extralight',
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        mono: 'font-mono',
        sans: 'font-sans',
        serif: 'font-serif'
    }

    return weightMap[weight] || 'font-normal'
}
