# Header Preset System Usage Examples

## 🎯 **Simple Preset Usage (90% of cases)**

```tsx
// Using built-in presets
<Accordion 
    title="Dark Impact Header"
    headerPreset="dark-impact"  // Dark header, light text, always
    variants={{ variant: 'primary' }}
/>

<Accordion 
    title="Branded Header"
    headerPreset="branded"      // Uses primary variant colors with contrast
    variants={{ variant: 'primary' }}
/>

<Accordion 
    title="Subtle Header"
    headerPreset="subtle"       // Minimal contrast, blends in
    variants={{ variant: 'secondary' }}
/>

// Using custom presets from COMPONENT_STYLE_CONFIG
<Accordion 
    title="High Contrast"
    headerPreset="contrast"     // From accordion.headerPresets.contrast
    variants={{ variant: 'danger' }}
/>

<Accordion 
    title="Inverted Theme"
    headerPreset="inverted"     // From accordion.headerPresets.inverted
    variants={{ variant: 'success' }}
/>
```

## 🔧 **Advanced Custom Usage (10% of cases)**

```tsx
// Fine-tuning with headerStyle
<Accordion 
    title="Custom Header"
    headerPreset="branded"      // Start with branded preset
    headerStyle={{              // Override specific aspects
        customClasses: ['shadow-lg', 'border-l-4'],
        forceTextClasses: ['font-bold']
    }}
    variants={{ variant: 'warning' }}
/>

// Full custom control
<Accordion 
    title="Fully Custom"
    headerPreset="custom"       // No preset
    headerStyle={{              // Full manual control
        disableGenericText: true,
        forceBackgroundClasses: ['bg-gradient-to-r', 'from-purple-600', 'to-blue-600'],
        forceTextClasses: ['text-white', 'font-semibold'],
        customClasses: ['rounded-t-lg', 'p-4']
    }}
    variants={{ variant: 'info' }}
/>

// Override dark/light mode behavior
<Accordion 
    title="Always Dark Header"
    headerStyle={{
        disableGenericText: true,
        forceBackgroundClasses: ['bg-slate-900'],
        forceTextClasses: ['text-white'],
        preserveMode: false  // Ignore theme switching
    }}
    variants={{ variant: 'primary' }}
/>
```

## 📋 **Available Built-in Presets**

| Preset | Description | Use Case |
|--------|-------------|----------|
| `default` | Inherits from component variant | Simple, consistent styling |
| `dark-impact` | Dark header, light text | Maximum visual separation |
| `light-impact` | Light header, dark text | Clean, minimal look |
| `branded` | Uses variant colors | Brand-consistent headers |
| `subtle` | Minimal contrast | Elegant, understated |
| `custom` | No preset, manual control | Unique designs |

## 🎨 **Component-Specific Presets**

### Accordion
- `contrast` - High contrast for visual impact
- `branded` - Variant-based colors
- `subtle` - Minimal visibility
- `inverted` - Always dark regardless of theme

### Card
- `contrast` - Bold card headers
- `branded` - Variant-colored headers

### Drawer
- `contrast` - Navigation headers
- `subtle` - Minimal drawer headers

## 🚀 **Benefits**

### For Developers
- ✅ **Simple**: `headerPreset="dark-impact"` covers most needs
- ✅ **Flexible**: Combine presets with custom overrides
- ✅ **Discoverable**: TypeScript suggests available presets
- ✅ **Consistent**: All components use same preset system

### For Design System
- ✅ **Maintainable**: All presets in `COMPONENT_STYLE_CONFIG`
- ✅ **Extensible**: Easy to add new presets per component
- ✅ **Documentation**: Built-in descriptions for each preset
- ✅ **Performance**: CSS-first approach with minimal JS

The preset system handles the complexity while keeping simple cases simple! 🎉
