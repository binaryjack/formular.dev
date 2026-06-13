# Inversion of Control & Dependency Injection

The `formular.dev` architecture leverages a custom Inversion of Control (IoC) container called `ServiceManager` (`src/core/managers/service-manager/`). This promotes decoupling and scalable dependency management across the core framework and form instances.

## ServiceManager Features

The `ServiceManager` provides a comprehensive feature set:
- **Lifecycles**: Supports `singleton` (one instance per container), `transient` (new instance every time), and `scoped` (one per child container/scope).
- **Lazy Resolution**: Defers service instantiation until it's actually invoked.
- **Hierarchical Scopes**: Supports parent-child container relationships via `createScope()`, allowing isolated overriding of services.
- **Circular Dependency Detection**: Validates the dependency graph during resolution (`validateNoCycles`).

## Code Examples

### Registration and Resolution

Services are registered using descriptors mapping an identifier (Symbol, string, or class) to a factory or constructor.

```typescript
import { ServiceManager } from '@core/managers/service-manager/service-manager';
import { SUserService } from './symbols';

// 1. Create a service manager container
const container = new ServiceManager();

// 2. Register a class-based service
container.registerClass(SUserService, UserService, {
    lifetime: 'singleton',
    dependencies: [SDataService, SLogService] // Explicit dependency mapping
});

// 3. Register a simple factory
container.register(SConfig, (sm) => new ConfigService(), { lifetime: 'scoped' });

// 4. Resolve the service
const userService = container.resolve<IUserService>(SUserService);
```

### Lazy Resolution

To optimize initialization times (especially useful in large dynamic forms), dependencies can be resolved lazily.

```typescript
// `lazy` returns a getter function instead of the instance itself
const lazyUserService = container.lazy<IUserService>(SUserService);

// The service is not instantiated until the function is invoked
const service = lazyUserService(); 
```
