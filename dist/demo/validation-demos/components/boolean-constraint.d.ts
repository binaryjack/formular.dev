import { IValidationGeneric, IValidationOptions } from '../../../core/managers/validation-manager/validation-manager.types';
export interface IBooleanConstraintProps<T extends IValidationGeneric> {
    fieldName: string;
    type: keyof IValidationOptions;
    validationOptions?: IValidationOptions;
    errorMessage: string;
    guideMessage: string;
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void;
}
export declare const BooleanConstraint: <T extends IValidationGeneric>({ fieldName, type, validationOptions, handleValidationOptionChange, errorMessage, guideMessage }: IBooleanConstraintProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
