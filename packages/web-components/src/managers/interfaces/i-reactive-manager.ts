import { IBatchUpdateConfig } from './i-batch-update-config'
import { IComponentReactiveState } from './i-component-reactive-state'
import { IReactivePropertyConfig } from './i-reactive-property-config'

/**
 * ReactiveManager Type Interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IReactiveManager {
    isInitialized: boolean
    dependencyName: string
    components: Map<string, IComponentReactiveState>
    batchConfig: IBatchUpdateConfig
    initialize(): void
    createReactiveProperty(target: HTMLElement, property: string, config: IReactivePropertyConfig, componentId: string): void
    createComputed(componentId: string, property: string, dependencies: string[], computeFn: (...args: any[]) => any): void
    batchUpdate(componentId: string, updates: () => void): Promise<void>
    flushBatchUpdates(componentId: string): Promise<void>
    cleanupComponent(componentId: string): void
    getComponentState(componentId: string): IComponentReactiveState | undefined
    syncAttributeToProperty(componentId: string, attributeName: string, value: string | null): void
    syncPropertyToAttribute(componentId: string, propertyName: string, value: any): void
}
