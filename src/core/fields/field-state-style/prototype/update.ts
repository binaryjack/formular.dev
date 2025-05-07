import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import { IFieldStateStyle } from '../field-state-style.types'

/**
 * Updates the class list for a specific field state.
 *
 * @param {FieldInputStateType} state - The state of the field to update.
 * @param {string} className - The class name to associate with the state.
 */
export function update(
    this: IFieldStateStyle,
    state: FieldInputStateType,
    className: string
): void {
    this.classesList.set(state, className)
    this.field.notifier.observers.trigger()
}
