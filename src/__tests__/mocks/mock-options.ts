import { IOptionItem } from '@core/framework/schema/option-schema/options.scheme.types'

export const mockOptions: IOptionItem[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', selected: true },
    { value: '4', label: 'Option 4', disabled: true }
]

export const mockGroupedOptions = [
    {
        label: 'Group 1',
        options: [
            { value: 'g1-1', label: 'Group 1 Option 1' },
            { value: 'g1-2', label: 'Group 1 Option 2' }
        ]
    },
    {
        label: 'Group 2',
        options: [
            { value: 'g2-1', label: 'Group 2 Option 1' },
            { value: 'g2-2', label: 'Group 2 Option 2' }
        ]
    }
]
