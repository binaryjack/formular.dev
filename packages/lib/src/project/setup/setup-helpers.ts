/**
 * FORMULAR - Setup Helpers for Common Scenarios
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Helper functions for common service manager setup scenarios
 */

import { IServiceManagerSetupOptions } from '../../core/managers/service-manager/factory/i-service-manager-setup-options'
import { ServiceManagerFactory } from '../../core/managers/service-manager/factory/service-manager-factory'
import { IServiceManager } from '../../core/managers/service-manager/service-manager.types'

/**
 * Helper functions for common setup scenarios.
 * Provides convenient methods for creating service managers with predefined configurations.
 */
export const SetupHelpers = {
    /**
     * Creates a service manager for form applications with all features enabled.
     * This is the most common setup for applications using FORMULAR.
     *
     * @param options - Optional additional configuration options
     * @returns A fully configured service manager for form applications
     */
    forFormApplication(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: true,
            includeInputEngine: true,
            includeBaseConfigurations: true,
            ...options
        })
    },

    /**
     * Creates a minimal service manager for custom implementations.
     * Only includes core managers, allowing consumers to build their own setup.
     *
     * @param options - Optional additional configuration options
     * @returns A minimal service manager with only core features
     */
    forCustomImplementation(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: false,
            includeInputEngine: false,
            includeBaseConfigurations: false,
            ...options
        })
    },

    /**
     * Creates a service manager optimized for testing environments.
     * Includes all features but may have different validation settings.
     *
     * @param options - Optional additional configuration options
     * @returns A service manager configured for testing
     */
    forTesting(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: true,
            includeInputEngine: true,
            includeBaseConfigurations: true,
            skipValidation: false, // Keep validation in tests to catch issues
            ...options
        })
    },

    /**
     * Creates a service manager with only core managers.
     * Useful for lightweight applications or when building custom solutions.
     *
     * @param options - Optional additional configuration options
     * @returns A service manager with only core managers
     */
    coreOnly(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: false,
            includeInputEngine: false,
            includeBaseConfigurations: false,
            ...options
        })
    },

    /**
     * Creates a service manager for input-focused applications.
     * Includes core managers and input engine but excludes formular manager.
     *
     * @param options - Optional additional configuration options
     * @returns A service manager optimized for input handling
     */
    forInputEngine(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: false,
            includeInputEngine: true,
            includeBaseConfigurations: true,
            ...options
        })
    },

    /**
     * Creates a service manager for configuration-only scenarios.
     * Includes core managers and configurations but excludes complex features.
     *
     * @param options - Optional additional configuration options
     * @returns A service manager for configuration-focused applications
     */
    forConfiguration(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: false,
            includeInputEngine: false,
            includeBaseConfigurations: true,
            ...options
        })
    }
}
