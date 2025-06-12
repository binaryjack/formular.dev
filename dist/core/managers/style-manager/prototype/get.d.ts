import { InputClassStatesNamesType } from '../../../framework/common/common.input.state.types';
import { IStyleManager } from '../style-manager.types';
/**
 * Retrieves the class name associated with a specific field state.
 *
 * @param {InputStateType} state - The state of the field to retrieve.
 * @returns {string} - The class name associated with the state.
 */
export declare function get(this: IStyleManager, state: InputClassStatesNamesType): string;
