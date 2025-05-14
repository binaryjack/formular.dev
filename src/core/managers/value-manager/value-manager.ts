import { acceptValueStrategies } from './prototype/accept-value-strategies'
import { addValueStrategies } from './prototype/add-value-strategies'
import { getAsString } from './prototype/get-as-string'
import { getValue } from './prototype/get-value'
import { initialize } from './prototype/initialize'
import { setValue } from './prototype/set-value'
import { IValueManager } from './value-manager.types'

export const ValueStrategy = function (this: IValueManager) {
    this.isInitialized = false
    this.dependencyName = ValueStrategy.name
} as any as IValueManager

Object.assign(ValueStrategy.prototype, {
    initialize,
    acceptValueStrategies,
    addValueStrategies,
    getValue,
    setValue,
    getAsString
})
