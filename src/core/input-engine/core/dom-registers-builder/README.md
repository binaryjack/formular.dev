# DomRegisterBuilder Module

This module provides the `DomRegisterBuilder` class and related event registration and builder functions for constructing DOM input element configurations and event handlers in a composable way.

## Structure

- Each event registration and builder function is implemented in its own file for modularity and testability.
- The main builder (`DomRegisterBuilder`) attaches all these methods to its prototype using `Object.assign`.

## Usage Example

```typescript
import { DomRegisterBuilder } from './dom-registers-builder'

const builder = new DomRegisterBuilder(context)
builder
    .registerChange()
    .registerBlur()
    .registerFocus()
    .registerClick()
    .registerKeyPress()
    .registerKeyUp()
    .registerAria(...arias)

const inputConfig = builder.build()
```

## Files

- `register-events.ts` — Register multiple custom event handlers
- `register-event.ts` — Register a single event handler
- `register-change.ts` — Register onChange event
- `register-key-press.ts` — Register onKeyPress event
- `register-key-up.ts` — Register onKeyUp event
- `assemble-events-handlers.ts` — Merge all event handlers
- `register-blur.ts` — Register onBlur event
- `register-focus.ts` — Register onFocus event
- `register-click.ts` — Register onClick event
- `register-click-option.ts` — Register onClickOption event
- `register-aria.ts` — Register ARIA attributes
- `build.ts` — Build the main input element config
- `build-option.ts` — Build an option element config
- `build-label.ts` — Build a label element config

## Testing

A test file should be created to cover the builder and all event registration methods.
