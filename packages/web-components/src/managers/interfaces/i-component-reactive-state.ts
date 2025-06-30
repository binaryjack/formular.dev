import { IComputedProperty } from './i-computed-property'
import { IReactivePropertyConfig } from './i-reactive-property-config'

/**
 * Component reactive state interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IComponentReactiveState {
    componentId: string
    element: HTMLElement
    properties: Map<string, IReactivePropertyConfig>
    computed: Map<string, IComputedProperty>
    batchedUpdates: Set<string>
    isUpdating: boolean
    updateQueue: Promise<void> | null
}
