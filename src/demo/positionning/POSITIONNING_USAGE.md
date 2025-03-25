## Positionning Component

The `Positionning` component is a container that renders multiple `ScreenElement` components in a vertically stacked layout.
It is designed to demonstrate the positioning and behavior of individual screen elements within a flexible and responsive layout.

### Props

This component does not accept any props.

### Behavior

- The `Positionning` component uses a `div` with a `flex` and `flex-col` layout to stack its child elements vertically.
- It renders multiple `ScreenElement` components, each with a unique `id` and `name` prop.
- The background color of the container is set to `bg-slate-200`.

### Usage

```tsx
import Positionning from './Positionning'

const App = () => {
    return <Positionning />
}

export default App
```

---

## ScreenElement Component

The `ScreenElement` component represents an individual interactive element within the `Positionning` layout.
It is designed to showcase dynamic behaviors such as drawer interactions and debug information.

### Props

- `id` (string, required): A unique identifier for the `ScreenElement`.
- `name` (string, required): A descriptive name for the `ScreenElement`.

### Behavior

- The component renders a container with a `relative` layout and various styling classes for alignment, spacing, and appearance.
- It includes:
    - **PortalSlot**: Used for rendering content in specific slots (`drawer-slot-center`, `drawer-slot-bottom`, and `drawer-slot-top`).
    - **Drawer**: A collapsible drawer component that can be toggled open or closed. It accepts props such as `id`, `onSetOpenState`, `drawerOpenState`, `position`, `width`, and `height`.
    - **CenterElementDebug**: Displays debug information about the element's position and screen alignment.
    - **Button**: A button that triggers the drawer to open when clicked.
- The component dynamically updates its state and behavior based on user interactions and screen properties.

### Usage

```tsx
import { ScreenElement } from './ScreenElement'

const App = () => {
    return <ScreenElement id="example-id" name="Example Element" />
}

export default App
```

---

### Author

**Tadeo Piana**
