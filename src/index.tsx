import './index.css'

import ReactDOM from 'react-dom/client'

import App from './App'
import { AppContextProvider } from './components/context/appContext/AppContext'
import { ScrollContext } from './core/hooks/screen/Scrolling'

document.title = import.meta.env.VITE_APP_NAME ?? ''
const rootComponent = document.getElementById('root')

const root = ReactDOM.createRoot(rootComponent!)
root.render(
    <ScrollContext>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </ScrollContext>
)
