import { Button, IButtonVariant } from '@components/button/button'
import { conventions } from '@components/context/conventions/conventions'
import { ToggleableStateType } from '@core/framework/common/common.toggleable'
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
    return (
        <Button
            id={`${id}-toggle-drawer-btn`}
            title={'Toggle Drawer'}
            variantProperties={{ ...conventions.commands.basic, ...variantProperties }}
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
