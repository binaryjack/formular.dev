/**
 * FORMULAR - Service Manager Setup Options Interface
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Configuration interface for customizing Service Manager DI setup
 */

import { IServiceManager } from '../service-manager.types'

/**
 * Options for configuring a service manager instance during creation.
 * Allows consumers to control which features and services are included.
 */
export interface IServiceManagerSetupOptions {
    /** Include core managers (Configuration, Validation, etc.) */
    includeCoreManagers?: boolean

    /** Include formular manager */
    includeFormularManager?: boolean

    /** Include input classes and factories */
    includeInputEngine?: boolean

    /** Include base field configurations */
    includeBaseConfigurations?: boolean

    /** Custom setup functions to run after standard setup */
    customSetup?: Array<(sm: IServiceManager) => void>

    /** Parent service manager for hierarchical DI */
    parent?: IServiceManager

    /** Skip development-time validation (default: false) */
    skipValidation?: boolean
}
