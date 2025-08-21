import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { clx, genericStyle } from 'formular.design.system'
import { useState } from 'react'
import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { ExpandableDrawer } from '../drawer/variants/expandable-drawer.ui'
import { Label } from '../label/label.ui'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { IAccordionProps } from './accordion.types'

export const AccordionUI = ({ id, title, children, variants = {} }: IAccordionProps) => {
    const [focus, setFocus] = useState<boolean>(false)
    const toggleContextId = `accordion-${id}`
    const { toggleState, setToggleState } = useToggleableContext(toggleContextId)

    const classStyle = genericStyle({
        componentTypes: ['accordion', 'typography'],
        states: { hasFocused: true },
        ...variants
    })

    const clContainerBackground = [...classStyle.backGround, 'accordion-container']
    const clHeaderBackground = [
        ...classStyle.backGround,
        'accordion-header',
        `accordion-header-${variants.variant || 'neutral'}`
    ]
    // Never use generic text styles for header - CSS variants handle all text colors
    const cltext: string[] = []
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
                onKeyDown={handleKeyDown}
                onClick={handleOnClick}
                className={clx(
                    'relative flex w-full items-center justify-between gap-2 cursor-pointer',
                    ...clHeaderBackground,
                    ...clborders,
                    ...clstates
                )}
            >
                <Label
                    tabIndex={-1}
                    htmlFor={`${id}-chevron-toggle`}
                    text={title}
                    className={clx(...cltext)}
                    // Don't pass variants to Label as CSS handles header text colors
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
