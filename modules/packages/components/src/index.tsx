export { default as RemarkCheckbox } from './RemarkCheckbox';
export { default as Icon } from './Icon';
export { default as Editor } from './Editor';

export let configs: Iconfig = {};
interface Iconfig {
  IconScriptUrl?: string;
}
export const config = (data: Iconfig) => {
  configs = { ...data };
};
