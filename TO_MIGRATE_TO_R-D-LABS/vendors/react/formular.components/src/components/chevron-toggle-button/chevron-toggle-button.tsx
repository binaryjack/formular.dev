import { Button, IButtonVariant } from '@components/button/button'

import { ToggleableStateType } from 'formular.dev.lib'

import useAppContext from '@components/context/app-context/app-context.context'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export interface IChevronToggleButtonProps {
    id: string
    toggleState: ToggleableStateType
    handleDrawerOpenState: (
        e: React.MouseEvent<HTMLButtonElement>,
        state: ToggleableStateType
    ) => void
    variantProperties?: Partial<IButtonVariant>
}

export const ChevronToggleButton = ({
    id,
    toggleState,
    handleDrawerOpenState,
    variantProperties
}: IChevronToggleButtonProps) => {
    const { getConfiguration } = useAppContext()
    const basicConfig = getConfiguration<Partial<IButtonVariant> | undefined>(
        'rendering',
        'commands',
        'primary'
    )

    console.log('ChevronToggleButton render:', { id, toggleState })

    return (
        <Button
            id={`${id}-toggle-drawer-btn`}
            title={'Toggle Drawer'}
            variantProperties={{ ...basicConfig, ...variantProperties }}
            onClickCallback={(e) =>
                handleDrawerOpenState(
                    e,
                    ['closed', 'idle'].includes(toggleState) ? 'open' : 'closed'
                )
            }
            aria-expanded={toggleState === 'open'}
            aria-controls={`${id}-drawer-wrapper`}
            isToggle={toggleState === 'open'}
        >
            {['closed', 'idle'].includes(toggleState) ? <FaChevronDown /> : <FaChevronUp />}
        </Button>
    )
}
