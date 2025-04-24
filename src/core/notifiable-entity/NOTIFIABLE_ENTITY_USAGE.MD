# How to Use `NotifiableEntity` Object

The `NotifiableEntity` object is designed to handle notifications and state changes in a structured way. Below is a guide on how to use it effectively.

## Importing `NotifiableEntity`

To use the `NotifiableEntity` object, first import it into your file:

```javascript
import NotifiableEntity from './path-to-notifiable-entity'
```

## Creating a NotifiableEntity Instance

You can create an instance of `NotifiableEntity` by passing the required parameters:

```javascript
const entity = new NotifiableEntity({
    id: 'entity1',
    name: 'Sample Entity',
    notifyCallback: (message) => {
        console.log('Notification received:', message)
    }
})
```

## Methods and Usage

### 1. **Notify**

The `notify` method is used to send a notification.

```javascript
entity.notify('This is a test notification.')
// Output: Notification received: This is a test notification.
```

### 2. **Update State**

You can update the state of the entity and trigger notifications.

```javascript
entity.updateState({ status: 'active' })
// Output: Notification received: State updated to {"status":"active"}
```

### 3. **Get State**

Retrieve the current state of the entity.

```javascript
const state = entity.getState()
console.log(state)
// Output: { status: 'active' }
```

### 4. **Subscribe to Notifications**

You can subscribe additional listeners to the notifications.

```javascript
entity.subscribe((message) => {
    console.log('Additional listener:', message)
})

entity.notify('Another notification.')
// Output:
// Notification received: Another notification.
// Additional listener: Another notification.
```

## Example Usage

Here’s a complete example:

```javascript
import NotifiableEntity from './path-to-notifiable-entity'

const entity = new NotifiableEntity({
    id: 'entity1',
    name: 'Sample Entity',
    notifyCallback: (message) => {
        console.log('Notification received:', message)
    }
})

entity.notify('Initialization complete.')

entity.updateState({ status: 'active' })

entity.subscribe((message) => {
    console.log('Additional listener:', message)
})

entity.notify('Final notification.')
```

## Notes

- Ensure the `notifyCallback` function is defined to handle notifications.
- Use `subscribe` to add multiple listeners for notifications.

By following these steps, you can effectively use the `NotifiableEntity` object in your project.
