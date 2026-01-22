import { IConfigurationManager } from '../interfaces/i-configuration-manager'

export const printConfiguration = function (this: IConfigurationManager): void {
    if (this.configurations.length === 0) {
        console.log('No configurations available')
        return
    }

    // Prepare data for console.table
    const tableData = this.configurations.map((config) => ({
        name: config.name,
        'target environment': config.targetEnvironment,
        'is Active': config === this.activeConfiguration ? '✓' : '',
        'JSON configuration': JSON.stringify(config, null, 2).substring(0, 100) + '...'
    }))

    console.table(tableData)
}
