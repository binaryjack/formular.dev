/**
 * FORMULAR - Conventions Configuration Presets
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Centralized conventions configuration presets following the ValidationConfigPresets pattern
 * This replaces hardcoded values in conventions.ts with configurable presets
 */

import { DateFormatsEnum } from '@core/framework/types/date/date.types'
import { getSystemDateSeparator } from '@core/framework/types/date/getters/get-local-system-separator'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

/**
 * Conventions configuration presets interface
 * Provides easy access to preconfigured convention settings
 */
export interface IConventionsConfigPresets {
    /**
     * Event trigger delay presets (in milliseconds)
     */
    eventTriggers: {
        immediate: number
        fast: number
        normal: number
        slow: number
        default: () => number
    }

    /**
     * UI update trigger delay presets
     */
    uiTriggers: {
        immediate: number
        fast: number
        normal: number
        slow: number
        default: () => number
    }

    /**
     * Observable trigger delay presets
     */
    observableTriggers: {
        immediate: number
        fast: number
        normal: number
        slow: number
        default: () => number
    }

    /**
     * Component dimension presets
     */
    components: {
        drawer: {
            small: { height: string; width: string }
            medium: { height: string; width: string }
            large: { height: string; width: string }
            default: () => { height: string; width: string }
        }
        button: {
            small: { width: string; height: string }
            medium: { width: string; height: string }
            large: { width: string; height: string }
            default: () => { width: string; height: string }
        }
    }

    /**
     * Data type formatting presets
     */
    dataTypes: {
        date: {
            separators: {
                slash: string // /
                dash: string // -
                dot: string // .
                system: () => string
                default: () => string
            }
            formats: {
                iso: DateFormatsEnum
                us: DateFormatsEnum
                eu: DateFormatsEnum
                display: () => DateFormatsEnum
                value: () => DateFormatsEnum
                forLocale: (locale: string) => DateFormatsEnum
            }
        }
    }

    /**
     * UI element convention presets
     */
    uiConventions: {
        suffixes: {
            labelId: string
            describedById: string
            errorId: string
            helpId: string
        }
        tokens: {
            validation: {
                primary: string
                secondary: string
                placeholder: string
            }
            custom: (tokenName: string) => string
        }
    }

    /**
     * Form creation convention presets
     */
    formular: {
        creation: {
            strict: { enforceConfigurationCheck: boolean }
            lenient: { enforceConfigurationCheck: boolean }
            default: () => { enforceConfigurationCheck: boolean }
        }
    }

    /**
     * Environment-specific convention profiles
     */
    profiles: {
        /**
         * Development environment conventions
         * Slower triggers for debugging, strict validation
         */
        developmentProfile: () => {
            eventTriggers: number
            uiTriggers: number
            observableTriggers: number
            formularCreation: { enforceConfigurationCheck: boolean }
            components: {
                drawer: { height: string; width: string }
                button: { width: string; height: string }
            }
        }

        /**
         * Production environment conventions
         * Faster triggers for performance, optimized settings
         */
        productionProfile: () => {
            eventTriggers: number
            uiTriggers: number
            observableTriggers: number
            formularCreation: { enforceConfigurationCheck: boolean }
            components: {
                drawer: { height: string; width: string }
                button: { width: string; height: string }
            }
        }

        /**
         * Accessibility-enhanced conventions
         * Longer delays for accessibility, larger components
         */
        accessibilityProfile: () => {
            eventTriggers: number
            uiTriggers: number
            observableTriggers: number
            formularCreation: { enforceConfigurationCheck: boolean }
            components: {
                drawer: { height: string; width: string }
                button: { width: string; height: string }
            }
        }

        /**
         * Performance-optimized conventions
         * Minimal delays, optimized for speed
         */
        performanceProfile: () => {
            eventTriggers: number
            uiTriggers: number
            observableTriggers: number
            formularCreation: { enforceConfigurationCheck: boolean }
            components: {
                drawer: { height: string; width: string }
                button: { width: string; height: string }
            }
        }
    }

    /**
     * Custom conventions
     */
    custom: {
        createProfile: (options: {
            eventTriggers?: number
            uiTriggers?: number
            observableTriggers?: number
            drawerSize?: 'small' | 'medium' | 'large'
            buttonSize?: 'small' | 'medium' | 'large'
            enforceConfigurationCheck?: boolean
        }) => {
            eventTriggers: number
            uiTriggers: number
            observableTriggers: number
            formularCreation: { enforceConfigurationCheck: boolean }
            components: {
                drawer: { height: string; width: string }
                button: { width: string; height: string }
            }
        }
    }
}

export const SConventionsConfigPresets = Symbol.for('IConventionsConfigPresets')

/**
 * ConventionsConfigPresets implementation
 * Provides easy access to convention configuration following the ValidationConfigPresets pattern
 */
