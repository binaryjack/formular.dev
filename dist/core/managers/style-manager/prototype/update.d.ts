import { InputClassStatesNamesType } from '../../../framework/common/common.input.state.types';
import { IStyleManager } from '../style-manager.types';
/**
 * Updates the class list for a specific field state.
 *
 * @param {InputStateType} state - The state of the field to update.
 * @param {string} className - The class name to associate with the state.
 */
export declare function update(this: IStyleManager, className: InputClassStatesNamesType, state: boolean): void;
