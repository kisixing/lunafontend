import { IConfig } from './config';
import { IWebIM } from "./types";
interface IOpen extends IConfig {
    user?: string;
    token?: string;
}
declare const _default: (userConfig: IOpen) => Promise<IWebIM>;
export default _default;
