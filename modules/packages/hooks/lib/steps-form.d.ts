import { UseFormConfig } from './form';
export interface UseStepsFormConfig extends UseFormConfig {
    defaultCurrent?: number;
    total?: number;
    isBackValidate?: boolean;
}
export declare const useStepsForm: (config: UseStepsFormConfig) => {
    current: number;
    gotoStep: (step: any) => true | Promise<unknown>;
    stepsProps: {
        current: number;
        onChange: (currentStep: any) => true | Promise<unknown>;
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
    formResult: undefined;
    form: any;
    submit: (values?: import("./form").Store) => Promise<unknown>;
};
