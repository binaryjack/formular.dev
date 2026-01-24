/**
 * Public interfaces for the formular.dev.lib library
 *
 * This file centralizes all interface type exports from the formular.dev.lib library,
 * providing a single entry point for TypeScript type definitions used throughout
 * the application. These interfaces define the contracts for dependency injection,
 * service management, validation, input handling, and configuration.
 *
 * Organization:
 * - CORE MANAGERS: Manager service interfaces
 * - INPUT ENGINE: Input field and form interfaces
 * - VALIDATION: Validation system interfaces
 * - CONFIGURATION: Configuration and setup interfaces
 * - SERVICE MANAGEMENT: Dependency injection interfaces
 * - FRAMEWORK: Core framework interfaces
 * - UTILITIES: Helper and utility interfaces
 *
 * Usage Example:
 * ```typescript
 * import type { IConfigurationManager, IFormularManager } from 'formular.dev.lib'
 *
 * const configManager: IConfigurationManager = serviceManager.getService(SConfigurationManager)
 * ```
 *
 * @since 1.0.0
 * @author Formular.dev Team
 */

// =============================================
// CORE MANAGERS
// =============================================

// Configuration Manager
export type { ICommand } from './core/managers/configuration-manager/interfaces/i-command'
export type { IConfiguration } from './core/managers/configuration-manager/interfaces/i-configuration'
export type { IConfigurationManager } from './core/managers/configuration-manager/interfaces/i-configuration-manager'
export type { ICulture } from './core/managers/configuration-manager/interfaces/i-culture'
export type { IEventTrigger } from './core/managers/configuration-manager/interfaces/i-event-trigger'
export type { IFormBehavior } from './core/managers/configuration-manager/interfaces/i-form-behavior'
export type { IRendering } from './core/managers/configuration-manager/interfaces/i-rendering'
export type { IReplacementToken } from './core/managers/configuration-manager/interfaces/i-replacement-token'
export type { ISuffix } from './core/managers/configuration-manager/interfaces/i-suffix'
export type { IValidationPattern } from './core/managers/configuration-manager/interfaces/i-validation-pattern'

// Formular Manager
export type { IFormularManager } from './core/managers/formular-manager/formular-manager.types'

// Value Manager
export type {
    IParserStrategy,
    IValueManager,
    IValueManagerProperties
} from './core/managers/value-manager/value-manager.types'

// Validation Manager
export type { IValidationConstraintBuilder } from './core/managers/validation-manager/constraint-builder/interfaces/i-validation-constraint-builder'
export type { ValidationConstraintConfig } from './core/managers/validation-manager/constraint-builder/validation-constraint-factory'
export type { IGenericValidationBuilder } from './core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
export type { IValidationBase } from './core/managers/validation-manager/interfaces/i-validation-base'
export type { IValidationManager } from './core/managers/validation-manager/interfaces/i-validation-manager'
export type { IValidationMethodStrategy } from './core/managers/validation-manager/interfaces/i-validation-method-strategy'
export type { IValidationOptions } from './core/managers/validation-manager/interfaces/i-validation-options'
export type { IValidationResult } from './core/managers/validation-manager/interfaces/i-validation-result'
export type { IValidationResults } from './core/managers/validation-manager/interfaces/i-validation-results'

// Validation Specific Interfaces
export type { IDoValidate } from './core/managers/validation-manager/interfaces/i-do-validate'
export type { IDoValidateAll } from './core/managers/validation-manager/interfaces/i-do-validate-all'
export type { IMax } from './core/managers/validation-manager/interfaces/i-max'
export type { IMaxLength } from './core/managers/validation-manager/interfaces/i-max-length'
export type { IMin } from './core/managers/validation-manager/interfaces/i-min'
export type { IMinLength } from './core/managers/validation-manager/interfaces/i-min-length'
export type { IPattern } from './core/managers/validation-manager/interfaces/i-pattern'
export type { IRequired } from './core/managers/validation-manager/interfaces/i-required'
export type { IValidableForm } from './core/managers/validation-manager/interfaces/i-validable-form'

// Service Manager
export type { IAbstractServiceBase } from './core/managers/service-manager/abstract-service-base/abstract-service-base'
export type { ILazyDependencyProxy } from './core/managers/service-manager/prototype/register-proxy/getter'
export type { IServiceLocator } from './core/managers/service-manager/service-locator/service-locator'
export type {
    IDisposableService,
    IServiceDescriptor,
    IServiceManager,
    IServiceOptions
} from './core/managers/service-manager/service-manager.types'

// Notification Manager
export type { IBatchConfig } from './core/managers/notification-manager/interfaces/i-batch-config'
export type { INotification } from './core/managers/notification-manager/interfaces/i-notification'
export type { IPriorityNotification } from './core/managers/notification-manager/interfaces/i-priority-notification'
export type { INotificationManager } from './core/managers/notification-manager/notification-manager-base.types'

