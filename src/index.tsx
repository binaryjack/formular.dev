import './index.css'

import ReactDOM from 'react-dom/client'

import App from './App'
import { AppContextProvider } from './components/context/appContext/AppContext'
import { VisualDebug } from './components/context/debug/VisualDebug'
import { ScrollContext } from './components/context/scrolling/Scrolling'

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
