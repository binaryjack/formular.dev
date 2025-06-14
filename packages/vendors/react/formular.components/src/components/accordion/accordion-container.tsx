import { ChevronToggleButton } from '@components/chevron-toggle-button/chevron-toggle-button'
import { useToggleableContext } from '@components/toggleable/toggleable.context.hook'
import { ToggleableStateType } from 'formular.dev.lib'

export interface IAccordionContainerProps {
    id: string
    title: string
    children: React.ReactNode
    initialState?: ToggleableStateType
}

export const AccordionContainer = ({
    id,
    title,
    children,
    initialState
}: IAccordionContainerProps) => {
    const { setToggleState, toggleState } = useToggleableContext()

    const handleToggleState = (e: React.MouseEvent, state: ToggleableStateType) => {
        if (state === toggleState) return

        setToggleState(state)

        e?.stopPropagation?.()
        e?.preventDefault?.()
    }

    return (
        <div
            className={`relative accordion-container flex min-h-[20px] w-full flex-col bg-gray-100 rounded-md shadow-sm transition-all duration-200 ${
                toggleState === 'closed' ? 'min-h-0' : ''
            }`}
        >
            <div className=" relative accordion-header flex  ">
                <div className="text-lg font-bold flex items-center h-full w-full">{title}</div>
                <div className="accordion-header-toggle">
                    <ChevronToggleButton
                        id={`accordion-${id}`}
                        toggleState={toggleState}
                        handleDrawerOpenState={handleToggleState}
                    />
                </div>
            </div>

            <div
                className={`top-[44px] accordion-content ${initialState ?? toggleState} z-[999] `}
                style={{
                    transformOrigin: 'top',
                    animation:
                        toggleState === 'open'
                            ? `openAccordionY 0.2s ease-in-out forwards`
                            : toggleState === 'closed'
                              ? `closeAccordionY 0.2s ease-in-out forwards`
                              : 'idleAccordion forwards'
                }}
            >
                {children}
            </div>
        </div>
    )
}
