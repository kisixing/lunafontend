let configs: Iconfig = {};
interface Iconfig {
  IconScriptUrl?: string;
}
export default configs;

export const config = (data: Iconfig) => {
  configs = { ...configs, ...data };
};
