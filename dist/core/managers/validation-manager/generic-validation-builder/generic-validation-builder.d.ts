import { IValidationConstraintBuilder } from '../constraint-builder/validation-constraint-builder';
import { IValidationOptions } from '../validation-manager.types';
export interface IGenericValidationBuilder {
    new (): IGenericValidationBuilder;
    constraints: IValidationConstraintBuilder<any>[];
    setConstraints: <T>(constraints: IValidationConstraintBuilder<T>[]) => IGenericValidationBuilder;
    build: () => IValidationOptions;
    clone: () => IGenericValidationBuilder;
}
export declare const GenericValidationBuilder: IGenericValidationBuilder;
