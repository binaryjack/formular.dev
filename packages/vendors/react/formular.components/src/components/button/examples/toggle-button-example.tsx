import React, { useState } from 'react'
import { Button } from '../button'

/**
 * Example demonstrating proper usage of the Button component as a toggle
 * This shows how to properly handle the toggle state to avoid edge-click issues
 */
export const ToggleButtonExample = () => {
    const [isPressed, setIsPressed] = useState(false)
    const [clickCount, setClickCount] = useState(0)

    const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('Toggle button clicked', {
            currentState: isPressed,
            clientX: e.clientX,
            clientY: e.clientY,
            target: e.target,
            currentTarget: e.currentTarget
        })

        setIsPressed((prev) => !prev)
        setClickCount((prev) => prev + 1)
    }

    const handleRegularClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('Regular button clicked', {
            clientX: e.clientX,
            clientY: e.clientY,
            target: e.target,
            currentTarget: e.currentTarget
        })

        setClickCount((prev) => prev + 1)
    }

    return (
        <div className="p-8 space-y-4">
            <h2 className="text-xl font-bold mb-4">Button Edge Click Test</h2>

            <div className="space-y-2">
                <p>Click Count: {clickCount}</p>

                {/* Toggle Button */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Toggle Button:</h3>
                    <p>State: {isPressed ? 'Pressed' : 'Not Pressed'}</p>
                    <Button
                        id="toggle-button"
                        title="Toggle Button"
                        onClickCallback={handleToggleClick}
                        isToggle={true}
                        isPressed={isPressed}
                        variantProperties={{
                            variant: isPressed ? 'secondary' : 'primary',
                            size: 'md'
                        }}
                    >
                        {isPressed ? 'ON' : 'OFF'}
                    </Button>
                </div>

                {/* Regular Button */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Regular Button:</h3>
                    <Button
                        id="regular-button"
                        title="Regular Button"
                        onClickCallback={handleRegularClick}
                        variantProperties={{
                            variant: 'primary',
                            size: 'md'
                        }}
                    >
                        Click Me
                    </Button>
                </div>

                {/* Reset Button */}
                <Button
                    id="reset-button"
                    title="Reset"
                    onClickCallback={() => {
                        setIsPressed(false)
                        setClickCount(0)
                    }}
                    variantProperties={{
                        variant: 'secondary',
                        size: 'sm'
                    }}
                >
                    Reset
                </Button>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded">
                <h4 className="font-semibold mb-2">Testing Instructions:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Try clicking on the edges of the buttons</li>
                    <li>Try clicking on the center of the buttons</li>
                    <li>Observe the console logs for click event details</li>
                    <li>Verify that the toggle state changes correctly</li>
                    <li>Check that edge clicks don't cause unexpected behavior</li>
                </ul>
            </div>
        </div>
    )
}

export default ToggleButtonExample