// DOM Manager
export type { IAria, IDomManagerBase } from './core/managers/dom-manager/dom-manager.types'

// Style Manager
export type {
    IFieldStateFlags,
    IFieldStyleProperties,
    IStyleManager
} from './core/managers/style-manager/style-manager.types'

// Tracking Manager
export type {
    ITrackingData,
    ITrackingManager,
    ITrackingOutputProvider
} from './core/managers/tracking-manager/tracker-manager.types'

// Initialization Manager
export type { IInitializationDelegate } from './core/managers/initialization-manager/delegates/initialization-delegate'
export type {
    IInitializableDependency,
    IInitializationManager
} from './core/managers/initialization-manager/initialization-manager.types'

// =============================================
// INPUT ENGINE
// =============================================

// Base Input Types
export type {
    IExtendedInput,
    IExtendedInputBase,
    IInput,
    IInputBase
} from './core/input-engine/core/input-base/input-base.types'

// Input Variants
export type {
    ICheckBoxBaseInput,
    ICheckBoxBaseInputProperties
} from './core/input-engine/variants/check-box-base/check-box-base-input.types'
export type {
    IClickBaseInput,
    IClickBaseInputProperties
} from './core/input-engine/variants/click-base/click-base-input.types'
export type {
    IDrawerBaseInput,
    IDrawerBaseInputProperties
} from './core/input-engine/variants/drawer-base/drawer-base-input.types'
export type { IMaskedBaseInput } from './core/input-engine/variants/masked-base/masked-base-input.types'
export type { INumericBaseInput } from './core/input-engine/variants/numeric-base/numeric-base-input.types'
export type {
    IOptionBaseInput,
    IOptionBaseInputProperties
} from './core/input-engine/variants/option-based/option-base-input.types'
export type {
    IRadioBaseInput,
    IRadioBaseInputProperties
} from './core/input-engine/variants/radio-base/radio-base-input.types'
export type {
    ISelectBaseInput,
    ISelectBaseInputProperties
} from './core/input-engine/variants/select-base/select-base-input.types'
export type { ITextBaseInput } from './core/input-engine/variants/text-base/text-base-input.types'

// =============================================
// FORMULAR ENGINE
// =============================================

// Formular Base
export type {
    IFieldChange,
    IFormularBase,
    IFormularFlags
} from './core/formular-engine/formular-base/formular-base.types'

// =============================================
// FACTORIES & SERVICES
// =============================================

// Input Factory
export type { IInputFactory } from './core/factories/input-factory/input-factory'

// =============================================
// PROJECT SERVICES
// =============================================

// Strategy Services
export type { ITrackingStrategyService } from './setup/services/tracking-strategy-service'
export type { IValidationStrategyService } from './setup/services/validation-strategy-service'
export type { IValidationTriggerService } from './setup/services/validation-trigger-service'
export type { IValueStrategyService } from './setup/services/value-strategy-service'

// Other Setup Services
export type { IFieldDescriptorService } from './setup/services/field-descriptor-service'

// =============================================
// PROVIDERS & DESCRIPTORS
// =============================================

// Configuration Providers
export type { IInputConfigProvider } from './setup/providers/configuration/input-configuration/input-config-provider'
export type { IInputConfiguration } from './setup/providers/interfaces/i-input-configuration'

// Field Descriptors
export type { IFieldDescriptor } from './core/framework/schema/descriptor/field.descriptor'

// =============================================
// FRAMEWORK CORE
// =============================================

// Schema Types
export type { IFieldSchemeFactory } from './core/framework/schema/field-schema-factory/field-schema-factory.types'
export type {
    IAppSchemeToObjectAction,
    IApplicationScheme,
    IEntityScheme,
    IFieldSchema,
    IFieldSchemaBuilder
} from './core/framework/schema/field-schema/field-schema-types'
export type { IOptionItem } from './core/framework/schema/option-schema/options.scheme.types'

// Common Types
export type { ToggleableStateType } from './core/framework/common/common.toggleable'

// Date Types
export type { IDateObjectMethods } from './core/framework/types/date/date-object.models'
export type { IDateObject } from './core/framework/types/date/i-date-object'
export type { INDate } from './core/framework/types/date/i-n-date'

// Error Types
export type { IApiError } from './core/framework/models/errors/i-api-error'
export type { IErrors } from './core/framework/models/errors/i-errors'
export type { IFieldError } from './core/framework/models/errors/i-field-error'
export type { IFieldGuide } from './core/framework/models/errors/i-field-guide'
export type { IGeneralError } from './core/framework/models/errors/i-general-error'

// Localization
export type { ILocalize, IValidationLocalize } from './core/framework/localize/localize.type'

// Utilities
export type { ILatestCall } from './core/framework/optimization/latest-calls/global'
export type { IIfClass } from './core/framework/utility/interfaces/i-if-class'

// =============================================
// OBSERVERS
// =============================================

export type { IObservableSubject } from './core/observers/observable-subject/observable-subject.types'

