import { ScreenOrientationType } from './types/screen-orientation.type'

export const getScreenOrientationTypeName = (orientation: string): ScreenOrientationType =>
    orientation as ScreenOrientationType
