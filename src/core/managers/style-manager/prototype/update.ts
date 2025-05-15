import {
    InputClassStatesNamesType,
    InputClassStatesValuesEnum
} from '@core/framework/common/common.input.state.types'
import { IStyleManager } from '../style-manager.types'
import { getClass } from '../utils/set-class-state'

/**
 * Updates the class list for a specific field state.
 *
 * @param {InputStateType} state - The state of the field to update.
 * @param {string} className - The class name to associate with the state.
 */
export function update(
    this: IStyleManager,
    className: InputClassStatesNamesType,
    state: boolean
): void {
    const classValue = getClass(className, state)

    this.classesList.set(className, classValue as InputClassStatesValuesEnum)
    if (!this.input?.isInitialized || !this.input.notificationManager.isInitialized) return
    this.input.notificationManager.observers.trigger()
}
