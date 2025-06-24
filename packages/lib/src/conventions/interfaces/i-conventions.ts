import { MissingPropEnum } from '../enums/missing-prop.enum'
import { ICommands } from './i-commands'
import { IComponents } from './i-components'
import { IDataTypes } from './i-data-types'
import { IEvents } from './i-events'
import { IFormular } from './i-formular'
import { ISuffix } from './i-suffix'
import { ITokens } from './i-tokens'
import { IValidations } from './i-validations'

export interface IConventions<TButtonVariant = Record<string, any>> {
    IsMissing: (property: MissingPropEnum, componentName: string) => never
    suffix: ISuffix
    tokens: ITokens
    validations: IValidations
    events: IEvents
    dataTypes: IDataTypes
    formular: IFormular
    components: IComponents
    commands: ICommands<TButtonVariant>
}
