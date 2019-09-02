import hoistStatics from 'hoist-non-react-statics';
import React from 'react';
import { IFormActions } from '@uform/types';
import StorageHelp from './storage';
import { message, Modal } from 'antd';

const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const $name: symbol | string = hasSymbol ? Symbol.for('lian.formName') : 'lian.formName';

interface actionItem extends IFormActions {
  name: string | symbol;
}
export default function connectAdvanced({
  // validate = arr => {
  //   Promise.all([]);
  // },
  cache = false,
  getStorageName = () => {
    return `${String(name)}_storage`;
  },
  handleErr = (arr: Array<actionItem>) => {
    return arr;
  },
  name = $name,
  getDisplayName = name => `ConnectAdvanced(${name})`,
  onSubmit = (formData: Array<any>, status: boolean) => {
    return new Promise((res, rej) => {
      if (status) {
        setTimeout(() => res({ formData }), 2000);
      } else {
        setTimeout(() => rej({ formData }), 1000);
      }
    });
  },
  mergeFormValues = (arr: Array<actionItem>) => {
    return arr.reduce((result, current) => {
      return [...result, current.getFormState().values];
    }, []);
  },
  forwardRef = false,
} = {}) {
  const storageName = getStorageName();
  const storageHelp = new StorageHelp(storageName);

  let lastCommitData: Array<any> = [];

  const all: Array<actionItem> = [];
  const saveActions = function(actions: IFormActions) {
    all.push({ name, ...actions });
  };

  const submit = function(status = true) {
    const hide = message.loading('提交中..', 0);
    Promise.all(all.map(_ => _.validate()))
      .then(res => {
        lastCommitData = mergeFormValues(all);

        onSubmit(lastCommitData, status)
          .finally(() => {
            console.log('finally');
            hide();
          })
          .then(res => {
            cache && storageHelp.removeItem();
            message.success('成功！', 5);
          })
          .catch(err => {
            message.error('失败！', 5);
            handleErr(all);
            cache && storageHelp.setItem(lastCommitData);
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

  return function wrapWithConnect(WrappedComponent) {
    const wrappedComponentName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const displayName = getDisplayName(wrappedComponentName);

    function ConnectFunction(props) {
      const _props = { ...props, saveActions, submit };
      top.onbeforeunload = e => {
        return false;
        if (all.some(_ => _.getFormState().dirty)) {
          return false;
        }
      };

      return <WrappedComponent {..._props} />;
    }

    ConnectFunction.WrappedComponent = WrappedComponent;
    ConnectFunction.displayName = displayName;

    if (forwardRef) {
      const forwarded: any = React.forwardRef(function forwardConnectRef(props, ref) {
        return <ConnectFunction {...props} forwardedRef={ref} />;
      });

      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoistStatics(forwarded, WrappedComponent);
    }

    return hoistStatics(ConnectFunction, WrappedComponent);
  };
}
