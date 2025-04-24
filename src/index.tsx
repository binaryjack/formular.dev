import './index.css'

import ReactDOM from 'react-dom/client'

import App from './app'
import { AppContextProvider } from './components/context/app-context/app-context'
import { VisualDebug } from './components/context/debug/visual-debug'
import { ScrollContext } from './components/context/scrolling/scrolling'

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
