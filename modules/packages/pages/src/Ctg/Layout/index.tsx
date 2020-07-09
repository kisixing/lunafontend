import { Empty, Row, Spin } from 'antd';
import React, { memo, useRef } from 'react';
import Item from './Item';
import { ICtgLayoutProps } from "./types";


const Home = (props: ICtgLayoutProps) => {
  const { onSelect, borderedId, loading, listLayout = [], fullScreenId, contentHeight, RenderIn, items, onClose, themeColor = 'skyblue',
    headColor = "#fff",
    backgroundColor = "#f8f8f8",
    borderedColor = "#DBDBDB",
    fontColor = "#242741",
    activeColor = '#1890ff'
  } = props;
  const wrap = useRef(null);
  const empty = useRef(null)

  const itemSpan = 24 / listLayout[1];
  const outPadding = 6;


  const itemHeight = (contentHeight ) / listLayout[0];


  return (
    <div style={{ height: '100%' }} ref={wrap}>
      {
        loading ? (
          <Spin spinning={loading} size="large" style={{ paddingTop: 100, width: '100%' }} />
        ) : <Row justify="start" align="top" style={{ padding: 0, maxHeight: contentHeight, overflowY: items.length > (listLayout[0] * listLayout[1]) ? 'scroll' : 'hidden' }} >
            {items.length ? items.map((item: any) => {
              const { data, bedname, unitId, id } = item;
              const { pregnancy, docid, starttime, status, ismulti } = data
              const safePregnancy = pregnancy || { age: null, name: null, bedNO: null, GP: null, gestationalWeek: null }
              const startTime = starttime
              return (
                <Item
                  onClose={onClose}
                  themeColor={headColor}
                  itemData={item}
                  bedname={bedname}
                  unitId={unitId}
                  bordered={borderedId === unitId}
                  key={id}
                  onSelect={onSelect}
                  data={data}

                  ismulti={ismulti}
                  docid={docid}
                  status={status}
                  loading={false}
                  pregnancy={safePregnancy}
                  startTime={startTime}
                  itemHeight={itemHeight}
                  itemSpan={itemSpan}
                  outPadding={outPadding}
                  fullScreenId={fullScreenId}
                  backgroundColor={backgroundColor}
                  borderedColor={borderedColor}
                  headColor={headColor}
                  fontColor={fontColor}
                  activeColor={activeColor}
                >

                  {
                    RenderIn && <RenderIn itemData={item} />
                  }

                </Item>
              );
            }) : (
                <div ref={empty} style={{ marginTop: 200, display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Empty description="胎监工作站" />
                </div>
              )
            }
          </Row>
      }
    </div >
  );
};

export default memo(Home);
