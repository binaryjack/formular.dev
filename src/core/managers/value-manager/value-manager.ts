import { acceptValueStrategies } from './prototype/accept-value-strategies'
import { addValueStrategies } from './prototype/add-value-strategies'
import { getAsString } from './prototype/get-as-string'
import { getValue } from './prototype/get-value'
import { initialize } from './prototype/initialize'
import { setValue } from './prototype/set-value'
import { setValueFromHtmlElement } from './prototype/set-value-from-html-element'
import { IValueManager } from './value-manager.types'

export const ValueStrategy = function (this: IValueManager) {
    this.isInitialized = false

    Object.defineProperty(this, 'dependencyName', {
        value: ValueStrategy.name,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IValueManager

Object.assign(ValueStrategy.prototype, {
    initialize,
    acceptValueStrategies,
    setValueFromHtmlElement,
    addValueStrategies,
    getValue,
    setValue,
    getAsString
})
