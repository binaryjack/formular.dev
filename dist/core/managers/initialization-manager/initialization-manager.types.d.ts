import { IConfiguration } from '../../../project/provider/configuration/i-configuration';
export interface IInitializableDependency {
    readonly dependencyName: string;
    /** says if the dependency has been initialized */
    isInitialized: boolean;
    /** initializes the dependency */
    initialize: (params: IConfiguration) => void;
}
