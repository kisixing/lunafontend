import { IFormActions } from '@uform/types';

export default function checkDirtyCreator(
  all: Array<IFormActions>
): [() => boolean, (e: any) => any] {
  function checkIsDirty() {
    return !all.every(_ => _.getFormState().pristine);
  }
  return [
    checkIsDirty,
    function onBeforeunloadCb(e: any): void | string {
      if (checkIsDirty()) {
        const confirmationMessage = '表单未完成，是否离开';
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
      }
    },
  ];
}
