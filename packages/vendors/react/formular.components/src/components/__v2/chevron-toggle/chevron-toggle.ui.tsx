import { useEffect } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Button } from '../button/button.ui'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { IChevronToggleProps } from './chevron-toggle.types'

export const ChevronToggle = ({
    id,
    toggleContextId,
    initialToggleState,
    onToggle,
    options
}: IChevronToggleProps) => {
    const { toggleState, setToggleState } = useToggleableContext(toggleContextId)

    const name = `${id}-chevron-toggle`
    const ariaLabel = toggleState === 'open' ? 'Collapse' : 'Expand'
    const ariaExpanded = toggleState === 'open'
    const ariaControls = `${id}-drawer-wrapper`
    const onClickToggleState = ['closed', 'idle'].includes(toggleState) ? 'open' : 'closed'
    const chevronInonState = ['closed', 'idle'].includes(toggleState) ? (
        <FaChevronDown />
    ) : (
        <FaChevronUp />
    )

    useEffect(() => {
        if (!initialToggleState || ['idle'].includes(initialToggleState)) return
        setToggleState(initialToggleState)
    }, [initialToggleState])

    const handleOnToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setToggleState(onClickToggleState)
        onToggle?.(e, onClickToggleState)
    }

    return (
        <Button
            id={name}
            title={name}
            options={options}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            isToggle={ariaExpanded}
            onClick={handleOnToggle}
            children={chevronInonState}
        />
    )
}
