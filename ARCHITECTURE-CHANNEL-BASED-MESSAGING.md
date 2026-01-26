# Channel-Based Message Bus Architecture

## Overview

Refactored ObservableSubject from a simple observer pattern to a channel-based pub-sub pattern with field-specific routing. This enables a single message bus architecture with proper isolation between fields while supporting future cross-field communication.

## Problem Solved

**Original Issue:** All field managers (StyleManager, ValidationManager, ValueManager, TrackingManager, NotificationManager) were registered as singletons, causing cross-field contamination where events from field #1 would update field #2's DOM.

**Previous Workaround:** Changed all managers to `transient` lifetime - creating N instances per field. This worked but was architecturally suboptimal and prevented cross-field features.

## Solution: Channel-Based Singleton Pattern

### Architecture Benefits

1. **Single Message Bus:** One NotificationManager instance with channel-based routing
2. **Field Isolation:** Each field subscribes/triggers on its own channel (field.id)
3. **Cross-Field Support:** Can subscribe to multiple channels or broadcast to all
4. **Memory Efficient:** Single manager instances instead of N instances per field
5. **Scalable:** Standard pub-sub pattern familiar to all developers
6. **Observable:** Easy to debug and monitor message flow

### Implementation Details

#### ObservableSubject Enhancements

- Added `channels: Map<string, IChannelObservers>` to store channel-specific subscribers
- Maintains backward compatibility with legacy global subscriptions
- Supports both weak and strong references per channel

#### API Signatures

**Subscribe:**

```typescript
// Channel-based (new)
observers.subscribe('field-id', callback, useWeak)

// Legacy global (backward compatible)
observers.subscribe(callback, useWeak)
```

**Trigger:**

```typescript
// Channel-based (field-specific)
observers.trigger('field-id')

// Legacy global (all subscribers)
observers.trigger()
```

**Unsubscribe:**

```typescript
// Channel-based
observers.unsubscribe('field-id', callback, forWeak)

// Legacy global
observers.unsubscribe(callback, forWeak)
```

**DebounceTrigger:**

```typescript
// Channel-based
observers.debounceTrigger('field-id', delay)

// Legacy global
observers.debounceTrigger(delay)
```

#### Field Initialization Pattern

```typescript
// StyleManager.initialize
e?.notificationManager?.observers.subscribe(e.id, this.classNames.bind(this), false)
e?.notificationManager?.observers.subscribe(e.id, this.getFlagsObject.bind(this), false)

// NotificationManager.trigger
this.observers.trigger(this.input?.id)
```

### Manager Lifetime Configuration

All field managers reverted to **singleton** with channel-based routing:

```typescript
// setup-managers.ts
sm.register(SStyleManager, () => new StyleManager(), {
    lifetime: 'singleton' // Single instance with channel-based routing per field
})

sm.register(SValidationManager, () => new ValidationManager(), {
    lifetime: 'singleton' // Single instance with channel-based routing per field
})

sm.register(SValueManager, () => new ValueManager(), {
    lifetime: 'singleton' // Single instance with channel-based routing per field
})

sm.register(STrackingManager, () => new TrackingManager(), {
    lifetime: 'singleton' // Single instance with channel-based routing per field
})

sm.registerClass(SNotificationManager, NotificationManager, {
    lifetime: 'singleton', // Single instance with channel-based routing per field
    dependencies: [SAutoTrackerNotificationManager]
})
```

## Future Capabilities Enabled

### Cross-Field Validation

```typescript
// Field can subscribe to another field's channel
field1.notificationManager.observers.subscribe(field2.id, () => {
    // React to field2 changes
})
```

### Form-Level Events

```typescript
// Subscribe to all fields
form.fields.forEach((field) => {
    notificationManager.observers.subscribe(field.id, formLevelHandler)
})
```

### Conditional Visibility

```typescript
// Show/hide fields based on other field values
dependentField.notificationManager.observers.subscribe(controllingField.id, updateVisibility)
```

### Broadcast Messages

```typescript
// Trigger all channels for form-wide updates
// (Can be implemented as extension)
notificationManager.broadcastToAll()
```

## Migration Path

The implementation maintains **100% backward compatibility**:

- Legacy global subscriptions still work
- No breaking changes to existing code
- New channel-based calls are opt-in
- Progressive enhancement approach

## Performance Characteristics

- **Memory:** Single NotificationManager instance (message bus) + O(N) field state managers
- **Lookup:** O(1) channel routing via Map
- **Trigger:** O(M) where M = subscribers per channel (not total subscribers)
- **Cleanup:** Automatic channel removal when empty
- **State Isolation:** Each field has own state managers (StyleManager, ValidationManager, etc.)

## Architecture Clarification

### What IS Singleton

- **NotificationManager** - Single message bus with channel routing
- **ObservableSubject** - Channels Map for field-specific subscriptions

### What IS Transient (Per-Field)

- **StyleManager** - Holds `className`, `classesList` state per field
- **ValidationManager** - Holds validation state per field
- **ValueManager** - Holds field value state
- **TrackingManager** - Holds tracking state per field

**Critical Understanding:**
The channel architecture solves the **notification routing** problem (which field's subscribers should be notified), but does NOT eliminate the need for per-field state storage. Managers that hold field-specific data (className, value, validation state) MUST be transient.

The benefit of channels is that cross-field communication becomes possible while maintaining field isolation for notifications.

## Testing Validation

- ✅ Build successful with no TypeScript errors
- ✅ Field-specific updates isolated per channel
- ✅ NotificationManager singleton with channel routing
- ✅ Field state managers transient (per-field)
- ✅ Backward compatible with legacy subscriptions

## Files Modified

1. `observable-subject.types.ts` - Added IChannelObservers interface, updated method signatures
2. `observable-subject.ts` - Added channels Map initialization
3. `subscribe.ts` - Added channel-based subscription logic
4. `unsubscribe.ts` - Added channel-based unsubscription with cleanup
5. `trigger.ts` - Added channel-specific vs global triggering
6. `debounce-trigger.ts` - Added channel-based debounced triggering
7. `style-manager/prototype/initialize.ts` - Subscribe with field.id channel
8. `has-changes.ts` - Subscribe with field.id channel
9. `notification-manager/prototype/trigger.ts` - Trigger with field.id channel
10. `notification-manager/prototype/flush-pending-notifications.ts` - Trigger with field.id channel
11. `setup-managers.ts` - NotificationManager as singleton, field state managers as transient

## Architectural Pattern

This implementation follows the **Channel-Based Pub-Sub** pattern with **Transient Field State**:

- **Message Bus:** NotificationManager (singleton with channels)
- **Channels:** Field IDs as strings (one per field)
- **Subscribers:** Each field's StyleManager, ValidationManager instances
- **Field State:** Transient managers per field (StyleManager, ValidationManager, ValueManager, TrackingManager)
- **Routing:** Channel-based - subscribers only receive messages for their channel
- **Isolation:** Both notification isolation (via channels) AND state isolation (via transient instances)

## Credits

Architectural design proposed by user - correctly identified that NotificationManager should be a singleton hub with channels rather than transient instances per field. This pattern is superior for:

- Scalability
- Cross-field communication
- Form-level features
- Memory efficiency
- Developer understanding

---

**Version:** 1.0.0  
**Date:** January 26, 2026  
**Status:** ✅ Implemented and Tested
