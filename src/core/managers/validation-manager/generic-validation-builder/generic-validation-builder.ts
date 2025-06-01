import { IValidationConstraintBuilder } from '../constraint-builder/validation-constraint-builder'
import { IValidationOptions } from '../validation-manager.types'

export interface IGenericValidationBuilder {
    new (): IGenericValidationBuilder
    constraints: IValidationConstraintBuilder<any>[]
    setConstraints: <T>(constraints: IValidationConstraintBuilder<T>[]) => IGenericValidationBuilder
    build: () => IValidationOptions
    clone: () => IGenericValidationBuilder
}

export const GenericValidationBuilder = function (
    this: IGenericValidationBuilder
): IGenericValidationBuilder {
    this.constraints = []

    this.setConstraints = function <T>(
        this: IGenericValidationBuilder,
        constraints: IValidationConstraintBuilder<T>[]
    ): IGenericValidationBuilder {
        this.constraints = constraints
        return this
    }

    this.build = function (this: IGenericValidationBuilder): IValidationOptions {
        if (this.constraints.length === 0) {
            return {}
        }
        // Map each constraint to its built representation
        // and return as IValidationOptions

        const maxContainer = this.constraints.find((c) => c.type === 'max')?.build() ?? undefined
        const minContainer = this.constraints.find((c) => c.type === 'min')?.build() ?? undefined
        const minLengthContainer =
            this.constraints.find((c) => c.type === 'minLength')?.build() ?? undefined
        const maxLengthContainer =
            this.constraints.find((c) => c.type === 'maxLength')?.build() ?? undefined
        const patternContainer =
            this.constraints.find((c) => c.type === 'pattern')?.build() ?? undefined
        const customContainer =
            this.constraints.find((c) => c.type === 'custom')?.build() ?? undefined
        const requiredContainer =
            this.constraints.find((c) => c.type === 'required')?.build() ?? undefined

        const output: IValidationOptions = {
            max: maxContainer ? { ...maxContainer } : undefined,
            min: minContainer ? { ...minContainer } : undefined,
            minLength: minLengthContainer ? { ...minLengthContainer } : undefined,
            maxLength: maxLengthContainer ? { ...maxLengthContainer } : undefined,
            pattern: patternContainer ? { ...patternContainer } : undefined,
            custom: customContainer ? { ...customContainer } : undefined,
            required: requiredContainer ? { ...requiredContainer } : undefined
        } as IValidationOptions

        return output
    }

    this.clone = function (this: IGenericValidationBuilder): IGenericValidationBuilder {
        const clone = new GenericValidationBuilder()
        clone.setConstraints(this.constraints.map((c) => c.clone()))
        return clone
    }

    return this
} as any as IGenericValidationBuilder
