import React from 'react'
import { FieldSet } from './field-set.ui'

// Example components for demonstration
const TextInput = ({ placeholder }: { placeholder: string }) => (
    <input
        type="text"
        placeholder={placeholder}
        className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
)

const SaveButton = ({ children }: { children: React.ReactNode }) => (
    <button className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {children}
    </button>
)

const DeleteButton = ({ children }: { children: React.ReactNode }) => (
    <button className="btn btn-danger px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
        {children}
    </button>
)

const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-gray-700">{children}</label>
)

// Example 1: Mobile-First Responsive Layout (Default Behavior)
export const ResponsiveMobileFirstFieldSet = () => (
    <FieldSet
        id="mobile-first-example"
        label={<Label>Email Address</Label>}
        input={<TextInput placeholder="Enter your email" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>Save</SaveButton>
                <DeleteButton>Delete</DeleteButton>
            </div>
        }
        // Uses default layout: stack on mobile, hybrid on sm, inline on md+
    />
)

// Example 2: Custom Responsive Directions
export const CustomDirectionsFieldSet = () => (
    <FieldSet
        id="custom-directions-example"
        label={<Label>Long Form Field Name</Label>}
        input={<TextInput placeholder="This adapts differently across screen sizes" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>Save</SaveButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'balanced',
                direction: {
                    '2xs': 'stack', // Everything stacked on tiny screens
                    xs: 'stack', // Everything stacked on small screens
                    sm: 'hybrid', // Label on top, input+buttons inline on tablets
                    lg: 'inline', // Everything inline on large screens
                    xl: 'inline' // Everything inline on xl screens
                }
            }
        }}
    />
)

// Example 3: Always Stack Layout
export const AlwaysStackFieldSet = () => (
    <FieldSet
        id="always-stack-example"
        label={<Label>Description</Label>}
        input={
            <textarea
                placeholder="Enter detailed description..."
                className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            />
        }
        buttons={
            <div className="flex gap-2 justify-end">
                <SaveButton>Save</SaveButton>
                <DeleteButton>Clear</DeleteButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'input-wide',
                direction: 'stack' // Always stack, good for textareas
            }
        }}
    />
)

// Example 4: Always Inline Layout
export const AlwaysInlineFieldSet = () => (
    <FieldSet
        id="always-inline-example"
        label={<Label>Status</Label>}
        input={
            <select
                className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Status selection"
            >
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
            </select>
        }
        buttons={
            <div className="flex gap-2">
                <SaveButton>Update</SaveButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'auto',
                direction: 'inline' // Always inline, good for compact fields
            }
        }}
    />
)

// Example 5: Hybrid Layout (Label top, input+commands inline)
export const HybridLayoutFieldSet = () => (
    <FieldSet
        id="hybrid-example"
        label={<Label>Product Price</Label>}
        input={<TextInput placeholder="0.00" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>$</SaveButton>
                <DeleteButton>Clear</DeleteButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'balanced',
                direction: 'hybrid' // Label on top, input+buttons in a row
            }
        }}
    />
)

// Example 2: Label-Wide Layout
export const LabelWideFieldSet = () => (
    <FieldSet
        id="label-wide-example"
        label={<Label>Very Long Descriptive Field Label</Label>}
        input={<TextInput placeholder="Short input" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>Save</SaveButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'label-wide' // 1/2 label, flexible input, auto buttons
            }
        }}
    />
)

// Example 3: Input-Wide Layout
export const InputWideFieldSet = () => (
    <FieldSet
        id="input-wide-example"
        label={<Label>Name</Label>}
        input={<TextInput placeholder="Enter a very long detailed description here..." />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>Save</SaveButton>
                <DeleteButton>Delete</DeleteButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'input-wide' // 1/4 label, flexible input, compact buttons
            }
        }}
    />
)

// Example 4: Auto Layout (Content-based)
export const AutoFieldSet = () => (
    <FieldSet
        id="auto-example"
        label={<Label>ID</Label>}
        input={<TextInput placeholder="12345" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>✓</SaveButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'auto' // All elements size to content
            }
        }}
    />
)

// Example 5: Custom Proportions
export const CustomFieldSet = () => (
    <FieldSet
        id="custom-example"
        label={<Label>Custom</Label>}
        input={<TextInput placeholder="Custom proportions" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>Save</SaveButton>
                <DeleteButton>Delete</DeleteButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'custom',
                labelWidth: {
                    sm: '200px', // Fixed width on small screens
                    lg: '300px' // Larger fixed width on large screens
                },
                inputWidth: 'flex-1', // Always flexible
                commandWidth: {
                    sm: '120px', // Fixed width for button area
                    lg: '150px'
                }
            }
        }}
    />
)

// Example 6: Responsive Proportions
export const ResponsiveFieldSet = () => (
    <FieldSet
        id="responsive-example"
        label={<Label>Responsive Field</Label>}
        input={<TextInput placeholder="Changes layout by screen size" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>Save</SaveButton>
                <DeleteButton>Delete</DeleteButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: {
                    '2xs': 'auto', // Stack on tiny screens
                    sm: 'balanced', // Balanced on small screens
                    lg: 'input-wide', // Input-focused on large screens
                    xl: 'label-wide' // Label-focused on xl screens
                }
            }
        }}
    />
)

// Example 7: Form with Multiple Field Sets
export const FormExample = () => (
    <div className="form-layout grid w-full grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-4xl">
        <ResponsiveMobileFirstFieldSet />
        <CustomDirectionsFieldSet />
        <AlwaysInlineFieldSet />
        <HybridLayoutFieldSet />

        {/* This field spans 2 columns on large screens */}
        <AlwaysStackFieldSet />
    </div>
)

// Example 8: Field Classes Override
export const CustomStyledFieldSet = () => (
    <FieldSet
        id="custom-styled-example"
        label={<Label>Custom Styled</Label>}
        input={<TextInput placeholder="With custom styling" />}
        buttons={
            <div className="flex gap-2">
                <SaveButton>Save</SaveButton>
            </div>
        }
        layout={{
            fieldProportions: {
                preset: 'balanced'
            }
        }}
        fieldClasses={{
            label: 'text-purple-600 font-bold',
            inputContainer: 'bg-purple-50 rounded-lg p-2',
            commands: 'bg-gray-50 rounded-lg px-3'
        }}
    />
)
