import React, { useRef, memo } from 'react';
import { Row, Empty, Spin } from 'antd';
import Item from './Item';
import { IPrenatalVisit, IPregnancy } from '@lianmed/f_types/lib/m';

export interface IItemData {
  data: {
    pregnancy?: {
      age: any
      name: any
      GP: any
      gestationalWeek: any
      bedNO: any

    }
    docid: string
    starttime: string
    status: any
    ismulti: boolean
  }
  bedname: string
  unitId: string
  id: any
  prenatalvisit?: IPrenatalVisit
  pregnancy?: IPregnancy
}

interface IProps {
  RenderIn: any
  RenderMaskIn?: any
  items: IItemData[]
  listLayout: number[],
  fullScreenId?: string,
  onClose?: (data: any) => void
  contentHeight: number
  themeColor?: string
  loading?: boolean
  borderedId?: string
  onSelect?: (unitId: string) => void
}
const Home = (props: IProps) => {
  const { onSelect, borderedId, loading, listLayout = [], fullScreenId, contentHeight, RenderIn, RenderMaskIn, items, onClose, themeColor = 'skyblue' } = props;
  const wrap = useRef(null);
  const empty = useRef(null)

  const itemSpan = 24 / listLayout[1];
  const outPadding = 6;


  const itemHeight = (contentHeight - outPadding * 2) / listLayout[0];


  return (
    <div style={{ height: '100%' }} ref={wrap}>
      {
        loading ? (
          <Spin spinning={loading} size="large" style={{ paddingTop: 100, width: '100%' }} />
        ) : <Row justify="start" align="top" style={{ padding: outPadding, maxHeight: contentHeight, overflowY: items.length > (listLayout[0] * listLayout[1]) ? 'scroll' : 'hidden' }} >
            {items.length ? items.map((item: any) => {
              const { data, bedname, unitId, id } = item;
              const { pregnancy, docid, starttime, status, ismulti } = data
              const safePregnancy = pregnancy || { age: null, name: null, bedNO: null, GP: null, gestationalWeek: null }
              const startTime = starttime
              return (
                <Item
                  onClose={onClose}
                  themeColor={themeColor}
                  itemData={item}
                  bedname={bedname}
                  unitId={unitId}
                  bordered={borderedId === unitId}
                  key={id}
                  onSelect={onSelect}
                  data={data}
                  RenderMaskIn={RenderMaskIn}
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
