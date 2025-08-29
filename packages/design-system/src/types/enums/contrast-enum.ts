export enum ContrastEnum {
    high = 'high',
    medium = 'medium',
    low = 'low'
}

export type ContrastType = keyof typeof ContrastEnum
export const ContrastArray: string[] = Object.values(ContrastEnum)
