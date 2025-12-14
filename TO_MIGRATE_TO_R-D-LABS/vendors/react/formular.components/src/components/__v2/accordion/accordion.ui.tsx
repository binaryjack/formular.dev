import { clx, genericStyling } from 'formular.design.system'
import { useState } from 'react'

import useKeyBindings from '@adapters/react/hooks/use-key-bindings'

import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { ExpandableDrawer } from '../drawer/variants/expandable-drawer.ui'
import { Label } from '../label/label.ui'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { AccordionContext, IAccordionContext } from './accordion-context'
import { IAccordionProps } from './accordion.types'

export const AccordionUI = ({
    id,
    title,
    children,
    variants = {},
    contentTabIndex,
    headerPreset = 'branded', // NEW: Default to branded preset
    headerStyle // NEW: Optional fine-tuning
}: IAccordionProps) => {
    const [focus, setFocus] = useState<boolean>(false)
    const toggleContextId = `accordion-${id}`
    const { toggleState, setToggleState } = useToggleableContext(toggleContextId)

    // NEW: Enhanced genericStyle call with header support
    const classStyle = genericStyling('accordion', variants)

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

    const ocontextIO: IAccordionContext = {
        id: id,
        tabIndex: contentTabIndex,
        backgroundClass: undefined,
        textClass: undefined
    }

    return (
        <AccordionContext.Provider value={ocontextIO}>
            <div
                tabIndex={-1}
                id={`accordion-${id}-frame`}
                className={clx(classStyle?.backgroundColor, classStyle?.background)}
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
                        'relative flex w-full items-center justify-between cursor-pointer transition-colors duration-200',
                        classStyle?.backgroundColor,
                        classStyle?.borderColor,
                        classStyle?.background
                    )}
                >
                    <Label
                        tabIndex={-1}
                        htmlFor={`${id}-chevron-toggle`}
                        text={title}
                        className={classStyle?.textColor}
                        variants={variants}
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
        </AccordionContext.Provider>
    )
}
