export enum StrokeTypeEnum {
    solid = 'solid',
    dotted = 'dotted',
    dashed = 'dashed',
    double = 'double',
    groove = 'groove',
    ridge = 'ridge',
    inset = 'inset',
    outset = 'outset',
    none = 'none',
    hidden = 'hidden'
}

export type StrokeType = keyof typeof StrokeTypeEnum
export const StrokeTypeArray: string[] = Object.values(StrokeTypeEnum)
