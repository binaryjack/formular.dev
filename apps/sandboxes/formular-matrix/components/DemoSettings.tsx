'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface DemoSettingsContextValue {
  apiDelay: number
  setApiDelay: (delay: number) => void
}

const DemoSettingsContext = createContext<DemoSettingsContextValue | null>(null)

export function useDemoSettings() {
  const context = useContext(DemoSettingsContext)
  if (!context) {
    throw new Error('useDemoSettings must be used within DemoSettingsProvider')
  }
  return context
}

export function DemoSettingsProvider({ children }: { children: ReactNode }) {
  const [apiDelay, setApiDelay] = useState(0)

  return (
    <DemoSettingsContext.Provider value={{ apiDelay, setApiDelay }}>
      {children}
    </DemoSettingsContext.Provider>
  )
}

export function DemoSettings() {
  const { apiDelay, setApiDelay } = useDemoSettings()

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label htmlFor="api-delay" className="block text-sm font-medium text-gray-200 mb-2">
          API Delay (ms)
        </label>
        <input
          id="api-delay"
          type="number"
          min="0"
          max="5000"
          step="100"
          value={apiDelay}
          onChange={(e) => setApiDelay(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-400">
          Simulates API response delay. Button will show spinner and form will be disabled.
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-300">
        <span>Current delay:</span>
        <span className="font-mono font-semibold text-blue-400">{apiDelay}ms</span>
      </div>
    </div>
  )
}
