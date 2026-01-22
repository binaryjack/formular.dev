/**
 * In order to get a configuration value you must
 * provide a dotted notation path to the wanted configuration topic.
 *
 * Per insance: If you look for config: { validations: { validators: [{name: 'Validator1'}, {name: 'Validator2'}], patterns: [{name: 'pattern1'},{name: 'pattern2'}] } }
 * the correct way to get this is :   config.getConfig('validations', 'validators', 'Validator1')
 */
export type SearchConfigType<T> = (...names: string[]) => T | undefined
