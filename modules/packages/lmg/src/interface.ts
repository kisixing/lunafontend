export interface Drawer {
    resize: () => void;
    init: (data?: any) => void;
    destroy: () => void;
}