import { FieldInputStateType } from '../common.types'

export interface IFieldStateStyle {
    new (): IFieldStateStyle
    classesList: Map<FieldInputStateType, string>
    update: (type: FieldInputStateType, state: boolean) => void
    get: () => string
}
