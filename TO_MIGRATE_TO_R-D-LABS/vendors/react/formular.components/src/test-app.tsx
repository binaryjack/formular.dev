import React from 'react'
import { ConfigTest } from './components/test'

/**
 * Test application to verify the configuration fix
 */
const TestApp: React.FC = () => {
    return (
        <div>
            <h1>Configuration Fix Verification</h1>
            <ConfigTest />
        </div>
    )
}

export default TestApp
