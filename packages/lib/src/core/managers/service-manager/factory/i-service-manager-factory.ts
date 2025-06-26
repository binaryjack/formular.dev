/**
 * FORMULAR - Service Manager Factory Interface
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Factory interface for creating configurable service manager instances
 */

import { IServiceManager } from '../service-manager.types'
import { IServiceManagerSetupOptions } from './i-service-manager-setup-options'

/**
 * Factory interface for creating service manager instances with different configurations.
 * Provides methods for common setup scenarios and custom configurations.
 */
export interface IServiceManagerFactory {
    /**
     * Creates a new service manager instance with specified features
     * @param options - Configuration options for the service manager
     * @returns A configured service manager instance
     */
    create(options?: IServiceManagerSetupOptions): IServiceManager

    /**
     * Creates a minimal service manager (just the container)
     * @param parent - Optional parent service manager for hierarchical DI
     * @returns A minimal service manager instance
     */
    createMinimal(parent?: IServiceManager): IServiceManager

    /**
     * Creates a fully configured service manager with all features
     * @param parent - Optional parent service manager for hierarchical DI
     * @returns A fully configured service manager instance
     */
    createFull(parent?: IServiceManager): IServiceManager

    /**
     * Creates a scoped service manager from an existing one
     * @param parent - Parent service manager to create scope from
     * @returns A scoped service manager instance
     */
    createScope(parent: IServiceManager): IServiceManager
}
