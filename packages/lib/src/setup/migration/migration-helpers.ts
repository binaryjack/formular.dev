/**
 * FORMULAR - Migration Utilities
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Utilities for migrating from global singleton to factory pattern
 */

import { IServiceManager } from '../../core/managers/service-manager/service-manager.types'
import { SetupHelpers } from '../core/setup-helpers'

/**
 * Migration utilities for helping consumers transition from the old global singleton
 * approach to the new factory-based approach.
 *
 * @deprecated This module is intended for migration purposes only.
 * Use ServiceManagerFactory and SetupHelpers directly in new code.
 */
export const MigrationHelpers = {
    /**
     * Creates a service manager that matches the old global singleton configuration.
     * This helps with migration by providing the same setup as the old system.
     *
     * @deprecated Use SetupHelpers.forFormApplication() instead
     * @returns A service manager configured like the old global singleton
     */
    createLegacyCompatibleServiceManager(): IServiceManager {
        console.warn(
            '⚠️ MigrationHelpers.createLegacyCompatibleServiceManager() is deprecated. ' +
                'Use SetupHelpers.forFormApplication() instead.'
        )
        return SetupHelpers.forFormApplication()
    },

    /**
     * Creates a service manager with the exact same setup as the old applifeCylceInstance.
     * This is intended to be a drop-in replacement during migration.
     *
     * @deprecated Use ServiceManagerFactory.create() with appropriate options instead
     * @returns A service manager with legacy configuration
     */
    createDropInReplacement(): IServiceManager {
        console.warn(
            '⚠️ MigrationHelpers.createDropInReplacement() is deprecated. ' +
                'Migrate to ServiceManagerFactory.create() with proper configuration.'
        )
        return SetupHelpers.forFormApplication({
            skipValidation: false // Keep development validation like the old system
        })
    }
}
