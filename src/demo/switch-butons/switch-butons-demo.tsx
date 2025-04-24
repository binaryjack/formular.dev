import { SwitchButton } from '../../components/switch-button/switch-button'

export const SwitchButtonsDemo = () => {
    return (
        <div>
            <SwitchButton
                fieldName={'toggle-2xs'}
                options={{ orientation: 'horizontal', size: '2xs' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-xs'}
                options={{ orientation: 'horizontal', size: 'xs' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-md'}
                options={{ orientation: 'horizontal', size: 'md' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-lg'}
                options={{ orientation: 'horizontal', size: 'lg' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-xl'}
                options={{ orientation: 'horizontal', size: 'xl' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-2xl'}
                options={{ orientation: 'horizontal', size: '2xl' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-primary'}
                options={{ orientation: 'horizontal', size: 'xs', variant: 'primary' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-secondary'}
                options={{ orientation: 'horizontal', size: 'xs', variant: 'secondary' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-info'}
                options={{ orientation: 'horizontal', size: 'xs', variant: 'info' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-success'}
                options={{ orientation: 'horizontal', size: 'xs', variant: 'success' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-warning'}
                options={{ orientation: 'horizontal', size: 'xs', variant: 'warning' }}
                onToggle={() => {}}
                isToggle={true}
            />
            <SwitchButton
                fieldName={'toggle-danger'}
                options={{ orientation: 'horizontal', size: 'xs', variant: 'danger' }}
                onToggle={() => {}}
                isToggle={true}
            />
        </div>
    )
}

export default SwitchButtonsDemo
