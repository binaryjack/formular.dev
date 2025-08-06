// Example showing correct Label component usage

import { Label } from './label.ui'

// ✅ Correct way - use variant properties
export const LabelExample = () => {
    return (
        <div>
            <Label
                htmlFor="input1"
                text="Primary Large Label"
                variants={{
                    variant: 'primary', // Generates: primitive-text-primary
                    size: '2xl' // Generates: primitive-text-2xl
                }}
            />

            <Label
                htmlFor="input2"
                text="Secondary Medium Label"
                variants={{
                    variant: 'secondary', // Generates: primitive-text-secondary
                    size: 'md' // Generates: primitive-text-md
                }}
            />

            <Label
                htmlFor="input3"
                text="Label with custom classes"
                variants={{
                    variant: 'primary',
                    size: 'lg',
                    className: 'font-bold' // Additional custom classes can go here
                }}
            />
        </div>
    )
}

// This will generate classes like:
// "primitive-text primitive-text-primary primitive-text-2xl"
// "primitive-text primitive-text-secondary primitive-text-md"
// "primitive-text primitive-text-primary primitive-text-lg font-bold"
