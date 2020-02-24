import { IConfig } from './config';
import { IWebIM } from "./types/index";
interface IOpen extends IConfig {
    user?: string;
    token?: string;
}
declare const _default: (userConfig: IOpen) => Promise<IWebIM>;
export default _default;
