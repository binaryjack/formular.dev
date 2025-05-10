import { classNames } from './prototype/class-names'
import { get } from './prototype/get'
import { getFlagsList } from './prototype/get-flags-list'
import { getFlagsObject } from './prototype/get-flags-object'
import { initialize } from './prototype/initialize'
import { update } from './prototype/update'
import { IStyleManager } from './style-manager.types'

/**
 * Represents the style state of a field.
 *
 * @constructor
 * @this {IStyleManager}
 *
 * @property {Map<FieldInputStateType, string>} classesList - A map that holds the class names for different field states.
 */
export const StyleManager = function (this: IStyleManager) {
    this.isInitialized = false
    this.dependencyName = StyleManager.name
} as any as IStyleManager

Object.assign(StyleManager.prototype, {
    initialize,
    classNames,
    update,
    get,
    getFlagsList,
    getFlagsObject
})
