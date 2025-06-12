import { IFormular } from '../../formular-engine/formular-base/formular-base.types';
import { IEntityScheme } from '../../framework/schema/field-schema/field.schema.types';
import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { INotificationManager } from '../notification-manager/notification-manager-base.types';
import { IServiceManager } from '../service-manager/service-manager.types';
export declare const SFormularManager: unique symbol;
/**
 * Central form management service that handles the creation and lifecycle of forms.
 *
 * The FormularManager is responsible for:
 * - Creating forms from various sources (schemas, descriptors, empty forms)
 * - Managing form instances and their lifecycle
 * - Providing access to form data and validation states
 * - Coordinating with the service container for dependency injection
 *
 * This is the primary entry point for form operations in the FORMULAR system.
 *
 * @example
 * ```typescript
 * // Create manager with dependencies
 * const formManager = new FormularManager(serviceManager);
 *
 * // Create form from schema
 * const userForm = formManager.createFromSchema<UserData>(userSchema);
 *
 * // Create form from field descriptors
 * const contactForm = formManager.createFromDescriptors<ContactData>('contact', fieldDescriptors);
 *
 * // Get form data
 * const userData = formManager.getData<UserData>('userForm');
 *
 * // Validate specific form
 * const isValid = await formManager.validate('userForm');
 * ```
 */
export interface IFormularManager {
    /**
     * Constructor for creating a new FormularManager instance
     * @param serviceManager - The IoC container for dependency resolution
     */
    new (serviceManager: IServiceManager): IFormularManager;
    /** Reference to the service manager for dependency injection */
    sm: IServiceManager;
    /** Map of all managed form instances, keyed by form ID */
    forms: Map<string, IFormular<any>>;
    /** Optional notification manager for form-level notifications */
    readonly notificationManager?: INotificationManager;
    /**
     * Removes a specific form from management
     * @param formId - The form instance to remove
     */
    clear: <T extends object>(formId: IFormular<T>) => void;
    /**
     * Removes all forms from management and cleans up resources
     */
    clearAll: () => void;
    /**
     * Retrieves a form instance by its ID
     * @param formId - Unique identifier of the form to retrieve
     * @returns The form instance or undefined if not found
     */
    getForm: (formId: string) => IFormular<any> | undefined;
    /**
     * Extracts the current data from a specific form
     * @param formId - ID of the form to get data from
     * @returns The form's current data as a typed object
     */
    getData: <T extends object>(formId: string) => T | undefined;
    /**
     * Validates a specific form and returns overall validity
     * @param formId - ID of the form to validate
     * @returns Promise resolving to true if form is valid
     */
    validate: (formId: string) => Promise<boolean>;
    /**
     * Creates a new form from an array of field descriptors
     *
     * @param id - Unique identifier for the new form
     * @param descriptor - Array of field descriptors defining the form structure
     * @returns The created form instance or undefined if creation failed
     *
     * @example
     * ```typescript
     * const fieldDescriptors: IFieldDescriptor[] = [
     *   { id: 1, name: 'username', type: 'text', ... },
     *   { id: 2, name: 'email', type: 'email', ... }
     * ];
     * const form = manager.createFromDescriptors<UserData>('user-form', fieldDescriptors);
     * ```
     */
    createFromDescriptors: <T extends object>(id: string, descriptor: IFieldDescriptor[]) => IFormular<T> | undefined;
    /**
     * Creates a new form from a field schema definition
     *
     * @param schema - Entity schema containing field definitions and validation rules
     * @returns The created form instance or undefined if creation failed
     *
     * @example
     * ```typescript
     * const userSchema: IEntityScheme = {
     *   name: 'user-form',
     *   properties: [
     *     new FieldSchemaBuilder().setName('username').setTypeInput('text').build(),
     *     new FieldSchemaBuilder().setName('email').setTypeInput('email').build()
     *   ]
     * };
     * const form = manager.createFromSchema<UserData>(userSchema);
     * ```
     */
    createFromSchema: <T extends object>(schema: IEntityScheme) => IFormular<T> | undefined;
    /**
     * Creates an empty form with no predefined fields
     *
     * Useful for dynamic forms where fields are added programmatically
     * based on runtime conditions or user interactions.
     *
     * @param name - Unique name for the empty form
     * @returns The created empty form instance
     *
     * @example
     * ```typescript
     * const dynamicForm = manager.createEmpty<DynamicData>('dynamic-form');
     * // Add fields dynamically later
     * dynamicForm.addFields(...dynamicFields);
     * ```
     */
    createEmpty: <T extends object>(name: string) => IFormular<T> | undefined;
}
