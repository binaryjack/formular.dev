# Next Steps for Design System Migration

## Components Needing Storybook Stories

The following components still need Storybook stories created to showcase their design system integration:

1. **Radio Input** (`radio-input.tsx`, `radio-input.option.tsx`)
   - Need to create comprehensive stories showing all variants and states
   - Should demonstrate integration with form validation

2. **Select Input** (`select-input.tsx`)
   - Need to create stories showing dropdown functionality
   - Should demonstrate search/filter capabilities
   - Should show validation states

3. **Field Set** (`field-set.tsx`)
   - Need to create stories showing how it wraps other components
   - Demonstrate label positioning and validation integration

4. **Drawer** (`drawer.tsx`)
   - Create stories showing various positions (top, bottom, center)
   - Demonstrate toggle functionality

5. **Chevron Toggle Button** (`chevron-toggle-button.tsx`)
   - Create stories showing toggle states and integration with drawers

## Components Needing Design System Review

The following components should be reviewed to ensure they're fully utilizing the design system:

1. **Radio Input** - Check if it needs design system classes for styling
2. **Field Set** - Verify it's using design system spacing and typography
3. **Drawer** - Ensure animations and positioning use design system tokens
4. **Validation Result** - Confirm it uses design system colors and spacing

## Implementation Plan

1. Start with creating Storybook stories for Radio Input
2. Verify and update Radio Input component to use design system classes
3. Create Storybook stories for Select Input
4. Move on to Field Set and Drawer components
5. Update the Design System Overview story to include the new components
6. Create a final migration summary document

Let's begin with the Radio Input component stories.
