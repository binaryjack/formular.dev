import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import { IStyleManager } from '../style-manager.types'

/**
 * Updates the class list for a specific field state.
 *
 * @param {FieldInputStateType} state - The state of the field to update.
 * @param {string} className - The class name to associate with the state.
 */
export function update(this: IStyleManager, state: FieldInputStateType, className: string): void {
    this.classesList.set(state, className)
    this.input.notificationManager.observers.trigger()
}
