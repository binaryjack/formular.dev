import { IOptionItem } from '../../core/framework/schema/options-schema/options.scheme.types';
import { IRadioBaseInput } from '../../core/input-engine/variants/radio-base/radio-base-input.types';
interface IRadioInputOptionProps {
    field: IRadioBaseInput;
    option: IOptionItem;
}
declare const RadioInputOption: ({ field, option }: IRadioInputOptionProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default RadioInputOption;
