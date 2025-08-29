export enum BorderModeEnum {
    all = 'all',
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    horizontal = 'horizontal',
    vertical = 'vertical',
    none = 'none'
}

export type BorderModeType = keyof typeof BorderModeEnum
export const BorderModeArray: string[] = Object.values(BorderModeEnum)
