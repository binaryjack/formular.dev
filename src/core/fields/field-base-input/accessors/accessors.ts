import { IDommable } from '@core/dommable/dommable.types'
import { IDrawerBaseInput } from '@core/fields/drawer-base-input/drawer-base-input.types'
import { IFieldStateStyle } from '@core/fields/field-state-style/field-state-style.types'
import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { ITracker, TrackingType } from '@core/tracker/tracker.types'
import { IValidationStrategy } from '@core/validation-strategy/validation-strategy.types'
import { IValueStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldInput } from '../field-input-base-types'

export interface IDefaultDependency {}

export const defaultDependencyAccessor: IDefaultDependency = {}

export type DependencyKeys =
    | 'dom'
    | 'drawer'
    | 'notifier'
    | 'style'
    | 'tracker'
    | 'validation'
    | 'value'
    | 'defaultDependencyAccessor'

export type AccessorsTypes =
    | IDommable<HTMLInputElement>
    | INotifiableEntity
    | IFieldStateStyle
    | IValidationStrategy
    | IValueStrategy
    | FieldDataTypes
    | undefined

export const handleMissingDependency = (field: IFieldInput, dependencyKey: string): void => {
    field.message('critical', field.name, `${dependencyKey} must be initialized!`)
}

export interface IAccessors {
    [key: string]: any
    /** message helper method : uses tracker and fallbacks to console */
    message: (type: TrackingType, source: string, message: string) => void
    /** Dependency accessors */
    dom(): IDommable<HTMLInputElement> | undefined
    notifier: () => INotifiableEntity | undefined
    style: () => IFieldStateStyle | undefined
    track: () => ITracker | undefined
    drawer: () => IDrawerBaseInput | undefined
    validationStrategy: () => IValidationStrategy | undefined
    valueStrategy: () => IValueStrategy | undefined
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes
}

export const createDependentAccessor =
    (field: IFieldInput) =>
    <T>(dependencyKey: DependencyKeys): (() => T | undefined) => {
        return () => {
            const dependency = field[dependencyKey[0]]
            if (!dependency) {
                handleMissingDependency(field, dependencyKey)
                return defaultDependencyAccessor as T
            }
            return dependency as T
        }
    }

const dependencyConfig: Record<DependencyKeys, string> = {
    dom: '_dom must be initialized',
    drawer: '_drawer must be initialized',
    notifier: '_notifier must be initialized',
    style: '_style must be initialized',
    tracker: '_tracker must be initialized',
    validation: '_validation must be initialized',
    value: '_value must be initialized',
    defaultDependencyAccessor: ''
}

export const createAccessor = (field: IFieldInput): IAccessors => {
    const dependencyAccessor = createDependentAccessor(field)

    const accessors: Partial<IAccessors> = {}
    for (const [key] of Object.entries(dependencyConfig)) {
        accessors[key as DependencyKeys] = dependencyAccessor(key as DependencyKeys)
    }
    return {
        ...accessors,
        setValue: (value: FieldDataTypes) => {
            field.valueStrategy()?.setValue(value)
        },
        getValue: () => {
            return field.valueStrategy()?.getValue() ?? null
        },
        message: (type: TrackingType, source: string, message: string) => {
            generalExceptionHandler(field._tracker, type, source, message)
        }
    } as IAccessors
}
