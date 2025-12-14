# Portal and PortalSlot Usage Guide

This document explains how to use the `Portal` and `PortalSlot` components in your React application. These components are designed to facilitate rendering content outside the DOM hierarchy of the parent component.

---

## `Portal` Component

### Description

The `Portal` component renders its children into a DOM node that exists outside the DOM hierarchy of the parent component. It uses React's `createPortal` to achieve this functionality.

### Props

| Prop Name  | Type              | Description                                                     |
| ---------- | ----------------- | --------------------------------------------------------------- |
| `id`       | `string`          | The unique identifier for the portal.                           |
| `slotName` | `string`          | The name of the slot where the portal will render its children. |
| `children` | `React.ReactNode` | The content to be rendered inside the portal.                   |

### Example Usage

```tsx
import { Portal } from './Portal'

const App = () => {
    return (
        <>
            <Portal id="example" slotName="header">
                <h1>This is rendered in the header slot</h1>
            </Portal>
        </>
    )
}
```

---

## `PortalSlot` Component

### Description

The `PortalSlot` component creates a container for a portal. It generates a `div` element with a unique ID based on the provided `id` and `slotName`.

### Props

| Prop Name  | Type     | Description                                                     |
| ---------- | -------- | --------------------------------------------------------------- |
| `id`       | `string` | The unique identifier for the portal slot.                      |
| `slotName` | `string` | The name of the slot where the portal will render its children. |

### Example Usage

```tsx
import { PortalSlot } from './PortalSlot'

const App = () => {
    return (
        <>
            <PortalSlot id="example" slotName="header" />
        </>
    )
}
```

---

## Combined Usage Example

Here is an example of how to use `Portal` and `PortalSlot` together:

```tsx
import { Portal } from './Portal'
import { PortalSlot } from './PortalSlot'

const App = () => {
    return (
        <>
            {/* Define the portal slot */}
            <PortalSlot id="example" slotName="header" />

            {/* Render content into the portal slot */}
            <Portal id="example" slotName="header">
                <h1>This is rendered in the header slot</h1>
            </Portal>
        </>
    )
}
```

In this example:

1. The `PortalSlot` component creates a `div` with the ID `example-header-container`.
2. The `Portal` component renders its children (`<h1>`) into the `div` created by `PortalSlot`.

---

## Notes

- Ensure that the `PortalSlot` is rendered in the DOM before the corresponding `Portal` component.
- The `id` and `slotName` props must match between the `Portal` and `PortalSlot` components for proper functionality.

---

## Author

Created by TPI - This component was developed as part of the SignalsPatternsReact project to facilitate rendering content outside of normal DOM hierarchy.