// =============================================
// INTERFACE DOCUMENTATION
// =============================================

/**
 * Interface Registry & Usage Guide
 *
 * This section provides comprehensive documentation for all exported interfaces,
 * their purposes, and usage examples.
 *
 * ### Core Architecture
 * The formular.dev.lib library uses TypeScript interfaces to define contracts
 * between different parts of the system. These interfaces ensure type safety
 * and provide clear API documentation.
 *
 * ### Usage Patterns
 *
 * #### 1. Service Implementation
 * ```typescript
 * import type { IConfigurationManager } from 'formular.dev.lib'
 *
 * class MyConfigurationManager implements IConfigurationManager {
 *     // Implement interface methods...
 * }
 * ```
 *
 * #### 2. Type Annotations
 * ```typescript
 * import type { IFormularManager, IValidationOptions } from 'formular.dev.lib'
 *
 * function processForm(manager: IFormularManager, options: IValidationOptions) {
 *     // Process form with type safety...
 * }
 * ```
 *
 * #### 3. Generic Types
 * ```typescript
 * import type { IFormularBase, IInputBase } from 'formular.dev.lib'
 *
 * function createForm<T extends object>(data: T): IFormularBase<T> {
 *     // Create form with generic type safety...
 * }
 * ```
 *
 * ### Interface Categories
 *
 * #### CORE MANAGERS
 * Essential service interfaces for business logic:
 * - `IConfigurationManager`: Configuration management contract
 * - `IFormularManager`: Form lifecycle management
 * - `IValueManager`: Value parsing and serialization
 * - `IValidationManager`: Validation system contract
 * - `IServiceManager`: Dependency injection interface
 * - `INotificationManager`: Event notification system
 * - `IStyleManager`: CSS styling management
 * - `ITrackingManager`: User interaction tracking
 *
 * #### INPUT ENGINE
 * Input field contracts and base implementations:
 * - `IInputBase`: Base input field interface
 * - `IExtendedInput`: Extended input functionality
 * - Input variant interfaces (Text, Select, Radio, etc.)
 * - Input property interfaces for configuration
 *
 * #### VALIDATION
 * Validation system interfaces:
 * - `IValidationManager`: Core validation interface
 * - `IValidationOptions`: Validation configuration
 * - `IValidationResult`: Single validation result
 * - `IValidationResults`: Collection of validation results
 * - Specific validation interfaces (Required, Min, Max, etc.)
 *
 * #### CONFIGURATION
 * Configuration and setup interfaces:
 * - `IConfiguration`: Application configuration
 * - `IInputConfiguration`: Input-specific configuration
 * - Culture and localization interfaces
 * - Rendering and behavior interfaces
 *
 * #### SERVICE MANAGEMENT
 * Dependency injection interfaces:
 * - `IServiceManager`: Core DI container interface
 * - `IServiceDescriptor`: Service registration metadata
 * - `IAbstractServiceBase`: Base service interface
 * - Lazy loading and proxy interfaces
 *
 * #### FRAMEWORK
 * Core framework interfaces:
 * - `IOptionItem`: Option list items
 * - `IFieldSchema`: Field metadata schema
 * - `IFormularBase`: Base form interface
 * - Date, error, and utility interfaces
 *
 * ### Design Principles
 *
 * 1. **Single Responsibility**: Each interface has a clear, focused purpose
 * 2. **Composition over Inheritance**: Interfaces are composed together rather than
 *    using deep inheritance hierarchies
 * 3. **Immutability**: Data interfaces favor readonly properties where appropriate
 * 4. **Generic Support**: Interfaces use generics for type flexibility
 * 5. **Extension Points**: Interfaces provide clear extension mechanisms
 *
 * ### Type Safety Best Practices
 *
 * 1. **Use strict typing**: Always import interfaces as types using `import type`
 * 2. **Prefer readonly**: Use readonly properties for data that shouldn't change
 * 3. **Generic constraints**: Use proper generic constraints for flexibility
 * 4. **Union types**: Use union types for controlled value sets
 * 5. **Optional properties**: Mark optional properties with `?` operator
 *
 * ### Documentation Standards
 *
 * - All public interfaces include comprehensive JSDoc comments
 * - Method parameters and return types are clearly documented
 * - Usage examples are provided for complex interfaces
 * - Breaking changes are marked with version annotations
 * - Related interfaces are cross-referenced
 *
 * ### Versioning & Compatibility
 *
 * - Interfaces follow semantic versioning principles
 * - Breaking changes are introduced only in major versions
 * - Deprecated interfaces are marked and maintained for compatibility
 * - Migration guides are provided for interface changes
 *
 * ### Performance Considerations
 *
 * - Interfaces have no runtime cost in TypeScript
 * - Use interface merging sparingly to avoid confusion
 * - Prefer composition over complex inheritance chains
 * - Document performance implications of interface contracts
 *
 * @since 1.0.0
 * @author Formular.dev Team
 */
