import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { clx, genericStyle } from 'formular.design.system'
import { useState } from 'react'
import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { ExpandableDrawer } from '../drawer/variants/expandable-drawer.ui'
import { Label } from '../label/label.ui'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { IAccordionProps } from './accordion.types'

export const AccordionUI = ({
    id,
    title,
    children,
    variants = {},
    headerPreset = 'branded', // NEW: Default to branded preset
    headerStyle // NEW: Optional fine-tuning
}: IAccordionProps) => {
    const [focus, setFocus] = useState<boolean>(false)
    const toggleContextId = `accordion-${id}`
    const { toggleState, setToggleState } = useToggleableContext(toggleContextId)

    // NEW: Enhanced genericStyle call with header support
    const classStyle = genericStyle({
        componentTypes: ['accordion', 'typography'],
        states: { hasFocused: true },
        headerPreset, // NEW: Pass header preset
        headerStyle, // NEW: Pass header style overrides
        ...variants
    })

    // SIMPLIFIED: Header and container backgrounds are now handled by genericStyle
    const clContainerBackground = classStyle.backGround.filter(
        (cls) => !cls.includes('accordion-header') // Filter out header-specific classes
    )

    const clHeaderBackground = classStyle.backGround.filter(
        (cls) => cls.includes('accordion-header') || cls.includes('bg-')
    )

    // SIMPLIFIED: Text classes are now managed by the header system
    const clHeaderText = classStyle.text

    const clborders = classStyle.borders
    const clstates = Object.values(classStyle.states).filter((o) => !!o)

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.preventDefault?.()
        e?.stopPropagation?.()
        setToggleState()
    }

    const { handleKeyDown } = useKeyBindings({
        onEnterCallback: (e) => {
            e.preventDefault()
            e.stopPropagation()
            setToggleState()
        },
        onSpacebarCallback: (e) => {
            e.preventDefault()
            e.stopPropagation()
            setToggleState()
        }
    })

    return (
        <div
            tabIndex={-1}
            id={`accordion-${id}-frame`}
            className={clx(...clContainerBackground, ...clborders)}
        >
            <div
                tabIndex={0}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                aria-focus={focus}
                role="button"
                aria-expanded={toggleState === 'open'}
                aria-controls={`accordion-${id}-content`}
                onKeyDown={handleKeyDown}
                onClick={handleOnClick}
                className={clx(
                    'relative flex w-full items-center justify-between gap-2 cursor-pointer p-4 transition-colors duration-200',
                    ...clHeaderBackground,
                    ...clHeaderText, // NEW: Uses header-managed text classes
                    ...clborders,
                    ...clstates
                )}
            >
                <Label
                    tabIndex={-1}
                    htmlFor={`${id}-chevron-toggle`}
                    text={title}
                    variants={
                        {
                            // IMPORTANT: Don't pass typography variants to prevent conflicts
                            // Header text styling is now managed by the header system
                        }
                    }
                />
                <ChevronToggle
                    id={`${id}`}
                    tabIndex={0}
                    toggleContextId={toggleContextId}
                    initialToggleState={'idle'}
                />
            </div>
            <ExpandableDrawer id={toggleContextId} toggleContextId={toggleContextId}>
                {children}
            </ExpandableDrawer>
        </div>
    )
}
