import React, { useEffect, useRef } from 'react';
import { DrawFriedman } from './DrawFriedman';
import { SchemaForm, Manager } from '@lianmed/schema-form';
export default () => {
  const box = useRef<HTMLDivElement>(null);
  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { width, height } = box.current.getBoundingClientRect();
    const draw = new DrawFriedman({
      canvas: canvas1.current,
      canvas2: canvas2.current,
      width,
      height,
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={box}>
      <div style={{ position: 'relative', height: 'calc( 100% - 400px )' }}>
        <canvas
          ref={canvas1}
          id="canvas"
          width="1200"
          height="480"
          style={{ position: 'absolute' }}
        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>

        <canvas
          ref={canvas2}
          id="canvas2"
          width="1200"
          height="480"
          style={{ position: 'absolute' }}
        >
          <p>Your browserdoes not support the canvas element.</p>
        </canvas>
      </div>
      <Manager
        values={{}}
        schemaData={[
          {
            type: 'object',
            id: '10188634107774597',
            properties: {
              UFORM_NO_NAME_BLOCK0_LINE0: {
                type: 'grid',
                'x-props': {
                  cols: [8],
                },
                properties: {
                  riskAssessment: {
                    title: '是否显示事件',
                    'x-component': 'true_or_false',
                  },
                },
              },
              UFORM_NO_NAME_BLOCK0_LINE1: {
                type: 'grid',
                'x-props': {},
                properties: {
                  sa: {
                    'x-component': 'friedman_table',
                    'x-props': {},
                  },
                },
              },
            },
          },
        ]}
      >
        <SchemaForm />
      </Manager>
    </div>
  );
};
