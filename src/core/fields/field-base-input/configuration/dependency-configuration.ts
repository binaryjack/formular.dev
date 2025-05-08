import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBaseInput, IInitializableDependency } from '../field-input-base-types'

export interface IDependencyConfiguration {
    new (
        field?: IFieldBaseInput,
        initialization?: IFieldInitializationParameters,
        dependencies?: IInitializableDependency[]
    ): IDependencyConfiguration
    initialization: IFieldInitializationParameters
    getDependency: <T extends IInitializableDependency>(name: string) => T | undefined
    field?: IFieldBaseInput
    dependencies?: IInitializableDependency[]
}

export const DependencyConfiguration = function (
    this: IDependencyConfiguration,
    field?: IFieldBaseInput,
    initialization?: IFieldInitializationParameters,
    dependencies?: IInitializableDependency[]
): IDependencyConfiguration {
    this.getDependency = function <T extends IInitializableDependency>(
        this: IDependencyConfiguration,
        name: string
    ) {
        try {
            return dependencies?.find((o) => o.dependencyName === name) as T
        } catch (e: any) {
            logManager(
                undefined,
                'error',
                DependencyConfiguration.name,
                `Unable to locate the dependency: ${name}. Have you added it to the configuration before ? : ${e.message} `
            )
        }
    }

    // const numericItems =
    //     (configuration?.validationStrategies?.length ?? 0) +
    //     (configuration?.trackingStrategies?.length ?? 0) +
    //     (configuration?.valueStrategies?.length ?? 0)
    // throw Error(
    //     `Constructor must have a configuration set:
    //         Mandatory instances:
    //         ${!configuration?.notifierInstance ? '- The notifier instance' : ''}
    //         ${!configuration?.descriptor ? '-  The field descriptor' : ''}
    //         ${numericItems > 0 ? 'At least one of each following' : ''}
    //         ${configuration?.validationStrategies?.length === 0 ? '- validationStrategies' : ''}
    //         ${configuration?.trackingStrategies?.length === 0 ? '- validationStrategies' : ''}
    //         ${configuration?.valueStrategies?.length === 0 ? '- validationStrategies' : ''}
    //         `

    // if (!configuration?.descriptor && !field) {
    //     throw Error(`unable to instanciate constructor. Please provide a descriptor or an instance`)
    // }
    return { field, initialization, dependencies } as IDependencyConfiguration
} as any as IDependencyConfiguration
