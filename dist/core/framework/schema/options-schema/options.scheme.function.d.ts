import { IOptionItem } from './options.scheme.types';
declare const baseOptionSchemaItem: (sequenceId: number, id: string, value: string, text: string, disabled?: boolean, selected?: boolean) => IOptionItem;
export default baseOptionSchemaItem;
