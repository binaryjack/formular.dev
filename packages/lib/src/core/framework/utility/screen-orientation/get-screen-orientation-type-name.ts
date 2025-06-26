import { ScreenOrientationType } from './screen-orientation.type'

export const getScreenOrientationTypeName = (orientation: string): ScreenOrientationType =>
    orientation as ScreenOrientationType
