import React, { useRef, useMemo, useState, ReactElement, useEffect, useCallback } from 'react';
import { IFormActions } from '@uform/types';
import StorageHelp, { localforage } from './storage';
import { Modal } from 'antd';
import checkDirtyCreator from './checkDirtyCreator';
import { manager } from './types';
import Context from './Context';
import { FormButtonGroup } from './Buttons/formButtonGroup';
import { post, get } from '@lianmed/request';
import { mapChildren } from './utils/mapChildren';
import { componentNameKey, componentName } from '../SchemaForm';
import { schemasData } from './schemaMockData';
const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const $name: symbol | string = hasSymbol ? Symbol.for('lian.formName') : 'lian.formName';

export { Context };
const connectAdvanced: manager = props => {
  const {
    url = '',
    interrupted = false,
    cache = false,
    getStorageName = () => {
      return `${String(name)}_storage`;
    },
    schemaUrl = 'getSchema',
    name = $name,
    children,
    test = false,
  } = props;

  const [schemas, setSchemas] = useState([]);
  const [initialValues, setInitialValues] = useState([]);

  const all: Array<IFormActions> = useMemo(() => [], []);
  console.log('all', all);
  const storageHelp = useMemo(() => new StorageHelp(getStorageName()), []);

  const setValues = useCallback((values: Array<IFormActions>) => {
    values.forEach((_, index) => {
      const actions = all[index];
      actions &&
        actions.setFormState(state => {
          state.values = _;
        });
    });
  }, []);
  const getValues = useCallback((arr: Array<IFormActions>) => {
    return arr.reduce((result, current) => {
      return { ...result, ...current.getFormState().values };
    }, {});
  }, []);

  const FormRef = useRef(null);

  useEffect(() => {
    localforage.getItem(schemaUrl).then(
      value => {
        // if (!!value) {
        if (false) {
          setSchemas(value as any);
        } else {
          get(schemaUrl).then(value => {
            if (schemaUrl === 'getSchema') {
              value = schemasData;
            }
            setSchemas(value);
            localforage.setItem(schemaUrl, value);
          });
        }
      },
      reason => {
        console.log('reason', reason);
      }
    );

    get(url).then(value => {
      setInitialValues(value);
    });
  }, []);

  if (!schemas.length) {
    return null;
  }

  const collectActions = function(actions: IFormActions) {
    all.push(actions);
  };
  const [onBeforeunloadCb] = checkDirtyCreator(all);

  interrupted && top.addEventListener('beforeunload', onBeforeunloadCb);

  const submit = function() {
    Promise.all(all.map(_ => _.validate()))
      .then(res => {
        let lastCommitData = getValues(all);
        return post(url, {
          data: { data: lastCommitData },
          successText: '提交成功111！',
          loading: '提交中',
          interval: 1000,
        })
          .then(res => {
            console.log('success', res);

            cache && storageHelp.removeItem();
            top.removeEventListener('beforeunload', onBeforeunloadCb);
          })
          .catch(err => {
            console.log('request err', err);
            cache && storageHelp.setItem(lastCommitData);
          });
      })
      .catch(err => {
        // hide();
        console.log('表单验证失败', err);
      });
  };

  cache &&
    storageHelp
      .get()
      .then(value => {
        Modal.confirm({
          title: '加载数据',
          content: '是否加载上次提交失败的数据？',
          onOk() {
            setValues(value);
          },
          onCancel() {},
        });
      })
      .catch(err => {
        console.log(err);
      });

  const newChildren = !test
    ? mapChildren()(children as ReactElement, componentNameKey, componentName, (_, index) => {
        return { schema: schemas[index] || null, initialValues: initialValues || null };
        // return {};
      })
    : children;

  return (
    <Context.Provider value={{ collectActions, FormRef, submit }}>
      <div ref={FormRef}>{newChildren}</div>
    </Context.Provider>
  );
};
connectAdvanced.Buttons = FormButtonGroup;

export default connectAdvanced;
