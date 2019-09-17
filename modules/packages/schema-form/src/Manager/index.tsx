import React, { useRef, useMemo } from 'react';
import { IFormActions } from '@uform/types';
import StorageHelp from './storage';
import { message, Modal } from 'antd';
import checkDirtyCreator from './checkDirtyCreator';
import { manager } from './types';
import Context from './Context';
import { FormButtonGroup } from './Buttons/formButtonGroup';
import { post } from '@lianmed/request';
const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const $name: symbol | string = hasSymbol ? Symbol.for('lian.formName') : 'lian.formName';

export { Context };

const connectAdvanced: manager = props => {
  const all: Array<IFormActions> = useMemo(() => [], []);

  const {
    url,
    interrupted = false,
    cache = false,
    getStorageName = () => {
      return `${String(name)}_storage`;
    },

    name = $name,

    mergeFormValues = (arr: Array<IFormActions>) => {
      return arr.reduce((result, current) => {
        return [...result, current.getFormState().values];
      }, []);
    },
    children,
  } = props;
  const storageName = getStorageName();
  const storageHelp = new StorageHelp(storageName);
  const FormRef = useRef(null);
  let lastCommitData: Array<any> = [];

  const collectActions = function(actions: IFormActions) {
    all.push(actions);
  };
  const [onBeforeunloadCb] = checkDirtyCreator(all);

  interrupted && top.addEventListener('beforeunload', onBeforeunloadCb);

  const submit = function() {
    const hide = message.loading('提交中..', 0);
    Promise.all(all.map(_ => _.validate()))
      .then(res => {
        lastCommitData = mergeFormValues(all);

        post(url, {
          data: { data: lastCommitData },
          successText: '提交成功！',
          onErr(data) {
            debugger;
            cache && storageHelp.setItem(lastCommitData);
          },
        })
          .finally(() => {
            console.log('finally');
            hide();
          })
          .then(res => {
            cache && storageHelp.removeItem();
            top.removeEventListener('beforeunload', onBeforeunloadCb);
          });
      })
      .catch(err => {
        hide();
        console.log('表单验证失败');
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
            value.forEach((_, index) => {
              const actions = all[index];
              actions &&
                actions.setFormState(state => {
                  state.values = _;
                });
            });
          },
          onCancel() {},
        });
      })
      .catch(err => {
        console.log(err);
      });

  return (
    <Context.Provider value={{ collectActions, FormRef, submit }}>
      <div ref={FormRef}>{children}</div>
    </Context.Provider>
  );
};
connectAdvanced.Buttons = FormButtonGroup;

export default connectAdvanced;
