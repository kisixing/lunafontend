/// <reference types="react" />
declare const _default: (bizSn: string, setPdfBase64: any, setBizSn: import("react").Dispatch<import("react").SetStateAction<string>>, empId?: string) => {
    fetchQrCode: () => void;
    qrCodeBase64: string;
    modalVisible: boolean;
    setModalVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    qrCodeBase64Loading: boolean;
    signed: boolean;
};
export default _default;
