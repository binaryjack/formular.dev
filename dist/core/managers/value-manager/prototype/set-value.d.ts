import { InputDataTypes } from '../../../framework/common/common.input.data.types';
import { IExtendedInput } from '../../../input-engine/core/input-base/input-base.types';
import { IValueManager } from '../value-manager.types';
export declare const setValue: (this: IValueManager, field: IExtendedInput, value: InputDataTypes | null) => void;
