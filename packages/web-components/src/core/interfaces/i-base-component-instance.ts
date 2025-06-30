/**
 * @fileoverview Base component instance interface
 * Following CONTRIBUTING.md: One interface per file with I prefix
 */

import { IWebComponentManagers } from '../../managers'
import { TemplateResult } from '../../template'
import { ComponentLifecycleEnum } from '../enums/component-lifecycle.enum'
import { IComponentConfig } from './i-component-config'
import { IPropertyConfig } from './i-property-config'

/**
 * Base component instance interface extending HTMLElement
 */
export interface IBaseComponentInstance extends HTMLElement {
    /** Component configuration */
    readonly config: IComponentConfig
    
    /** Reactive property definitions */
    readonly properties: Record<string, IPropertyConfig>
    
    /** Manager instances for this component */
    managers: IWebComponentManagers
    
    /** Component's unique identifier */
    componentId: string
    
    /** Current template cache */
    templateCache: HTMLTemplateElement | null
    
    /** Property values storage */
    propertyValues: Map<string, any>
    
    /** Component lifecycle state */
    lifecycleState: ComponentLifecycleEnum
    
    /** Render scheduled flag */
    renderScheduled: boolean
    
    // Lifecycle methods
    connectedCallback(): void
    disconnectedCallback(): void
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void
    
    // Component methods
    initializeComponent(): void
    initializeProperties(properties: Record<string, IPropertyConfig>): void
    setProperty(propName: string, value: any, config: IPropertyConfig): void
    convertType(value: any, type: string): any
    syncAttributeToProperty(attrName: string, propName: string, config: IPropertyConfig): void
    scheduleRender(): void
    performRender(): void
    updateDOM(templateResult: TemplateResult): void
    render(): TemplateResult | null
    
    // Lifecycle hooks
    onConnected(): void
    onDisconnected(): void
    onAttributeChanged(name: string, oldValue: string | null, newValue: string | null): void
    onRendered(): void
    
    // Utility methods
    getComponentState(): any
    createEvent(type: string, detail?: any, options?: EventInit): CustomEvent
}
