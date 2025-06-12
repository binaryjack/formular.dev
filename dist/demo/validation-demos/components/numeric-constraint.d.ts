import { IValidationGeneric, IValidationOptions } from '../../../core/managers/validation-manager/validation-manager.types';
export interface INumericConstraintProps<T extends IValidationGeneric> {
    fieldName: string;
    type: keyof IValidationOptions;
    validationOptions?: IValidationOptions;
    errorMessage: string;
    guideMessage: string;
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void;
}
export declare const NumericConstraint: <T extends IValidationGeneric>({ fieldName, type, validationOptions, handleValidationOptionChange, errorMessage, guideMessage }: INumericConstraintProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
