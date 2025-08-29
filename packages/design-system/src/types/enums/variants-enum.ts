export enum VariantEnum {
    primary = 'primary',
    secondary = 'secondary',
    info = 'info',
    danger = 'danger',
    success = 'success',
    warning = 'warning',
    neutral = 'neutral'
}

export type VariantType = keyof typeof VariantEnum
export const VariantArray: string[] = Object.values(VariantEnum)
