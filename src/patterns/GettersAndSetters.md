Implementing Getters and Setters in TypeScript Functional Classes
I see you're using the functional constructor pattern throughout your codebase, rather than ES6 class syntax. Here's how to implement getters and setters in this style:

Method 1: Using Object.defineProperty

````// 1. Define the interface with getter/setter
interface IMyClass {
    new(): IMyClass;
    _someValue: string;  // Internal property (convention is to use underscore)
    someValue: string;   // This will be the getter/setter property
    otherMethod(): void;
}

// 2. Create the constructor function
const MyClass = function(this: IMyClass) {
    this._someValue = 'default value';
} as any as IMyClass;

// 3. Define methods on the prototype
MyClass.prototype.otherMethod = function() {
    console.log('Other method called');
};

// 4. Define getters and setters using Object.defineProperty
Object.defineProperty(MyClass.prototype, 'someValue', {
    get: function(this: IMyClass) {
        console.log('Getter called');
        return this._someValue;
    },
    set: function(this: IMyClass, value: string) {
        console.log('Setter called with value:', value);
        this._someValue = value;
    }
});```


Method 2: Define in the Object.assign Pattern
```import { IRteCommandManager } from '../rteCommandManager.types';

export const CommandManager = function(this: IRteCommandManager, editorElement: HTMLElement) {
    this._editorElement = editorElement; // Private property
} as any as IRteCommandManager;

Object.assign(CommandManager.prototype, {
    // Regular methods
    resetEditor: function() {
        this._editorElement.innerHTML = '';
    },

    // Define getters/setters in the same object
    get editorElement() {
        return this._editorElement;
    },

    set editorElement(value: HTMLElement) {
        if (value) {
            this._editorElement = value;
        }
    }
});```

If you're using Object.assign for your prototype methods (like in your SelectionManager), you can do:

Example Based on Your RteCommandManager

```// In your interface definition
interface IRteCommandManager {
    // ... other properties
    _editorElement: HTMLElement; // Private backing field
    editorElement: HTMLElement;  // Public getter/setter
    resetEditor: () => void;
    // ... other methods
}

// In your constructor
export const RteCommandManager = function(this: IRteCommandManager, editorElement: HTMLElement) {
    this._editorElement = editorElement;
    // ... other initialization
} as any as IRteCommandManager;

// Adding getter/setter using Object.defineProperty
Object.defineProperty(RteCommandManager.prototype, 'editorElement', {
    get: function(this: IRteCommandManager) {
        return this._editorElement;
    },
    set: function(this: IRteCommandManager, value: HTMLElement) {
        if (value) {
            this._editorElement = value;
            // You could also trigger some side effects when the property changes
        }
    }
});```

// Your existing method assignments
```bject.assign(RteCommandManager.prototype, {
    resetEditor,
    // ... other methods
});```
Here's how you might implement a getter/setter for the editorElement in your existing pattern:

This allows you to use the property syntax (commandManager.editorElement) while still using your functional class pattern, giving you a clean API like you would have with ES6 classes.
````
