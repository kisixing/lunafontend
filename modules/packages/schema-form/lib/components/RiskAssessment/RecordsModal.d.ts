import { PureComponent } from 'react';
declare class RecordsModal extends PureComponent<{
    visible: boolean;
    onCancel: (b: boolean) => void;
}> {
    render(): JSX.Element;
}
export default RecordsModal;
