# Types

The `formular.dev` schema builder provides a fluent API for defining type-safe data schemas. All types are accessible via the builder namespace `f`.

## `string`
Creates a string schema.
```typescript
import { f } from 'formular.dev';

const schema = f.string()
  .min(3, 'Too short')
  .max(50, 'Too long')
  .email('Invalid email')
  .nonempty('Required');
```

## `number`
Creates a number schema.
```typescript
const schema = f.number()
  .min(0)
  .max(100)
  .int()
  .positive();
```

## `boolean`
Creates a boolean schema.
```typescript
const schema = f.boolean().true('Must be true');
```

## `object`
Creates an object schema from a shape of key-value schemas.
```typescript
const schema = f.object({
  id: f.number(),
  name: f.string()
});
```
It supports modifiers like `.partial()`, `.required()`, `.pick(keys)`, `.omit(keys)`, `.extend(schema)`, and `.merge(schema)`.

## `array`
Creates an array schema wrapping an element schema.
```typescript
const schema = f.array(f.string())
  .min(1)
  .max(10);
```

## `date`
Creates a date schema.
```typescript
const schema = f.date()
  .min(new Date('2020-01-01'))
  .max(new Date());
```

## `literal`
Creates a literal schema matching an exact value.
```typescript
const schema = f.literal('admin');
```

## `record`
Creates a record schema for key-value maps.
```typescript
const schema = f.record(
  f.string(), 
  f.number()
);
```

## `union`
Creates a union schema allowing values that match any of the provided options.
```typescript
const schema = f.union(
  f.string(), 
  f.number()
);
```

## `enum`
Creates an enum schema matching a predefined list of string values.
```typescript
const schema = f.enum(['USER', 'ADMIN', 'GUEST']);
```
