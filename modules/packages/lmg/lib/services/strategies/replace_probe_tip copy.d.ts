import { WsService } from "../WsService";
interface IData {
    "name": "replace_probe_tip";
    "device_no": 1;
    "bed_no": 1;
    "data": {
        "mac": "EB:CI:SE:38:90:22";
        "isfhr": boolean;
    };
}
export declare function add_probe_tip(this: WsService, received_msg: IData): void;
export {};
