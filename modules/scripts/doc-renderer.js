import React from 'react';
import SiteRenderer from 'react-site-renderer';

((window.gitter = {}).chat = {}).options = {
  room: 'alibaba-uform/community',
};

// setTimeout(() => {
//   const script = document.createElement('script');
//   script.src = '//sidecar.gitter.im/dist/sidecar.v1.js';
//   document.body.appendChild(script);
// }, 1000);

export default ({ docs }) => {
  return (
    <SiteRenderer
      logo={<img style={{ height: 46 }} src="//www.lian-med.com/upload/201804/1522654052.png" />}
      docs={docs}
    />
  );
};
