import { Button } from '@components/button/button'
import { ComponentSizeType, VariantNameType } from 'formular.design.system'
import { useState } from 'react'

// Convert to arrays for the demo
const ComponentSizeArray: ComponentSizeType[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
const VariantNameArray: VariantNameType[] = [
    'primary',
    'secondary',
    'info',
    'danger',
    'success',
    'warning'
]

export const ButtonsDemo = () => {
    const [clickedInfo, setClickedInfo] = useState<string[]>([])
    const [selectedVariant, setSelectedVariant] = useState<VariantNameType>('primary')
    const [selectedSize, setSelectedSize] = useState<ComponentSizeType>('md')
    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isRounded, setIsRounded] = useState(false)
    const [buttonText, setButtonText] = useState('Action')

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!e.currentTarget) return
        const timestamp = new Date().toLocaleTimeString()
        const newMessage = `Button clicked at ${timestamp}!`
        setClickedInfo((prev) => [...prev.slice(-4), newMessage]) // Keep only last 5 messages
    }

    const clearMessages = () => {
        setClickedInfo([])
    }

    return (
        <div className={`p-6 flex flex-1 flex-row w-full h-full bg-slate-50 gap-6`}>
            {/* Controls Panel */}
            <div
                className={`flex flex-col w-1/3 h-full bg-white rounded-lg shadow-sm p-6 space-y-6`}
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Button Demo</h1>
                    <p className="text-gray-600">
                        Interactive button component showcase with live controls.
                    </p>
                </div>

                {/* Variant Selector */}
                <div>
                    <label
                        htmlFor="variant-select"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Variant
                    </label>
                    <select
                        id="variant-select"
                        title="Select button variant"
                        value={selectedVariant}
                        onChange={(e) => setSelectedVariant(e.target.value as VariantNameType)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {VariantNameArray.map((variant) => (
                            <option key={variant} value={variant}>
                                {variant.charAt(0).toUpperCase() + variant.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Size Selector */}
                <div>
                    <label
                        htmlFor="size-select"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Size
                    </label>
                    <select
                        id="size-select"
                        title="Select button size"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value as ComponentSizeType)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {ComponentSizeArray.map((size) => (
                            <option key={size} value={size}>
                                {size.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Button Text Input */}
                <div>
                    <label
                        htmlFor="button-text-input"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Button Text
                    </label>
                    <input
                        id="button-text-input"
                        type="text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        placeholder="Action"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Toggle Switches */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="disabled-toggle"
                            className="text-sm font-medium text-gray-700"
                        >
                            Disabled
                        </label>
                        <button
                            id="disabled-toggle"
                            type="button"
                            title={`Toggle disabled state - currently ${isDisabled ? 'enabled' : 'disabled'}`}
                            onClick={() => setIsDisabled(!isDisabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isDisabled ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isDisabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="loading-toggle"
                            className="text-sm font-medium text-gray-700"
                        >
                            Loading
                        </label>
                        <button
                            id="loading-toggle"
                            type="button"
                            title={`Toggle loading state - currently ${isLoading ? 'loading' : 'not loading'}`}
                            onClick={() => setIsLoading(!isLoading)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isLoading ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isLoading ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="rounded-toggle"
                            className="text-sm font-medium text-gray-700"
                        >
                            Rounded
                        </label>
                        <button
                            id="rounded-toggle"
                            type="button"
                            title={`Toggle rounded corners - currently ${isRounded ? 'rounded' : 'square'}`}
                            onClick={() => setIsRounded(!isRounded)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isRounded ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isRounded ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Click Messages */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Recent Clicks</h3>
                        {clickedInfo.length > 0 && (
                            <button
                                type="button"
                                title="Clear click messages"
                                onClick={clearMessages}
                                className="text-xs text-blue-600 hover:text-blue-800"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="bg-gray-50 rounded-md p-3 max-h-32 overflow-y-auto">
                        {clickedInfo.length === 0 ? (
                            <p className="text-xs text-gray-500">No clicks yet</p>
                        ) : (
                            clickedInfo.map((message, index) => (
                                <div
                                    key={`message-${index}-${message.slice(-5)}`}
                                    className="text-xs text-gray-700 py-1"
                                >
                                    {message}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Button Preview */}
            <div className={`flex flex-col w-2/3 h-full bg-white rounded-lg shadow-sm p-6`}>
                <div className="flex-1 flex items-center justify-center">
                    <Button
                        id="demo-button"
                        title="Demo button with current configuration"
                        onClickCallback={handleClick}
                        disabled={isDisabled}
                        loading={isLoading}
                        variantProperties={{
                            size: selectedSize,
                            variant: selectedVariant,
                            rounded: isRounded,
                            className: 'transition-all duration-200'
                        }}
                    >
                        {buttonText || 'Action'}
                    </Button>
                </div>

                {/* Configuration Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Current Configuration
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>
                            <span className="font-medium">Variant:</span> {selectedVariant}
                        </div>
                        <div>
                            <span className="font-medium">Size:</span> {selectedSize}
                        </div>
                        <div>
                            <span className="font-medium">Disabled:</span>{' '}
                            {isDisabled ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <span className="font-medium">Loading:</span> {isLoading ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <span className="font-medium">Rounded:</span> {isRounded ? 'Yes' : 'No'}
                        </div>
                        <div>
                            <span className="font-medium">Text:</span> "{buttonText || 'Action'}"
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