export const ConventionsConfigPresets = function (
    this: IConventionsConfigPresets,
    sm: IServiceManager
): IConventionsConfigPresets {
    if (!sm) {
        throw new Error('ServiceManager is required for ConventionsConfigPresets')
    }

    // Static presets based on current conventions.ts values
    this.eventTriggers = {
        immediate: 0,
        fast: 200,
        normal: 500, // Current default from conventions.ts
        slow: 1000,
        default: () => this.eventTriggers.normal
    }

    this.uiTriggers = {
        immediate: 0,
        fast: 100,
        normal: 200, // Current default from conventions.ts
        slow: 500,
        default: () => this.uiTriggers.normal
    }

    this.observableTriggers = {
        immediate: 0,
        fast: 100,
        normal: 200, // Current default from conventions.ts
        slow: 500,
        default: () => this.observableTriggers.normal
    }

    this.components = {
        drawer: {
            small: { height: '250px', width: '200px' },
            medium: { height: '350px', width: '250px' }, // Current default from conventions.ts
            large: { height: '500px', width: '400px' },
            default: () => this.components.drawer.medium
        },
        button: {
            small: { width: '1.2em', height: '1.2em' },
            medium: { width: '1.8em', height: '1.8em' }, // Current default from conventions.ts
            large: { width: '2.5em', height: '2.5em' },
            default: () => this.components.button.medium
        }
    }

    this.dataTypes = {
        date: {
            separators: {
                slash: '/',
                dash: '-',
                dot: '.',
                system: () => getSystemDateSeparator(),
                default: () => this.dataTypes.date.separators.system()
            },
            formats: {
                iso: DateFormatsEnum.YYYY_MM_DD,
                us: DateFormatsEnum.MM_DD_YYYY,
                eu: DateFormatsEnum.DD_MM_YYYY,
                display: () => DateFormatsEnum.DD_MM_YYYY, // Current default from conventions.ts
                value: () => DateFormatsEnum.YYYY_MM_DD, // Current default from conventions.ts
                forLocale: (locale: string) => {
                    switch (locale.toLowerCase()) {
                        case 'us':
                        case 'en-us':
                            return DateFormatsEnum.MM_DD_YYYY
                        case 'iso':
                        case 'en-iso':
                            return DateFormatsEnum.YYYY_MM_DD
                        default:
                            return DateFormatsEnum.DD_MM_YYYY
                    }
                }
            }
        }
    }

    this.uiConventions = {
        suffixes: {
            labelId: '-label', // Current value from conventions.ts
            describedById: '-describedby', // Current value from conventions.ts
            errorId: '-error', // Extended
            helpId: '-help' // Extended
        },
        tokens: {
            validation: {
                primary: '|data|', // Current value from conventions.ts
                secondary: '|data2|', // Current value from conventions.ts
                placeholder: '|placeholder|' // Extended
            },
            custom: (tokenName: string) => `|${tokenName}|`
        }
    }

    this.formular = {
        creation: {
            strict: { enforceConfigurationCheck: true }, // Current value from conventions.ts
            lenient: { enforceConfigurationCheck: false },
            default: () => this.formular.creation.strict
        }
    }

    // Environment profiles
    this.profiles = {
        developmentProfile: () => ({
            eventTriggers: this.eventTriggers.slow, // 1000ms for debugging
            uiTriggers: this.uiTriggers.normal, // 200ms
            observableTriggers: this.observableTriggers.normal, // 200ms
            formularCreation: this.formular.creation.strict,
            components: {
                drawer: this.components.drawer.large, // Larger for debugging
                button: this.components.button.large // Larger for debugging
            }
        }),

        productionProfile: () => ({
            eventTriggers: this.eventTriggers.fast, // 200ms for performance
            uiTriggers: this.uiTriggers.fast, // 100ms
            observableTriggers: this.observableTriggers.fast, // 100ms
            formularCreation: this.formular.creation.lenient,
            components: {
                drawer: this.components.drawer.medium,
                button: this.components.button.medium
            }
        }),

        accessibilityProfile: () => ({
            eventTriggers: this.eventTriggers.slow, // 1000ms for accessibility
            uiTriggers: this.uiTriggers.slow, // 500ms
            observableTriggers: this.observableTriggers.slow, // 500ms
            formularCreation: this.formular.creation.strict,
            components: {
                drawer: this.components.drawer.large, // Larger for accessibility
                button: this.components.button.large // Larger for accessibility
            }
        }),

        performanceProfile: () => ({
            eventTriggers: this.eventTriggers.immediate, // 0ms for maximum performance
            uiTriggers: this.uiTriggers.immediate, // 0ms
            observableTriggers: this.observableTriggers.immediate, // 0ms
            formularCreation: this.formular.creation.lenient,
            components: {
                drawer: this.components.drawer.small, // Smaller for performance
                button: this.components.button.small // Smaller for performance
            }
        })
    }

    this.custom = {
        createProfile: (options) => ({
            eventTriggers: options.eventTriggers ?? this.eventTriggers.default(),
            uiTriggers: options.uiTriggers ?? this.uiTriggers.default(),
            observableTriggers: options.observableTriggers ?? this.observableTriggers.default(),
            formularCreation: {
                enforceConfigurationCheck:
                    options.enforceConfigurationCheck ??
                    this.formular.creation.default().enforceConfigurationCheck
            },
            components: {
                drawer: options.drawerSize
                    ? this.components.drawer[options.drawerSize]
                    : this.components.drawer.default(),
                button: options.buttonSize
                    ? this.components.button[options.buttonSize]
                    : this.components.button.default()
            }
        })
    }

    return this
} as any as IConventionsConfigPresets

/**
 * Registers ConventionsConfigPresets with the IoC container
 */
export const registerConventionsConfigPresets = function (sm: IServiceManager): void {
    if (!sm.isRegistered(SConventionsConfigPresets)) {
        sm.register(
            SConventionsConfigPresets,
            (container: IServiceManager) => {
                return new (ConventionsConfigPresets as any)(container)
            },
            {
                lifetime: 'singleton'
            }
        )
    }
}

/**
 * Factory function for creating ConventionsConfigPresets
 * This follows the same pattern as ValidationConfigPresets
 */
export const getConventionsConfigPresets = function (
    sm: IServiceManager
): IConventionsConfigPresets {
    if (!sm.isRegistered(SConventionsConfigPresets)) {
        registerConventionsConfigPresets(sm)
    }
    return sm.resolve<IConventionsConfigPresets>(SConventionsConfigPresets)
}
