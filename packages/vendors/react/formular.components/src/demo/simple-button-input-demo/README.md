# Simple Button + Input Demo

A simple demonstration showcasing a button with input text functionality using the formular.dev.lib and design system.

## 📁 Files

- **`simple-button-input-demo.tsx`** - React component using formular.dev.lib
- **`simple-demo.html`** - Standalone HTML demo (works without React)
- **`index.ts`** - Export file for the React component

## 🚀 Features

- ✅ **Form Management**: Uses formular.dev.lib for robust form handling
- ✅ **Component Integration**: Leverages existing InputText and Button components
- ✅ **Clean Styling**: Styled with Tailwind CSS classes
- ✅ **Interactive States**: Loading, disabled, and validation states
- ✅ **Simple Validation**: Basic input validation and feedback
- ✅ **Form Operations**: Submit and clear functionality

## 🎯 Usage

### React Component (requires React environment)

```tsx
import { SimpleButtonInputDemo } from '@demo/simple-button-input-demo'

function App() {
    return (
        <div>
            <SimpleButtonInputDemo />
        </div>
    )
}
```

### HTML Demo (standalone)

Simply open `simple-demo.html` in your browser to see the demo in action.

## 🏗️ Architecture

The React component demonstrates:

1. **Service Integration**: Uses `useService` hook to get `IFormularManager`
2. **Schema Creation**: Creates form schema using `InputTextBuilder`
3. **Form Instance**: Creates formular instance from schema
4. **Component Binding**: Binds `InputText` component to form field
5. **Event Handling**: Handles form submission and clearing
6. **State Management**: Manages loading states and result display

## 🎨 Design System Integration

The demo showcases integration with the design system through:

- **Tailwind CSS**: Clean, responsive styling
- **Component System**: Reusable Button and InputText components
- **Consistent Patterns**: Following established design patterns
- **Responsive Layout**: Mobile-friendly design

## 📝 Code Overview

```typescript
// 1. Service setup
const { getService } = useService()
const formularManager = getService<IFormularManager>(SFormularManager)

// 2. Schema definition
const demoSchema: IEntityScheme = {
    name: 'simple-demo-schema',
    properties: [
        InputTextBuilder.setId(1).setName('userMessage').build()
    ]
}

// 3. Form creation
const formular = formularManager?.createFromSchema(demoSchema)

// 4. Component rendering
<FormularForm formular={formular}>
    <InputText fieldName="userMessage" />
    <Button onClickCallback={handleSubmit}>Submit</Button>
</FormularForm>
```

## 🔧 Development Notes

- **No Extra Tests**: As requested, focuses on demonstration only
- **Minimal Dependencies**: Uses existing lib and component infrastructure
- **Simple Logic**: Straightforward form operations without complex validation
- **Clean Code**: Follows project conventions and style guidelines

## 🌟 Benefits

This demo shows how easy it is to:

- Create forms using formular.dev.lib
- Integrate with existing components
- Apply consistent styling
- Handle user interactions
- Manage form state effectively

The standalone HTML version provides a quick preview of the UI and interactions without needing to set up the full React environment.
