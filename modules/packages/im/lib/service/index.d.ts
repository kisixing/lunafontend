import { IConfig } from '../utils/config';
import { IWebIM } from "../types/index";
interface IOpen extends IConfig {
    user?: string;
    token?: string;
}
export declare const open: (userConfig: IOpen) => Promise<IWebIM>;
export {};
