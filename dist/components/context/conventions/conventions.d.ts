import { IButtonVariant } from '../../button/button';
import { DatePickerFormatsEnum } from '../../date-picker/core/date-picker.types';
export declare enum MissingPropEnum {
    ID = "id",
    NAME = "name",
    LABEL = "label"
}
export declare const conventions: {
    IsMissing: (property: MissingPropEnum, componentName: string) => never;
    suffix: {
        labelId: string;
        describedById: string;
    };
    tokens: {
        validationDataToken1: string;
        validationDataToken2: string;
    };
    validations: {
        triggerDelay: number;
    };
    events: {
        onChange: {
            triggerDelay: number;
        };
        onClick: {
            triggerDelay: number;
        };
        onSelect: {
            triggerDelay: number;
        };
        onFocus: {
            triggerDelay: number;
        };
        onBlur: {
            triggerDelay: number;
        };
        onKeyDown: {
            triggerDelay: number;
        };
        onKeyUp: {
            triggerDelay: number;
        };
        onUiUpdate: {
            triggerDelay: number;
        };
        observables: {
            triggerDelay: number;
        };
    };
    dataTypes: {
        date: {
            separator: string;
            formatValue: DatePickerFormatsEnum;
            formatDisplay: DatePickerFormatsEnum;
        };
    };
    formular: {
        creation: {
            enforceConfigurationCheck: boolean;
        };
    };
    components: {
        drawer: {
            height: string;
            width: string;
        };
    };
    commands: {
        basic: Partial<IButtonVariant>;
        submit: Partial<IButtonVariant>;
    };
};
