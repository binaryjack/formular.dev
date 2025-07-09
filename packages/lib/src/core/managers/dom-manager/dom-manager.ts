import { IConfigurationManager, ISuffix } from '../configuration-manager'
import { SConfigurationManager } from '../configuration-manager/interfaces/i-configuration-manager'
import { IServiceManager } from '../types'
import { IDomManager } from './dom-manager.types'
/**
 * DomManager is a prototype-based manager for handling collections of DOM elements and their state.
 *
 * @template T - The type of HTMLElement managed.
 * @implements {IDomManager<T>}
 *
 * @property {T[]} elements - The managed DOM elements.
 * @property {any} tracker - Optional tracker for internal state or observers.
 * @property {boolean} isInitialized - Indicates if the manager has been initialized.
 * @property {string} dependencyName - The name of the dependency, set to 'DomManager'.
 *
 * Prototype methods (assigned below) provide operations for registration, state management, ARIA, and more.
 *
 * Example usage:
 *   const manager = new DomManager();
 *   manager.initialize();
 *   manager.dmRegister(element);
 */
import { dmAddArias } from './prototype/dm-add-arias'
import { dmAriaSet } from './prototype/dm-aria-set'
import { dmClear } from './prototype/dm-clear'
import { dmExists } from './prototype/dm-exists'
import { dmGet } from './prototype/dm-get'
import { dmRegister } from './prototype/dm-register'
import { dmRegisterById } from './prototype/dm-register-by-id'
import { dmSetChecked } from './prototype/dm-set-checked'
import { dmSetClass } from './prototype/dm-set-class'
import { dmSetEnabled } from './prototype/dm-set-enabled'
import { dmSetFocus } from './prototype/dm-set-focus'
import { dmSetSelected } from './prototype/dm-set-selected'
import { dmSetValue } from './prototype/dm-set-value'
import { dmUpdateAria } from './prototype/dm-update-aria'
import { extend } from './prototype/extend'
import { hasExtension } from './prototype/has-extension'
import { initialize } from './prototype/initialize'

/**
 * Constructs a new DomManager instance.
 *
 * @constructor
 * @template T - The type of HTMLElement managed.
 * @this {IDomManager<T>}
 */
/**
 * Manages a collection of DOM elements and provides lifecycle management for them.
 *
 * @template T - The type of HTMLElement managed by this instance.
 * @param this - The instance context implementing {@link IDomManager}.
 * @param serviceManager - The service manager used for dependency injection and service resolution.
 *
 * @remarks
 * - Initializes internal state, including the managed elements, tracker, and initialization flag.
 * - Defines a read-only `dependencyName` property for identification.
 *
 * @example
 * ```typescript
 * const manager = new DomManager<HTMLDivElement>(serviceManager);
 * ```
 */
export const DomManager = function <T extends HTMLElement>(
    this: IDomManager<T>,
    serviceManager: IServiceManager
) {
    /**
     *  The service manager used for dependency injection and service resolution.
     *  @type {IServiceManager}
     *  @remarks
     *  This manager is used to resole dependencies and services required by the DomManager.
     */
    this.serviceManager = serviceManager || null
    /**
     * The managed DOM elements.
     * @type {T[]}
     */
    this.elements = []
    /**
     * Optional tracker for internal state or observers.
     * @type {any}
     */
    this.tracker = null
    /**
     * Indicates if the manager has been initialized.
     * @type {boolean}
     */
    this.isInitialized = false

    const config = this.serviceManager?.lazy<IConfigurationManager>(SConfigurationManager)?.()
    const rawLabelId = config?.getConfigByName<ISuffix>('rendering', 'suffixes', 'labelId') ?? null
    const rawDescribedById =
        config?.getConfigByName<ISuffix>('rendering', 'suffixes', 'describedById') ?? null

    // Fix for configuration returning object instead of string

    Object.defineProperty(this, 'describedById', {
        value: rawDescribedById?.value ?? '-described-by',
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition,
        enumerable: true // Make it enumerable for iteration
    })

    Object.defineProperty(this, 'labelId', {
        value: rawLabelId?.value ?? '-label',
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition,
        enumerable: true
    })

    Object.defineProperty(this, 'dependencyName', {
        value: DomManager.name,
        writable: false, // Prevent modification
        configurable: false, // Prevent deletion or redefinition,
        enumerable: true
    })
} as any as IDomManager<any>

/**
 * Assigns prototype methods to DomManager for DOM operations, registration, ARIA, and state management.
 */
/**
 * Prototype methods are assigned from the following files:
 *
 * - ./prototype/initialize: Initializes the DomManager instance.
 * - ./prototype/dm-get: Retrieves a managed element.
 * - ./prototype/dm-exists: Checks if an element exists in the manager.
 * - ./prototype/dm-register: Registers a new element.
 * - ./prototype/dm-register-by-id: Registers an element by its ID.
 * - ./prototype/dm-set-focus: Sets focus on an element.
 * - ./prototype/dm-set-enabled: Enables or disables an element.
 * - ./prototype/dm-set-value: Sets the value of an element.
 * - ./prototype/dm-clear: Clears the state of the manager or elements.
 * - ./prototype/dm-set-checked: Sets the checked state of an element.
 * - ./prototype/dm-set-class: Sets the class of an element.
 * - ./prototype/dm-set-selected: Sets the selected state of an element.
 * - ./prototype/dm-add-arias: Adds ARIA attributes to elements.
 * - ./prototype/dm-aria-set: Sets a specific ARIA attribute.
 * - ./prototype/dm-update-aria: Updates ARIA attributes.
 * - ./prototype/extend: Adds extension methods to DomManager.
 * - ./prototype/has-extension: Checks for the existence of extension methods.
 */
Object.assign(DomManager.prototype, {
    initialize,
    dmGet,
    dmExists,
    dmRegister,
    dmRegisterById,
    dmSetFocus,
    dmSetEnabled,
    dmSetValue,
    dmClear,
    dmSetChecked,
    dmSetClass,
    dmSetSelected,
    dmAddArias,
    dmAriaSet,
    dmUpdateAria,
    extend,
    hasExtension
})
