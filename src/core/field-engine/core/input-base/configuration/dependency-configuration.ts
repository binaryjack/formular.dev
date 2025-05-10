import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'
import { logManager } from '@core/managers/log-manager/log-manager'

export interface IDependencyConfiguration {
    new (
        initialization?: IFieldInitializationParameters,
        dependencies?: IInitializableDependency[]
    ): IDependencyConfiguration
    initialization?: IFieldInitializationParameters
    dependencies?: IInitializableDependency[]
    getDependency: <T extends IInitializableDependency>(name: string) => T | undefined
    addDependency: <T extends IInitializableDependency>(dependency: T) => void
    verify: () => boolean
}

export const getDependency = function <T extends IInitializableDependency>(
    this: IDependencyConfiguration,
    name: string
) {
    try {
        return this.dependencies?.find((o) => o.dependencyName === name) as T
    } catch (e: any) {
        logManager(
            undefined,
            'error',
            DependencyConfiguration.name,
            `Unable to locate the dependency: ${name}. Have you added it to the configuration before ? : ${e.message} `
        )
    }
}

export const addDependency = function <T extends IInitializableDependency>(
    this: IDependencyConfiguration,
    dependency: T
) {
    this.dependencies ??= []
    const index = this.dependencies.findIndex((o) => o.dependencyName === dependency.dependencyName)
    if (index > -1) {
        this.dependencies[index] = dependency
    } else {
        this.dependencies.push(dependency)
    }
}

export const verify = function (this: IDependencyConfiguration) {
    const numericItems =
        (this.initialization?.validationStrategies?.length ?? 0) +
        (this.initialization?.trackingStrategies?.length ?? 0) +
        (this.initialization?.valueStrategies?.length ?? 0)

    if (numericItems === 0) {
        throw Error(
            `Constructor must have a configuration set:
            Mandatory instances:
            ${!this.initialization?.notifierInstance ? '- The notifier instance' : ''}
            ${!this.initialization?.descriptor ? '-  The field descriptor' : ''}
            ${numericItems > 0 ? 'At least one of each following' : ''}
            ${this.initialization?.validationStrategies?.length === 0 ? '- validationStrategies' : ''}
            ${this.initialization?.trackingStrategies?.length === 0 ? '- validationStrategies' : ''}
            ${this.initialization?.valueStrategies?.length === 0 ? '- validationStrategies' : ''}
            `
        )
    }
    if (!this.initialization?.descriptor) {
        throw Error(`unable to instanciate constructor. Please provide a descriptor or an instance`)
    }
    if (this.dependencies?.length === 0) {
        throw Error(
            `You probably need some dependencies to make fields to be properly working. Please provide a dependencie's instances
           Mandatory instances:
            - Dommable
            - Drawerable
            - StyleManager
            - Notifier

            At least one of each
            - Tracker
            - ValidationStrategy 
            - ValueStrategy
            `
        )
    }
    return true
}

export const DependencyConfiguration = function (
    this: IDependencyConfiguration,
    initialization?: IFieldInitializationParameters,
    dependencies?: IInitializableDependency[]
) {
    this.getDependency = getDependency
    this.initialization = initialization
    this.dependencies = dependencies
    this.addDependency = addDependency
    this.verify = verify
} as any as IDependencyConfiguration
