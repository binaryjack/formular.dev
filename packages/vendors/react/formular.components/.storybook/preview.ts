import type { Decorator } from '@storybook/react'
import type { Preview } from '@storybook/react-vite'
import 'formular.design.system/styles'
import React from 'react'
import { AppContextProvider } from '../src/components/context/app-context/app-context'
import { VisualDebug } from '../src/components/context/debug/visual-debug'
import '../src/index.css'

// Global decorator to provide necessary context providers
const withAppContext: Decorator = (Story) => {
    return React.createElement(VisualDebug, {
        options: { enabled: false, color: '#000000' },
        children: React.createElement(AppContextProvider, {
            debug: { enabled: false, color: '#000000' },
            setupOptions: {
                includeCoreManagers: true,
                includeFormularManager: true,
                includeInputEngine: true,
                includeBaseConfigurations: true
            },
            children: React.createElement(Story)
        })
    })
}

const preview: Preview = {
    decorators: [withAppContext],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        docs: {
            toc: true
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#ffffff'
                },
                {
                    name: 'dark',
                    value: '#333333'
                },
                {
                    name: 'formular-primary',
                    value: '#f8fafc'
                }
            ]
        },
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '375px',
                        height: '667px'
                    }
                },
                tablet: {
                    name: 'Tablet',
                    styles: {
                        width: '768px',
                        height: '1024px'
                    }
                },
                desktop: {
                    name: 'Desktop',
                    styles: {
                        width: '1024px',
                        height: '768px'
                    }
                },
                large: {
                    name: 'Large Desktop',
                    styles: {
                        width: '1440px',
                        height: '900px'
                    }
                }
            }
        }
    },
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: ['light', 'dark'],
                dynamicTitle: true
            }
        }
    }
}

export default preview
