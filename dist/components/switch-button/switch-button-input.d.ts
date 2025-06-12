import { ISwitchButtonOptions } from './switch-button.types';
interface ISwitchButtonInputProps {
    fieldName: string;
    options: ISwitchButtonOptions;
}
declare const SwitchButtonInput: ({ fieldName, options }: ISwitchButtonInputProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default SwitchButtonInput;
