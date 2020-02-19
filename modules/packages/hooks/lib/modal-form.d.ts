import { UseFormConfig } from './form';
export interface UseModalFormConfig extends UseFormConfig {
    defaultVisible?: boolean;
    autoSubmitClose?: boolean;
    autoResetForm?: boolean;
}
export declare const useModalForm: (config: UseModalFormConfig) => {
    form: any;
    visible: boolean;
    show: () => void;
    close: () => void;
    modalProps: {
        onOk: () => void;
        visible: boolean;
        onCancel: () => void;
    };
    formProps: {
        form: any;
        onFinish: (formValue: import("./form").Store) => Promise<unknown>;
        initialValues: {};
    } | {
        onSubmit(e: any): void;
        form?: undefined;
        onFinish?: undefined;
        initialValues?: undefined;
    };
    formLoading: boolean;
    defaultFormValuesLoading: boolean;
    formValues: {};
    initialValues: {};
    formResult: any;
    submit: (values?: import("./form").Store) => Promise<unknown>;
};
