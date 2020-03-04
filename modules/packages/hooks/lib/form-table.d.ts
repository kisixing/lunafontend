import { UseSearchResultConfig } from './search-result';
declare type StoreBaseValue = string | number | boolean;
export declare type StoreValue = StoreBaseValue | Store | StoreBaseValue[];
export interface Store {
  [name: string]: StoreValue | undefined;
}
export interface SearchResponseData {
  dataSource: Store[];
  total?: number;
}
export interface UseSearchResultAntdConfig
  extends UseSearchResultConfig<SearchResponseData, Store> {
  defaultPageSize?: number;
  defaultCurrent?: number;
  defaultFormValues?: Store | (() => Promise<Store> | Store);
  form: any;
}
export declare const useFormTable: (
  config: UseSearchResultAntdConfig
) => {
  form: any;
  formProps:
    | {
        form: any;
        onFinish: (values: Store) => void;
        initialValues: undefined;
      }
    | {
        onSubmit(e: any): void;
        form?: undefined;
        onFinish?: undefined;
        initialValues?: undefined;
      };
  tableProps: {
    pagination: {
      pageSize: number;
      current: number;
      defaultPageSize: number;
      defaultCurrent: number;
      total: number;
    };
    loading: boolean;
    dataSource: Store[];
    onChange: (pagination: any, filters: any, sorter: any) => void;
  };
  loading: boolean;
  defaultFormValuesLoading: boolean;
  formValues: {
    [x: string]: StoreValue;
  };
  filters: StoreValue;
  sorter: StoreValue;
  current: number;
  pageSize: number;
  dataSource: Store[];
  total: number;
  search: (data: any) => void;
};
export {};
