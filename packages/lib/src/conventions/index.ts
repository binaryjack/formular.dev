// All utilities have been moved to core/framework for better organization
// 
// Migration map:
// - MissingPropEnum -> core/framework/common/missing-prop.enum
// - Screen orientation utilities -> core/framework/utility/screen-orientation/
// - ValueOf<T> type -> core/framework/types/value-of.type
// - ElementPositionOutputType -> core/framework/types/element-position-output.type
// - OrientationTypesType -> core/framework/types/orientation-types.type
//
// This file is kept for backwards compatibility
// Use the framework locations for all imports going forward

// Export empty object to make this a valid module
export const CONVENTIONS_MOVED_TO_FRAMEWORK = true
