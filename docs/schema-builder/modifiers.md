# Modifiers

All schema types extend from `ISchemaBase` and share common modifiers that alter validation behavior or typing.

## `optional`
Makes the schema optional, allowing `undefined` values.
```typescript
const schema = f.string().optional(); // Type: string | undefined
```

## `nullable`
Makes the schema nullable, allowing `null` values.
```typescript
const schema = f.string().nullable(); // Type: string | null
```

## `default`
Sets a fallback value if the input is `undefined`.
```typescript
const schema = f.number().default(10);
```

## `transform`
Applies a transformation function to the output value after it has been parsed and validated.
```typescript
const schema = f.string().transform((val) => val.split(',')); 
// Input: string, Output: string[]
```

## `refine`
Adds custom refinement/validation logic.
```typescript
const schema = f.string().refine(
  (val) => val !== 'admin', 
  { message: 'Username "admin" is reserved' }
);
```
