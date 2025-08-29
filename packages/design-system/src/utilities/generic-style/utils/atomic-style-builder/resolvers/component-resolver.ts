import { ComponentsTypes } from '@/types/enums/components-enum'
import { VariantType } from '@/types/enums/variants-enum'
import { AppModeType } from '@/types/types/app-mode-type.type'
import { COMPONENT_PRESET } from '../presets/component-presets'

export const componentResolver = (
    mode: AppModeType,
    component: ComponentsTypes,
    variant: VariantType
) => {
    const currentComponent = COMPONENT_PRESET[component]
    return currentComponent?.find(o => o.mode === mode && o.variant === variant)
}
