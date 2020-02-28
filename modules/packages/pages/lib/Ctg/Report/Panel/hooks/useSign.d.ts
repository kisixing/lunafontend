/// <reference types="react" />
declare const _default: (docid: string, setPdfBase64: any) => {
    fetchQrCode: () => void;
    qrCodeBase64: string;
    modalVisible: boolean;
    setModalVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    qrCodeBase64Loading: boolean;
    signed: boolean;
    archive: () => void;
    archiveLoading: boolean;
    archived: boolean;
};
export default _default;
