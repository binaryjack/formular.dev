import { IDateObject } from '../../../../components/date-picker/core/models/date-object.models';
import { INDate } from '../../../framework/schema/descriptor/i-n-date';
import { TGetter, TSetter } from '../value-manager.types';
export declare const dateGetter: TGetter<string | null>;
export declare const dateSetter: TSetter<Date | IDateObject | INDate | string | null>;
