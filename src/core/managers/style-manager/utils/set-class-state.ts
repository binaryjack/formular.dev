import { InputClassStatesNamesType } from '@core/framework/common/common.input.state.types'

export const getActiveClass = (className: InputClassStatesNamesType): string => {
    return `${className}`
}

export const getInactiveClass = (className: InputClassStatesNamesType): string => {
    return `no-${className}`
}

export const getClass = (className: InputClassStatesNamesType, isActive: boolean): string => {
    return isActive ? getActiveClass(className) : getInactiveClass(className)
}
