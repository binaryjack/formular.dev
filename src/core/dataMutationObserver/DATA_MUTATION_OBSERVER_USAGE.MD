# Using `DataMutationObserverSubject`

Author: Tadeo Piana

The `DataMutationObserverSubject` is a utility designed to observe and react to data mutations in your application. It provides a clean and efficient way to handle changes in data and trigger corresponding actions.

---

## Installation

Ensure you have the required package installed in your project:

```bash
npm install data-mutation-observer
```

---

## Importing `DataMutationObserverSubject`

To use the `DataMutationObserverSubject`, import it into your file:

```javascript
import { DataMutationObserverSubject } from 'data-mutation-observer'
```

---

## Basic Usage

### Step 1: Create an Observer Instance

Create an instance of `DataMutationObserverSubject` to observe data changes.

```javascript
const dataObserver = new DataMutationObserverSubject()
```

### Step 2: Subscribe to Data Changes

Use the `subscribe` method to listen for data mutations.

```javascript
dataObserver.subscribe((mutation) => {
    console.log('Data mutated:', mutation)
})
```

### Step 3: Notify Observers of Mutations

When data changes, notify all observers using the `notify` method.

```javascript
const newData = { id: 1, name: 'Sample' }
dataObserver.notify(newData)
```

---

## Example: Observing a List of Items

```javascript
import { DataMutationObserverSubject } from 'data-mutation-observer'

const itemsObserver = new DataMutationObserverSubject()

// Subscribe to changes
itemsObserver.subscribe((mutation) => {
    console.log('Items updated:', mutation)
})

// Simulate adding a new item
const items = [{ id: 1, name: 'Item 1' }]
const newItem = { id: 2, name: 'Item 2' }

items.push(newItem)
itemsObserver.notify(items)
```

---

## Example: React Integration

```javascript
import React, { useEffect, useState } from 'react'
import { DataMutationObserverSubject } from 'data-mutation-observer'

const dataObserver = new DataMutationObserverSubject()

const App = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        // Subscribe to data changes
        const subscription = dataObserver.subscribe((mutation) => {
            setData(mutation)
        })

        return () => {
            // Cleanup subscription
            subscription.unsubscribe()
        }
    }, [])

    const addItem = () => {
        const newItem = { id: data.length + 1, name: `Item ${data.length + 1}` }
        const updatedData = [...data, newItem]
        dataObserver.notify(updatedData)
    }

    return (
        <div>
            <h1>Data Observer Example</h1>
            <button onClick={addItem}>Add Item</button>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default App
```

---

## API Reference

### `subscribe(callback: (mutation: any) => void): Subscription`

Subscribes to data mutations. Returns a subscription object with an `unsubscribe` method.

### `notify(data: any): void`

Notifies all subscribers of a data mutation.

---

Start using `DataMutationObserverSubject` to efficiently manage and react to data changes in your application!
