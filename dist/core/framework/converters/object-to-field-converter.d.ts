import { IFieldDescriptor } from '../schema/descriptor/field.descriptor';
export declare const mapObjectToFields: (schema: IFieldDescriptor[], dataObject: object, forceShouldValidate?: boolean) => IFieldDescriptor[];
export declare const mapFieldsToObject: (fields: IFieldDescriptor[]) => object;
