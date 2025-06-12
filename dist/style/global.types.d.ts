export type ValueOf<T> = T[keyof T];
export interface IColorCorrespondance {
    bg: string;
    fg: string;
}
export declare enum VariantNameEnum {
    primary = "primary",
    secondary = "secondary",
    info = "info",
    danger = "danger",
    success = "success",
    warning = "warning"
}
export type VariantNameType = keyof typeof VariantNameEnum;
export declare const VariantNameArray: string[];
/**https://htmlcolorcodes.com/color-names/ */
export declare const colorsCorrecpondance: Record<string, IColorCorrespondance>;
export type orientationTypes = 'vertical' | 'horizontal';
export declare const getCorrespondingVariantColors: (variant: VariantNameType) => IColorCorrespondance;
export declare const getVariantTypeName: (variant: string) => VariantNameType;
export type TextCaseType = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
export declare enum TextWeightEnum {
    extralight = "extralight",
    light = "light",
    thin = "thin",
    normal = "normal",
    medium = "medium",
    semibold = "semibold",
    bold = "bold",
    extrabold = "extrabold",
    mono = "mono",
    sans = "sans",
    serif = "serif"
}
export type TextWeightType = keyof typeof TextWeightEnum;
export declare const TextWeightArray: string[];
export declare const getWeightTypeName: (weight: string) => TextWeightType;
export declare enum ScreenOrientationEnum {
    portrait = "portrait",
    landscape = "landscape",
    undefined = "undefined"
}
export type ScreenOrientationType = keyof typeof ScreenOrientationEnum;
export declare const ScreenOrientationArray: string[];
export declare const getScreenOrientationTypeName: (orientation: string) => ScreenOrientationType;
export declare enum AppBreakPointSizesEnum {
    '2xs' = "2xs",
    xs = "xs",
    sm = "sm",
    md = "md",
    lg = "lg",
    xl = "xl",
    '2xl' = "2xl"
}
export type AppBreakPointSizesType = keyof typeof AppBreakPointSizesEnum;
export declare const DrawerBreakPointType: string[];
export declare const AppBreakPointSizesArray: string[];
export declare const getSizeTypeName: (size: string) => AppBreakPointSizesType;
export type ElementPositionOutputType = 'top' | 'bottom' | 'center';
