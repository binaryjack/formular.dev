import { MasterDetailLayout } from '@components/layout/master-detail/master-detail-layout'
import { newTab } from '@components/smat-tab/helpers/new-tab'
import { TabManager } from '@components/smat-tab/manager/tab-manager'
import { SmartTabsMain } from '@components/smat-tab/smart-tabs-main'
import { ITab } from '@components/smat-tab/types/i-tab'
import { lazy, startTransition, Suspense, useState } from 'react'
import { BsCalendarDate, BsCheck2, BsMenuButton, BsSliders } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { MdEditNote, MdOutlineDirectionsRailway, MdRadio, MdSwitchLeft } from 'react-icons/md'
import { TbAB, TbDropletDown } from 'react-icons/tb'

const ButtonsDemo = lazy(() =>
    import('@demo/buttons/buttons-demo').then((module) => ({ default: module.ButtonsDemo }))
)
const FormDemo = lazy(() => import('@demo/form-demo/form-demo'))
const ValidationDemoCheckInput = lazy(
    () => import('@demo/validation-demos/validation-demo-check-input')
)
const ValidationDemoDatePicker = lazy(
    () => import('@demo/validation-demos/validation-demo-date-picker')
)
const ValidationDemoDelayInput = lazy(
    () => import('@demo/validation-demos/validation-demo-delay-input')
)
const ValidationDemoRadioInput = lazy(
    () => import('@demo/validation-demos/validation-demo-radio-input')
)
const ValidationDemoRangeSlider = lazy(
    () => import('@demo/validation-demos/validation-demo-range-slider')
)
const ValidationDemoRteInput = lazy(
    () => import('@demo/validation-demos/validation-demo-rte-input')
)
const ValidationDemoSelectInput = lazy(
    () => import('@demo/validation-demos/validation-demo-select-input')
)
const ValidationDemoTextInput = lazy(
    () => import('@demo/validation-demos/validation-demo-text-input')
)

export enum DemoType {
    Form = 'form',
    Check = 'check',
    Text = 'text',
    Rte = 'rte',
    Slider = 'slider',
    Datepicker = 'datepicker',
    Radio = 'radio',
    Delay = 'delay',
    Select = 'select',
    Switch = 'switch',
    Buttons = 'buttons',
    SmartTabs = 'smart-tabs'
}

type demoTypes = keyof typeof DemoType

const tabs = [
    newTab('tab1', DemoType.Buttons, <BsMenuButton />),
    newTab('tab2', DemoType.Check, <BsCheck2 />),
    newTab('tab3', DemoType.Text, <FaEdit />),
    newTab('tab4', DemoType.Rte, <MdEditNote />),
    newTab('tab5', DemoType.Slider, <BsSliders />),
    newTab('tab6', DemoType.Datepicker, <BsCalendarDate />),
    newTab('tab7', DemoType.Radio, <MdRadio />),
    newTab('tab8', DemoType.Delay, <MdOutlineDirectionsRailway />),
    newTab('tab9', DemoType.Select, <TbDropletDown />),
    newTab('tab10', DemoType.Switch, <MdSwitchLeft />),
    newTab('tab11', DemoType.SmartTabs, <TbAB />)
]

const tabManager = new TabManager(tabs)

const demos = (demo: ITab) => {
    switch (demo.label) {
        case DemoType.Form:
            return <FormDemo />
        case DemoType.Check:
            return <ValidationDemoCheckInput />
        case DemoType.Text:
            // You would import and use your text input validation demo here
            // Example: return <ValidationDemoTextInput />
            return <ValidationDemoTextInput />
        case DemoType.Rte:
            // Example: return <ValidationDemoRteInput />
            return <ValidationDemoRteInput />
        case DemoType.Slider:
            // Example: return <ValidationDemoSliderInput />
            return <ValidationDemoRangeSlider />
        case DemoType.Datepicker:
            // Example: return <ValidationDemoDatePickerInput />
            return <ValidationDemoDatePicker />
        case DemoType.Radio:
            // Example: return <ValidationDemoRadioInput />
            return <ValidationDemoRadioInput />
        case DemoType.Delay:
            // Example: return <ValidationDemoDelayInput />
            return <ValidationDemoDelayInput />
        case DemoType.Select:
            // Example: return <ValidationDemoSelectInput />
            return <ValidationDemoSelectInput />

        case DemoType.Buttons:
            // Example: return <ValidationDemoButtonsInput />
            return <ButtonsDemo />

        default:
            return null
    }
}

export const Demos = () => {
    const [selectedTab, setSelectedTab] = useState<ITab | undefined>()
    const handleSelected = (tab: ITab) => {
        startTransition(() => {
            setSelectedTab(tab)
        })
    }

    return (
        <MasterDetailLayout
            menu={<SmartTabsMain manager={tabManager} onSelected={handleSelected} />}
            body={
                <Suspense fallback={<div>Loading...</div>}>
                    <div>{selectedTab && demos(selectedTab)}</div>
                </Suspense>
            }
        />
    )
}
