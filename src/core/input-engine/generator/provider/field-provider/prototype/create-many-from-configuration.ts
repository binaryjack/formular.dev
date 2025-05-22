import { conventions } from '@components/context/conventions/conventions'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { IFieldProvider } from '../field.provider.types'

export const createManyFromConfiguration = function <T>(
    this: IFieldProvider<T>,
    configuration: IDependencyConfiguration[]
): T[] {
    const outputFields: T[] = []
    for (const cfg of configuration) {
        const input = this.createFromConfiguration(
            cfg,
            conventions.formular.creation.enforceConfigurationCheck
        )
        if (!input) {
            throw new Error(`Fields from configuration cannot be created`)
        }
        outputFields.push(input)
    }
    return outputFields
}
