import { TabBuilder } from '@components/smart-tab/builder/tab-builder'
import { ITabBuilder } from '@components/smart-tab/builder/tab-builder.types'
import { BsCalendar, BsCheck, BsInputCursorText, BsSliders2 } from 'react-icons/bs'
import { FaHandshake, FaReact } from 'react-icons/fa'
import {
    MdApi,
    MdArchitecture,
    MdArrowDropDown,
    MdDesignServices,
    MdFeaturedPlayList,
    MdNavigation,
    MdNumbers,
    MdPattern,
    MdRadioButtonChecked,
    MdStart,
    MdSummarize,
    MdSwitchLeft,
    MdTab
} from 'react-icons/md'
import {
    TbAlarm,
    TbColorSwatch,
    TbComponents,
    TbDeviceVisionPro,
    TbForms,
    TbHome,
    TbIcons,
    TbLibrary,
    TbRoad,
    TbSpacingHorizontal,
    TbTable,
    TbToggleLeft,
    TbTypography
} from 'react-icons/tb'

export const createTabBuilders = (): ITabBuilder[] => {
    const tabBuilders: ITabBuilder[] = []

    tabBuilders.push(new TabBuilder('home', 'Home').path('/').icon(<TbHome />))
    tabBuilders.push(
        new TabBuilder('toc', 'Table of content').path('/table-of-content').icon(<TbTable />)
    )

    tabBuilders.push(new TabBuilder('vision', 'Vision').path('/vision').icon(<TbDeviceVisionPro />))
    tabBuilders.push(
        new TabBuilder('features', 'Features').path('/features').icon(<MdFeaturedPlayList />)
    )
    tabBuilders.push(new TabBuilder('patterns', 'Patterns').path('/patterns').icon(<MdPattern />))
    tabBuilders.push(
        new TabBuilder('architecture', 'Architecture')
            .path('/architecture')
            .icon(<MdArchitecture />)
    )
    tabBuilders.push(new TabBuilder('roadmap', 'Roadmap').path('/roadmap').icon(<TbRoad />))
    tabBuilders.push(
        new TabBuilder('contributing', 'Contributing').path('/contributing').icon(<FaHandshake />)
    )

    tabBuilders.push(
        new TabBuilder('design-system', 'Design System')
            .path('/design-system')
            .icon(<MdDesignServices />)
            .childrens([
                new TabBuilder('colors', 'Colors')
                    .path('/design-system/colors')
                    .icon(<TbColorSwatch />),
                new TabBuilder('typography', 'Typography')
                    .path('/design-system/typography')
                    .icon(<TbTypography />),
                new TabBuilder('spacing', 'Spacing')
                    .path('/design-system/spacing')
                    .icon(<TbSpacingHorizontal />),
                new TabBuilder('icons', 'Icons').path('/design-system/icons').icon(<TbIcons />),
                new TabBuilder('components', 'Components')
                    .path('/design-system/components')
                    .icon(<TbComponents />)
            ])
    )
    tabBuilders.push(
        new TabBuilder('formular', 'Formular.dev')
            .path('/formular')
            .icon(<TbLibrary />)
            .childrens([
                new TabBuilder('overview', 'Overview')
                    .path('/formular/overview')
                    .icon(<MdSummarize />),
                new TabBuilder('getting-started', 'Getting Started')
                    .path('/formular/getting-started')
                    .icon(<MdStart />),
                new TabBuilder('api', 'API Reference').path('/formular/api').icon(<MdApi />)
            ])
    )
    tabBuilders.push(
        new TabBuilder('components-library', 'Components Lib')
            .path('/components-library')
            .icon(<FaReact />)
            .childrens([
                new TabBuilder('buttons', 'Buttons')
                    .path('/components-library/buttons')
                    .icon(<TbAlarm />),
                new TabBuilder('navigation', 'Navigation')
                    .path('/components-library/navigation')
                    .icon(<MdNavigation />)
                    .childrens([
                        new TabBuilder('smart-tabs', 'Smart Tabs')
                            .path('/components-library/navigation/smart-tabs')
                            .icon(<MdTab />)
                    ]),
                new TabBuilder('form-inputs', 'Form Inputs')
                    .path('/components-library/form-inputs')
                    .icon(<TbForms />)
                    .childrens([
                        new TabBuilder('text-inputs', 'Text Inputs')
                            .path('/components-library/form-inputs/text-inputs')
                            .icon(<BsInputCursorText />),
                        new TabBuilder('numeric-inputs', 'Numeric Input')
                            .path('/components-library/form-inputs/numeric-inputs')
                            .icon(<MdNumbers />),
                        new TabBuilder('date-picker', 'Date picker')
                            .path('/components-library/form-inputs/date-picker')
                            .icon(<BsCalendar />),
                        new TabBuilder('selects', 'Selects')
                            .path('/components-library/form-inputs/selects')
                            .icon(<MdArrowDropDown />),
                        new TabBuilder('checkboxes', 'Checkboxes')
                            .path('/components-library/form-inputs/checkboxes')
                            .icon(<BsCheck />),
                        new TabBuilder('radios', 'Radios')
                            .path('/components-library/form-inputs/radios')
                            .icon(<MdRadioButtonChecked />),
                        new TabBuilder('toggles', 'Toggles')
                            .path('/components-library/form-inputs/toggles')
                            .icon(<TbToggleLeft />),
                        new TabBuilder('switches', 'Switches')
                            .path('/components-library/form-inputs/switches')
                            .icon(<MdSwitchLeft />),
                        new TabBuilder('sliders', 'Sliders')
                            .path('/components-library/form-inputs/sliders')
                            .icon(<BsSliders2 />)
                    ])
            ])
    )

    return tabBuilders
}
