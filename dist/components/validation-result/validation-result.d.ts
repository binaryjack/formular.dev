import { IValidationResult } from '../../core/managers/validation-manager/validation-manager.types';
interface ValidationResultProps {
    validationResults: IValidationResult[];
    isFocus: boolean;
}
declare const ValidationResultComponent: ({ validationResults, isFocus }: ValidationResultProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default ValidationResultComponent;
