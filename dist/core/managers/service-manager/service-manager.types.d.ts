export declare const SServiceManager: unique symbol;
export type ServiceLifeCycleType = 'singleton' | 'transient' | 'scoped';
export type ServiceIdType<T = any> = null | string | symbol | (new (...args: any[]) => T);
export type ServiceFactoryType<T = any> = (container: IServiceManager, ...parameters: any[]) => T;
/**
 * Descriptor interface for service registration in the IoC container.
 *
 * @template T - The type of service being described
 */
export interface IServiceDescriptor<T = any> {
    /** Unique identifier for the service (symbol, string, or constructor) */
    identifier: ServiceIdType<T>;
    /** Factory function that creates instances of the service */
    factory: ServiceFactoryType<T>;
    /** Lifecycle management strategy for the service */
    lifetime: ServiceLifeCycleType;
    /** Optional array of dependency identifiers that this service depends on */
    dependencies?: ServiceIdType[];
}
/**
 * Options interface for service registration.
 */
export interface IServiceOptions {
    /** Lifecycle management strategy (default: 'transient') */
    lifetime?: ServiceLifeCycleType;
    /** Dependencies required by this service */
    dependencies?: ServiceIdType[];
}
/**
 * Interface for services that require cleanup when disposed.
 *
 * Services implementing this interface will have their dispose method
 * called when the service container is disposed.
 */
export interface IDisposableService {
    /** Cleanup method called during service disposal */
    dispose(): void;
}
/**
 * Main interface for the dependency injection container.
 *
 * The ServiceManager provides comprehensive IoC functionality including:
 * - Service registration with different lifecycles (singleton, transient, scoped)
 * - Dependency resolution with circular dependency detection
 * - Lazy resolution for performance optimization
 * - Hierarchical containers with parent-child relationships
 * - Resource cleanup and disposal
 * - Development-time validation and debugging tools
 *
 * @example
 * ```typescript
 * // Create a service manager
 * const container = new ServiceManager();
 *
 * // Register services
 * container.registerClass(SUserService, UserService, {
 *   lifetime: 'singleton',
 *   dependencies: [SDataService, SLogService]
 * });
 *
 * // Resolve services
 * const userService = container.resolve<IUserService>(SUserService);
 *
 * // Lazy resolution for performance
 * const lazyUserService = container.lazy<IUserService>(SUserService);
 * const service = lazyUserService(); // Resolved only when called
 * ```
 */
export interface IServiceManager {
    /**
     * Constructor for creating a new ServiceManager instance
     * @param parent - Optional parent container for hierarchical IoC
     */
    new (parent?: IServiceManager): IServiceManager;
    /** Stack tracking current resolution chain for circular dependency detection */
    readonly resolutionStack: Set<ServiceIdType>;
    /** Map of all registered service descriptors */
    readonly services: Map<ServiceIdType, IServiceDescriptor>;
    /** Cache of singleton instances */
    readonly singletonInstances: Map<ServiceIdType, any>;
    /** Cache of scoped instances for the current scope */
    readonly scopedInstances: Map<ServiceIdType, any>;
    /** Optional parent container for hierarchical resolution */
    readonly parent?: IServiceManager;
    /** Flag indicating if this container has been disposed */
    isDisposed: boolean;
    /**
     * Registers a service using a factory function
     * @param identifier - Unique identifier for the service
     * @param factory - Function that creates instances of the service
     * @param options - Registration options (lifetime, dependencies)
     * @returns The service manager for method chaining
     */
    register: <T>(identifier: ServiceIdType<T>, factory: ServiceFactoryType<T>, options?: IServiceOptions) => IServiceManager;
    /**
     * Registers a service using a constructor class
     * @param identifier - Unique identifier for the service
     * @param constructor - Constructor function for the service
     * @param options - Registration options (lifetime, dependencies)
     * @returns The service manager for method chaining
     */
    registerClass<T>(identifier: ServiceIdType<T>, constructor: new (...args: any[]) => T, options?: IServiceOptions): IServiceManager;
    /**
     * Validates that no circular dependencies exist in the container
     * @throws Error if circular dependencies are detected
     */
    validateNoCycles: () => void;
    /**
     * Registers a pre-created instance as a singleton
     * @param identifier - Unique identifier for the service
     * @param instance - Pre-created instance to register
     * @returns The service manager for method chaining
     */
    registerInstance: <T>(identifier: ServiceIdType<T>, instance: T) => IServiceManager;
    /**
     * Resolves a service instance immediately
     * @param identifier - Unique identifier for the service
     * @param parameters - Additional parameters to pass to the factory
     * @returns Resolved service instance
     * @throws Error if service cannot be resolved
     */
    resolve: <T>(identifier: ServiceIdType<T>, ...parameters: any[]) => T; /**
     * Attempts to resolve a service, returning undefined if not found
     * @param identifier - Unique identifier for the service
     * @param parameters - Additional parameters to pass to the factory
     * @returns Resolved service instance or undefined
     */
    tryResolve: <T>(identifier: ServiceIdType<T>, ...parameters: any[]) => T | undefined;
    /**
     * Creates a lazy resolver function for a service
     *
     * The lazy resolver allows deferred service instantiation - the service
     * is only created when the returned function is first called, and then
     * cached for subsequent calls.
     *
     * @param identifier - Unique identifier for the service
     * @param parameters - Additional parameters to pass to the factory
     * @returns Function that resolves the service when called
     *
     * @example
     * ```typescript
     * const lazyUserService = container.lazy<IUserService>(SUserService);
     *
     * // Service is not created yet
     * const userService = lazyUserService(); // Service created here
     * const sameService = lazyUserService(); // Returns cached instance
     * ```
     */
    lazy: <T>(identifier: ServiceIdType<T>, ...parameters: any[]) => () => T;
    /**
     * Checks if a service is registered in the container
     * @param identifier - Unique identifier for the service
     * @returns True if the service is registered, false otherwise
     */
    isRegistered: <T>(identifier: ServiceIdType<T>) => boolean;
    /**
     * Gets a human-readable name for a service identifier
     * @param identifier - Service identifier to get name for
     * @returns Human-readable service name
     */
    getServiceName: (identifier: ServiceIdType) => string;
    /**
     * Throws an error if the service manager has been disposed
     * @throws Error if the service manager is disposed
     */
    throwIfDisposed: () => void;
    /**
     * Creates a new child scope for resolving services
     *
     * Scopes are used to create nested containers with their own
     * lifetimes and resolutions, useful for things like request-scoped
     * services in a web application.
     *
     * @example
     * ```typescript
     * const requestScope = container.createScope();
     *
     * requestScope.registerClass(SRequestService, RequestService);
     *
     * const requestService = requestScope.resolve<IRequestService>(SRequestService);
     * ```
     */
    createScope: () => IServiceManager;
    /**
     * Finds the service descriptor for a given identifier
     * @param identifier - Unique identifier for the service
     * @returns The service descriptor, or undefined if not found
     */
    findServiceDescriptor: <T>(identifier: ServiceIdType<T>) => IServiceDescriptor | undefined;
    /**
     * Disposes the service manager, releasing all resources
     *
     * This will call dispose on all registered services that implement
     * IDisposableService, and will recursively dispose of all child scopes.
     */
    dispose: () => void;
}
