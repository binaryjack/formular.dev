import React from 'react'
import { FieldSet } from '../field-set/field-set.ui'
import { FormLayout } from './form-layout.ui'

// Mock components for examples
const TextInput = ({ placeholder }: { placeholder: string }) => (
    <input
        type="text"
        placeholder={placeholder}
        className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
)

const SaveButton = ({ children }: { children: React.ReactNode }) => (
    <button className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        {children}
    </button>
)

const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium text-gray-700">{children}</label>
)

// Example 1: Centered Form Layout (spans 2 columns)
export const CenteredFormLayout = () => (
    <div className="grid grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
        {/* Other content in columns 1 and 4 */}
        <div className="bg-gray-100 p-4 rounded">Sidebar Left</div>

        {/* Centered form spanning 2 columns */}
        <FormLayout
            layoutSet={{
                span: 2, // Spans 2 columns
                offset: 0 // No offset needed since it's in the middle
            }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-xl font-semibold mb-4">User Information</h2>

            <FieldSet
                id="first-name"
                label={<Label>First Name</Label>}
                input={<TextInput placeholder="Enter first name" />}
                buttons={<SaveButton>Save</SaveButton>}
            />

            <FieldSet
                id="last-name"
                label={<Label>Last Name</Label>}
                input={<TextInput placeholder="Enter last name" />}
                buttons={<SaveButton>Save</SaveButton>}
            />

            <FieldSet
                id="email"
                label={<Label>Email</Label>}
                input={<TextInput placeholder="Enter email" />}
                buttons={<SaveButton>Save</SaveButton>}
            />
        </FormLayout>

        <div className="bg-gray-100 p-4 rounded">Sidebar Right</div>
    </div>
)

// Example 2: Responsive Centered Layout
export const ResponsiveCenteredFormLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {/* Empty space or sidebar */}
        <div className="hidden md:block bg-gray-100 p-4 rounded">Left Content</div>

        {/* Form that spans different amounts based on screen size */}
        <FormLayout
            layoutSet={{
                span: {
                    md: 1, // 1 column on medium screens (centered in 3-col grid)
                    lg: 2 // 2 columns on large screens (centered in 4-col grid)
                },
                offset: {
                    md: 0, // No offset needed on medium
                    lg: 0 // No offset needed on large
                }
            }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-xl font-semibold mb-4">Contact Form</h2>

            <FieldSet
                id="contact-name"
                label={<Label>Name</Label>}
                input={<TextInput placeholder="Your name" />}
                buttons={<SaveButton>Save</SaveButton>}
            />

            <FieldSet
                id="contact-message"
                label={<Label>Message</Label>}
                input={
                    <textarea
                        placeholder="Your message..."
                        className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    />
                }
                buttons={<SaveButton>Send</SaveButton>}
            />
        </FormLayout>

        <div className="hidden lg:block bg-gray-100 p-4 rounded">Right Content</div>
    </div>
)

// Example 3: Offset Layout (form starts at column 2)
export const OffsetFormLayout = () => (
    <div className="grid grid-cols-4 gap-6 p-6">
        {/* Form offset to start at column 2, spans 2 columns */}
        <FormLayout
            layoutSet={{
                span: 2, // Spans 2 columns
                offset: 1 // Starts at column 2 (offset of 1)
            }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-xl font-semibold mb-4">Settings Form</h2>

            <FieldSet
                id="setting-1"
                label={<Label>API Key</Label>}
                input={<TextInput placeholder="Enter API key" />}
                buttons={<SaveButton>Save</SaveButton>}
            />

            <FieldSet
                id="setting-2"
                label={<Label>Environment</Label>}
                input={
                    <select
                        className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Environment selection"
                    >
                        <option>Development</option>
                        <option>Staging</option>
                        <option>Production</option>
                    </select>
                }
                buttons={<SaveButton>Update</SaveButton>}
            />
        </FormLayout>
    </div>
)

// Example 4: Full Width Form Layout
export const FullWidthFormLayout = () => (
    <div className="grid grid-cols-3 gap-6 p-6">
        {/* Form spans all 3 columns */}
        <FormLayout
            layoutSet={{
                span: 3 // Full width
            }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-xl font-semibold mb-4 text-center">Registration Form</h2>

            {/* Form uses its own internal grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldSet
                    id="reg-first-name"
                    label={<Label>First Name</Label>}
                    input={<TextInput placeholder="First name" />}
                    buttons={<SaveButton>✓</SaveButton>}
                />

                <FieldSet
                    id="reg-last-name"
                    label={<Label>Last Name</Label>}
                    input={<TextInput placeholder="Last name" />}
                    buttons={<SaveButton>✓</SaveButton>}
                />
            </div>

            <FieldSet
                id="reg-email"
                label={<Label>Email Address</Label>}
                input={<TextInput placeholder="Enter your email" />}
                buttons={<SaveButton>Register</SaveButton>}
            />
        </FormLayout>
    </div>
)

// Example 5: Nested Form Layouts with Different Positioning
export const NestedFormLayouts = () => (
    <div className="grid grid-cols-6 gap-4 p-6">
        {/* Small form in first column */}
        <FormLayout layoutSet={{ span: 1 }} className="bg-blue-50 p-4 rounded">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <FieldSet
                id="quick-search"
                label={<Label>Search</Label>}
                input={<TextInput placeholder="Quick search..." />}
                buttons={<SaveButton>Go</SaveButton>}
                layout={{
                    fieldProportions: {
                        direction: 'stack',
                        preset: 'auto'
                    }
                }}
            />
        </FormLayout>

        {/* Main form spanning 4 columns */}
        <FormLayout layoutSet={{ span: 4 }} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Main Content Form</h2>

            <FieldSet
                id="main-title"
                label={<Label>Title</Label>}
                input={<TextInput placeholder="Enter title" />}
                buttons={<SaveButton>Save</SaveButton>}
            />

            <FieldSet
                id="main-content"
                label={<Label>Content</Label>}
                input={
                    <textarea
                        placeholder="Enter content..."
                        className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    />
                }
                buttons={<SaveButton>Save</SaveButton>}
            />
        </FormLayout>

        {/* Sidebar form in last column */}
        <FormLayout layoutSet={{ span: 1 }} className="bg-gray-50 p-4 rounded">
            <h3 className="font-medium mb-2">Meta</h3>
            <FieldSet
                id="meta-tags"
                label={<Label>Tags</Label>}
                input={<TextInput placeholder="Tags..." />}
                buttons={<SaveButton>+</SaveButton>}
                layout={{
                    fieldProportions: {
                        direction: 'stack',
                        preset: 'auto'
                    }
                }}
            />
        </FormLayout>
    </div>
)

// Example 6: Responsive Order Changes
export const ResponsiveOrderFormLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Form 1: Shows first on mobile, second on desktop */}
        <FormLayout
            layoutSet={{
                order: {
                    '2xs': 1, // First on mobile
                    lg: 2 // Second on desktop
                }
            }}
            className="bg-white p-4 rounded-lg shadow"
        >
            <h3 className="font-medium mb-3">Personal Info</h3>
            <FieldSet
                id="personal-name"
                label={<Label>Name</Label>}
                input={<TextInput placeholder="Your name" />}
                buttons={<SaveButton>Save</SaveButton>}
            />
        </FormLayout>

        {/* Form 2: Shows second on mobile, first on desktop */}
        <FormLayout
            layoutSet={{
                order: {
                    '2xs': 2, // Second on mobile
                    lg: 1 // First on desktop
                }
            }}
            className="bg-white p-4 rounded-lg shadow"
        >
            <h3 className="font-medium mb-3">Priority Settings</h3>
            <FieldSet
                id="priority-level"
                label={<Label>Level</Label>}
                input={
                    <select
                        className="input w-full px-3 py-2 border border-gray-300 rounded-md"
                        aria-label="Priority level"
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                }
                buttons={<SaveButton>Set</SaveButton>}
            />
        </FormLayout>

        {/* Form 3: Always last */}
        <FormLayout layoutSet={{ order: 3 }} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-3">Additional Notes</h3>
            <FieldSet
                id="notes"
                label={<Label>Notes</Label>}
                input={
                    <textarea
                        placeholder="Additional notes..."
                        className="input w-full px-3 py-2 border border-gray-300 rounded-md h-20"
                    />
                }
                buttons={<SaveButton>Save</SaveButton>}
            />
        </FormLayout>
    </div>
)
