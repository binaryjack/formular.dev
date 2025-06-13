import { AppContext } from '@components/context/app-context/app-context.context'
import FormularForm from '@components/formular-form/formular-form'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

// Mock media context
const mockMediaContext = {
    media: 'md' as const,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: {
        '2xs': false,
        xs: false,
        sm: false,
        md: true,
        lg: false,
        xl: false,
        '2xl': false
    },
    orientation: 'landscape' as const,
    x: 0,
    y: 0
}

// Mock app context
const mockAppContext = {
    media: mockMediaContext,
    debug: undefined,
    isMobileDevice: false,
    holdScroll: false,
    setHoldScroll: () => {}
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    formular?: IFormular<any>
    appContext?: typeof mockAppContext
}

/**
 * Custom render function that provides necessary context providers for FORMULAR components
 */
export function renderWithProviders(ui: ReactElement, options: CustomRenderOptions = {}) {
    const { formular, appContext = mockAppContext, ...renderOptions } = options

    function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
        if (formular) {
            return (
                <AppContext.Provider value={appContext}>
                    <FormularForm formular={formular}>{children}</FormularForm>
                </AppContext.Provider>
            )
        }

        return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    }

    return render(ui, { wrapper: Wrapper, ...renderOptions })
}

/**
 * Re-export everything from React Testing Library
 */
export * from '@testing-library/react'

/**
 * Override render method with our custom version
 */
export { renderWithProviders as render }
