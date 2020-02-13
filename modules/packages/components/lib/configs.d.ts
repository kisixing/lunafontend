declare let configs: Iconfig;
interface Iconfig {
    IconScriptUrl?: string;
}
export default configs;
export declare const config: (data: Iconfig) => void;
