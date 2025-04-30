import './index.css'

import App from '@components/app'
import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'
import ReactDOM from 'react-dom/client'

document.title = import.meta.env.VITE_APP_NAME ?? ''
const rootComponent = document.getElementById('root')

const root = ReactDOM.createRoot(rootComponent!)
root.render(
    <VisualDebug>
        <ScrollContext>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
