import React, { useEffect, useRef } from 'react';
import { DrawFriedman } from './DrawFriedman';
import ScrollBar from '../ScrollBar';
import { IBarTool } from '../useScroll';
import { Button, Input } from 'antd';
import { SchemaForm, Manager } from '@lianmed/schema-form';
export default () => {
  let barTool: IBarTool;
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
        schemaData={[
          {
            type: 'object',
            'x-component': 'inspection_card',
            'x-props': { title: '高危管理' },
            id: '10188634107774597',
            properties: {
              UFORM_NO_NAME_BLOCK0_LINE0: {
                type: 'grid',
                'x-props': {
                  cols: [8],
                },
                properties: {
                  riskAssessment: {
                    title: '试试',
                    type: 'string',
                  },
                },
              },
              UFORM_NO_NAME_BLOCK0_LINE1: {
                type: 'grid',
                'x-props': {},
                properties: {
                  aaa: {
                    'x-component': 'body_growth_check',
                    'x-props': {
                      title: '发育监测',

                      dataset: [
                        {
                          title: '评估方法',
                          key: 'method',
                          type: 'string',
                          dataset: [
                            {
                              value: '0',
                              label: '16岁',
                            },
                            {
                              value: '1',
                              label: '17岁',
                            },
                          ],
                        },
                        {
                          title: '评估结果',
                          key: 'result',
                          type: 'string',
                          dataset: [
                            {
                              value: '0',
                              label: '16岁',
                            },
                            {
                              value: '1',
                              label: '17岁',
                            },
                          ],
                        },
                        {
                          title: '指导',
                          key: 'instuct',
                          type: 'string',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        ]}
      >
        <SchemaForm />
      </Manager>
      <div>
        <ScrollBar
          box={box}
          getBarTool={tool => {
            barTool = tool;
          }}
        />
      </div>
    </div>
  );
};
