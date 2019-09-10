import React from 'react';
import { Icon as AntIcon } from 'antd';
import configs from '../configs';
import { IconProps } from 'antd/lib/icon';
const { IconScriptUrl } = configs;

function Icon(props: IconProps) {
  return <AntIcon {...props} />;
}
Icon.MyIcon = AntIcon.createFromIconfontCN({
  scriptUrl: IconScriptUrl || '//at.alicdn.com/t/font_1303463_2alryf6xujk.js', // 在 iconfont.cn 上生成
});

export default Icon;
