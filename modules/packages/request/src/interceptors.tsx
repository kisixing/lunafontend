// import { RequestMethod } from "umi-request";
// import { Iconfig, RequestOptions } from "./types";
// import { message } from "antd";

// export default (request:RequestMethod,configs:Iconfig) => {
//     const {Authorization} = configs
//       // request拦截器, 改变url 或 options.
//   request.interceptors.request.use((url, options) => {
//     // eslint-disable-next-line no-param-reassign
//     options.headers = {
//       ...options.headers,
//       Authorization,
//     };
//     return { url, options };
//   });

//   request.interceptors.response.use((response: Response, options: RequestOptions) => {
//     const { successText } = options;
//     const { status, url } = response;
//     // eslint-disable-next-line no-param-reassign
//     if ([200, 304].includes(status)) {
//       successText && message.success(successText);
//     }
//     return response;
//   });
// }
