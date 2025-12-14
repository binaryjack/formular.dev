import type { IOptionItem } from 'formular.dev.lib'
import { useEffect, useRef, useState } from 'react'

import { BaseInput } from '../base-input/base-input.ui'
import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { Drawer } from '../drawer/variants/drawer.ui'
import { FieldSet } from '../field-set/field-set.ui'
import { Label } from '../label/label.ui'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { DropdownDrawerContent } from './dropdown.drawer-content'
import { IDropdownUIProps } from './dropdown.types'

export const DropdownUI = ({
    id,
    label,
    initialState,
    options,
    layout,
    layoutSet,
    onSelectedOption,
    ...rest
}: IDropdownUIProps) => {
    const togglableContextId = `dropdown-${id}`

    const { setToggleState, toggleState } = useToggleableContext(togglableContextId)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [selectedOption, setSelectedOption] = useState<IOptionItem | undefined>(undefined)

    const inputRef = useRef<HTMLInputElement>(null)
    const handleOptionClick = (option: IOptionItem) => {
        console.log(`Option n°${option.text} clicked`)
        const inputElement = inputRef?.current as unknown as HTMLInputElement
        if (!inputElement) return
        inputElement.value = option.text
        setSelectedOption(option)
    }

    const handleOnChanged = (value: string) => {
        if (!value) {
            setFilteredOptions(options)
            return
        }

        if (toggleState !== 'open') setToggleState('open')

        const lowerCaseValue = value.toLowerCase()
        const filtered = options.filter((option) =>
            option.text.toLowerCase().includes(lowerCaseValue)
        )
        setFilteredOptions(filtered)

        if (filtered.length === 1 && filtered[0].text === value) {
            setSelectedOption(filtered[0])
        } else {
            setSelectedOption(undefined)
        }
    }

    useEffect(() => {
        if (!selectedOption) return
        onSelectedOption?.(selectedOption)
    }, [selectedOption])

    return (
        <FieldSet
            layout={layout}
            layoutSet={layoutSet}
            label={<Label htmlFor={`dropdown-input-${id}`} text={label} className={'mr-2'} />}
            input={
                <Drawer
                    owner={
                        <BaseInput
                            id={`dropdown-input-${id}`}
                            dataClass={'primitive-input'}
                            className={'w-full'}
                            onChangeCallback={handleOnChanged}
                            ref={inputRef}
                        />
                    }
                    id={`dropdown-drawer-${id}`}
                    toggleContextId={togglableContextId}
                    position={'center'}
                >
                    <DropdownDrawerContent
                        filteredOptions={filteredOptions}
                        toggleContextId={togglableContextId}
                        onSelectedOption={handleOptionClick}
                    />
                </Drawer>
            }
            buttons={
                <ChevronToggle
                    id={`chevron-toggle-${id}`}
                    toggleContextId={togglableContextId}
                    initialToggleState={'idle'}
                />
            }
        />
    )
}
