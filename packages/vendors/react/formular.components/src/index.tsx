import './index.css'

// Remove the separate ServiceManagerProvider import
// import { ServiceManagerProvider } from '@adapters/react'
import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'
import ReactDOM from 'react-dom/client'
import App from './app'

document.title = import.meta.env.VITE_APP_NAME ?? ''
const rootComponent = document.getElementById('root')

const root = ReactDOM.createRoot(rootComponent!)
root.render(
    <VisualDebug>
        <ScrollContext>
            {/* ✅ Single provider that handles both app context and service manager */}
            <AppContextProvider
                setupOptions={{
                    includeCoreManagers: true,
                    includeFormularManager: true,
                    includeInputEngine: true,
                    includeBaseConfigurations: true
                }}
            >
                <App />
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
