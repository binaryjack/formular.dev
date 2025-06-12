export declare enum ValidationConstraintTypeEnum {
    required = "required",
    min = "min",
    max = "max",
    minLength = "minLength",
    maxLength = "maxLength",
    pattern = "pattern",
    custom = "custom"
}
export type ValidationConstraintType = keyof typeof ValidationConstraintTypeEnum;
export interface IValidationConstraintBuilder<T> {
    new <T>(type: ValidationConstraintType): IValidationConstraintBuilder<T>;
    type: ValidationConstraintType;
    constraint: T;
    name: string | null;
    errorMessage: string | null;
    guideMessage: string | null;
    setConstraint: (constraint: T) => IValidationConstraintBuilder<T>;
    setName: (name: string) => IValidationConstraintBuilder<T>;
    setErrorMessage: (errorMessage: string | null) => IValidationConstraintBuilder<T>;
    setGuideMessage: (guideMessage: string | null) => IValidationConstraintBuilder<T>;
    build: <TOut>() => TOut;
    clone: <TOut>() => TOut;
}
export declare const ValidationConstraintBuilder: IValidationConstraintBuilder<any>;
