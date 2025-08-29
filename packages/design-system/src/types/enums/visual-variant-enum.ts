export enum VisualVariantEnum {
    ghost = 'ghost',
    link = 'link',
    outline = 'outline',
    solid = 'solid',
    elevated = 'elevated',
    outlined = 'outlined'
}

export type VisualVariantType = keyof typeof VisualVariantEnum
export const VisualVariantArray: string[] = Object.values(VisualVariantEnum)
