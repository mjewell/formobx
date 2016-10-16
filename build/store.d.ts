import FieldStore from './components/field/store';
import { IKeyValueMap, IObservableArray, ObservableMap } from 'mobx';
export interface IStringMap {
    [s: string]: string;
}
export interface IStoreOptions {
    initialValues?: IStringMap;
}
export default class Store {
    submitting: boolean;
    fields: ObservableMap<FieldStore>;
    errors: IObservableArray<string>;
    private initialValues;
    constructor(options: IStoreOptions);
    readonly fieldsJS: IKeyValueMap<FieldStore>;
    readonly fieldValues: {
        [s: string]: string;
    };
    readonly fieldErrors: {
        [s: string]: string;
    };
    addField(name: string, field: FieldStore): void;
    updateSubmitting(submitting: boolean): void;
    clearErrors(): void;
    updateErrors(errors: string[]): void;
    updateAllErrors(errors: {
        [s: string]: string[] | undefined;
        _base?: string[];
    }): void;
}
