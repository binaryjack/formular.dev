import {
    IValidationConstraintBuilder,
    ValidationConstraintTypeEnum
} from '../constraint-builder/validation-constraint-builder'
import { IValidationOptions } from '../validation-manager.types'

export interface IGenericValidationBuilder {
    new (): IGenericValidationBuilder
    constraints: IValidationConstraintBuilder<any>[]
    setConstraints: <T extends ValidationConstraintTypeEnum>(
        constraints: IValidationConstraintBuilder<T>[]
    ) => IGenericValidationBuilder
    build: () => IValidationOptions
    clone: () => IGenericValidationBuilder
}

export const GenericValidationBuilder = function (
    this: IGenericValidationBuilder
): IGenericValidationBuilder {
    this.constraints = []

    this.setConstraints = function <T extends ValidationConstraintTypeEnum>(
        constraints: IValidationConstraintBuilder<T>[]
    ): IGenericValidationBuilder {
        this.constraints = constraints
        return this
    }

    this.build = function (): IValidationOptions {
        const output = this.constraints.map((constraint) => constraint.build())
        return output as IValidationOptions
    }

    this.clone = function (): IGenericValidationBuilder {
        const clone = new GenericValidationBuilder()
        clone.setConstraints(this.constraints.map((c) => c.clone()))
        return clone
    }

    return this
} as any
