import { useCallback, useEffect, useState } from 'react'

import { useField } from '@core/framework/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'
import { RangeSliderRaw } from './components/range-slider.raw'
import { RangeSlideBehavior, RangeSliderHandleStyle } from './components/range-slider.types'

interface RangeSliderSFProps {
    fieldName: string
    min?: number
    max?: number
    step?: number
    behavior?: RangeSlideBehavior
    rangeFillColor?: string
    handleFillColor?: string
    handleStyle?: RangeSliderHandleStyle
    handleStylePercentAdjust?: number
    handlerStyleWidth?: number
    handlerStyleHeight?: number
    slideBarHeight?: number
    debug?: boolean
}

export const RangeSliderSF = ({
    fieldName,
    min = 0,
    max = 100,
    step = 1,
    behavior = 'snap',
    rangeFillColor = 'red',
    handleFillColor = 'red',
    handleStyle = 'circle',
    handleStylePercentAdjust = 1,
    handlerStyleWidth = 7,
    handlerStyleHeight = 7,
    slideBarHeight = 3,
    debug = false
}: RangeSliderSFProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [rangeValue, setRangeValue] = useState<number>(0)
    // Handle slider value change
    const handleChange = useCallback(
        (value: number) => {
            instance?.input?.setValue(value.toString())
            console.log('handleChange', value, instance?.input?.value)
        },
        [instance?.input]
    )

    // Key bindings for accessibility
    const { handleKeyDown } = useKeyBindings({
        onDeleteCallback: () => {
            instance?.input?.clear()
        }
    })

    useEffect(() => {
        setRangeValue(Number(instance?.input?.value))
        console.log('useEffect', instance?.input?.value)
    }, [instance?.input?.getValue()])

    useFieldDefaultValue(instance?.input, (value) => {
        setRangeValue(Number(value))
    })

    return (
        <FieldSet
            inputId={instance?.input?.name ?? conventions.IdIsEmpty()}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <div className="flex w-full min-h-[37px]" onKeyDown={handleKeyDown}>
                <RangeSliderRaw
                    id={`${instance?.input?.name ?? 'range'}-slider`}
                    value={rangeValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    behavior={behavior}
                    rangeFillColor={rangeFillColor}
                    handleFillColor={handleFillColor}
                    handleStyle={handleStyle}
                    handleStylePercentAdjust={handleStylePercentAdjust}
                    handlerStyleWidth={handlerStyleWidth}
                    handlerStyleHeight={handlerStyleHeight}
                    slideBarHeight={slideBarHeight}
                    debug={debug}
                />
            </div>
        </FieldSet>
    )
}
