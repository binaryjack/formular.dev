import { useMemo, useState } from 'react'

import { Button } from '../../components/button/Button'
import CheckInput from '../../components/checkInput/CheckInput'
import { CenterElementDebug } from '../../components/context/debug/CenterElementDebug'
import { DateObject } from '../../components/datePicker/core/DateObject.object'
import DateInput from '../../components/datePicker/DatePicker'
import DatePickerContentDrawer from '../../components/datePicker/DatePicker.drawer.content'
import { Drawer } from '../../components/drawer/Drawer'
import { DrawerContent } from '../../components/drawer/Drawer.content'
import { DrawerOpenStateType } from '../../components/drawer/Drawer.types'
import FormyForm from '../../components/Formy/Formy.form'
import InputText from '../../components/inputText/InputText'
import RadioInput from '../../components/radioInput/RadioInput'
import Select from '../../components/selectInput/Select'
import SelectDrawerContent from '../../components/selectInput/Select.drawer.content'
import { useCenterElementTrigger } from '../../core/hooks/screen/useCenterElement'
import { Signals } from '../../core/signals/signal'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { IFieldDescriptor } from '../../dependency/schema/descriptor/field.descriptor'
import { demoFormInstance } from './DormDemo.instance'

//https://github.com/preactjs/signals/blob/main/packages/core/CHANGELOG.md
const { Signal, useSignal } = Signals

// // build a schema for the fields to be used
// const item = controlDemoSchema
// // map schema to fieldsDescriptors collection from schema
// const fieldDescriptors = mapSchemaToFieldDescriptor(item, getTranslationBuilder, getTranslations())

// const { newFieldFromDescriptors, useField } = FieldInputCreator

// const outSideFields = newFieldFromDescriptors(fieldDescriptors)

// outSideFields?.[3].hasChanges(() => {
//     // console.log('Field updated', outSideFields?.[3])
// })

interface IFieldDemoProps {
    fields: IFieldDescriptor[]
}

const FormDemo = () => {
    const [openState, setOpenState] = useState<DrawerOpenStateType>('closed')

    const { scrollPosition, elementRef, elementPositionRefs, toggle } =
        useCenterElementTrigger<HTMLDivElement>()

    const handleDrawerOpenState = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => {
        e?.stopPropagation?.()
        e?.preventDefault?.()
        setOpenState(state)
    }

    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = new DateObject()
        const ed = new DateObject()

        if (sd && startDate) sd.setFromObject?.(startDate)
        if (ed && endDate) ed.setFromObject?.(endDate)
        console.log('date selected', sd.toString?.('mm/dd/yyyy'), ed.toString?.('mm/dd/yyyy'))
    }

    const fieldSelect = useMemo(() => {
        return demoFormInstance?.fields.find((o) => o.name === 'selectOptionsId')
    }, [demoFormInstance])

    // conventions.IdIsEmpty()

    return (
        <FormyForm formy={demoFormInstance}>
            <DatePickerContentDrawer
                onSelectDate={onSelectDate}
                id={'DatePickerDrawerDemoStatic'}
            />
            <SelectDrawerContent
                filterTriggerDelay={500}
                items={fieldSelect?.options ?? []}
                onSelectItem={(value) => fieldSelect?.onSelectItem(value)}
            />
            <InputText fieldName={'inputControl'} />
            <Select fieldName={'selectOptionsId'} />
            <div className={`relative bg-slate-400   w-full h-full p-6 `}>
                <div id={`demo-drawer-drawer-slot-center-container`} />
                <div id={`demo-drawer-drawer-slot-top-container`} />
                <Drawer
                    id={`demo-drawer`}
                    onSetOpenState={handleDrawerOpenState}
                    drawerOpenState={openState}
                    position={'bottom'}
                >
                    <DrawerContent id={`demo-drawer`} />
                </Drawer>
                <Button
                    onClickCallback={(e) => setOpenState('open')}
                    id={'drawer-button-demo'}
                    title={'drawer-button'}
                >
                    Demo Drawer
                </Button>

                <CenterElementDebug
                    centerScreen={scrollPosition.centerScreen}
                    parentHeight={elementPositionRefs.height}
                    screenTop={scrollPosition.screenTop}
                />

                <div id={`demo-drawer-drawer-slot-bottom-container`} />
            </div>

            <CheckInput fieldName={'trueFalseValue'} />
            <RadioInput fieldName={'selectedRadioId'} />
            <DateInput fieldName={'dateTimeValue'} />
        </FormyForm>
    )
}
export default FormDemo
