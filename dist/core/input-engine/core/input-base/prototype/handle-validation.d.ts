import { IEvents } from '../../../../framework/events/events.types';
import { IValidationResult } from '../../../../managers/validation-manager/validation-manager.types';
import { IExtendedInput } from '../input-base.types';
export declare const handleValidation: <T extends IEvents>(this: IExtendedInput, data: T) => IValidationResult[];
