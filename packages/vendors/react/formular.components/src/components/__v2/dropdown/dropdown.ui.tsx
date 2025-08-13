import { useState } from 'react'
import { BaseInput } from '../base-input/base-input.ui'
import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { Drawer } from '../drawer/variants/drawer.ui'
import { FieldSet } from '../field-set/field-set.ui'
import { Label } from '../label/label.ui'
import { Toggleable } from '../toggleable/toggleable'
import { IDropdown } from './dropdown.types'

export const Dropdown = ({
    id,
    label,
    initialState,
    options,
    layout,
    layoutSet,
    ...rest
}: IDropdown) => {
    const [filteredOptions, setFilteredOptions] = useState(options)

    const handleOptionClick = (optionId: string) => {
        console.log(`Option ${optionId} clicked`)
    }

    const handleOnChanged = (value: string) => {
        if (!value) {
            setFilteredOptions(options)
            return
        }
        const lowerCaseValue = value.toLowerCase()
        const filtered = options.filter((option) =>
            option.text.toLowerCase().includes(lowerCaseValue)
        )
        setFilteredOptions(filtered)
    }

    return (
        <Toggleable
            id={`dropdown-${id}`}
            initialState={initialState}
            style={{
                width: 'auto',
                height: 'auto'
            }}
        >
            <FieldSet
                layout={layout}
                layoutSet={layoutSet}
                label={<Label htmlFor={`dropdown-input-${id}`} text={label} className={'mr-2'} />}
                input={
                    <Drawer
                        owner={
                            <BaseInput
                                id={`dropdown-input-${id}`}
                                dataClass={'primitive-input  flex-1'}
                                onChangeCallback={handleOnChanged}
                            />
                        }
                        id={`dropdown-drawer-${id}`}
                        toggleContextId={`dropdown-${id}`}
                        position={'center'}
                    >
                        <div className="p-2">
                            {filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className="cursor-pointer select-none hover:bg-gray-200 p-2 rounded"
                                    onClick={() => handleOptionClick(option.id)}
                                >
                                    {option.text}
                                </div>
                            ))}
                        </div>
                    </Drawer>
                }
                buttons={
                    <ChevronToggle
                        id={`chevron-toggle-${id}`}
                        toggleContextId={`dropdown-${id}`}
                        initialToggleState={'idle'}
                    />
                }
            />
        </Toggleable>
    )
}
