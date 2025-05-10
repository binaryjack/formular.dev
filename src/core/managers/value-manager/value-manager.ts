import { acceptValueStrategies } from './prototype/accept-value-strategies'
import { addValueStrategies } from './prototype/add-value-strategies'
import { getValue } from './prototype/get-value'
import { initialize } from './prototype/initialize'
import { setValue } from './prototype/set-value'
import { setValueCheckBox } from './prototype/set-value-checkbox'
import { setValueRadio } from './prototype/set-value-radio'
import { setValueSelect } from './prototype/set-value-select'
import { setValueText } from './prototype/set-value-text'
import { toString } from './prototype/to-string'
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
    toString,
    setValueCheckBox,
    setValueSelect,
    setValueText,
    setValueRadio
})
