// import React, { useRef } from 'react';
// import { Row, Empty, Spin } from 'antd';
// import Item from './Item';
// import { IPrenatalVisit, IPregnancy } from '@lianmed/f_types/lib/m';

// export interface IItemData {
//     data: {
//         pregnancy?: {
//             age: any
//             name: any
//             GP: any
//             gestationalWeek: any
//             bedNO: any

//         }
//         docid: string
//         starttime: string
//         status: any
//         ismulti: boolean
//     }
//     bedname: string
//     unitId: string
//     id: any
//     prenatalvisit?: IPrenatalVisit
//     pregnancy?: IPregnancy
// }

// interface IProps {
//     RenderIn: any
//     items: IItemData[]
//     listLayout: number[],
//     fullScreenId?: string,
//     onClose?: (data: any) => void
//     contentHeight: number
//     themeColor?: string
//     loading?: boolean
// }
// const Home = (props: IProps) => {
//     const {  listLayout = [], fullScreenId, contentHeight, RenderIn, items, onClose, themeColor = 'skyblue' } = props;

//     const itemSpan = 24 / listLayout[1];
//     const outPadding = 6;


//     const itemHeight = (contentHeight - outPadding * 2) / listLayout[0];


//     return (
//         items.map((item: any) => {
//             const { data, bedname, unitId, id } = item;
//             const { pregnancy, docid, starttime, status, ismulti } = data
//             const safePregnancy = pregnancy || { age: null, name: null, bedNO: null, GP: null, gestationalWeek: null }
//             const startTime = starttime
//             return (
//                 <Item
//                     onClose={onClose}
//                     themeColor={themeColor}
//                     itemData={item}
//                     bedname={bedname}
//                     unitId={unitId}
//                     key={id}

//                     data={data}

//                     ismulti={ismulti}
//                     docid={docid}
//                     status={status}
//                     loading={false}
//                     pregnancy={safePregnancy}
//                     startTime={startTime}

//                     itemHeight={itemHeight}
//                     itemSpan={itemSpan}
//                     outPadding={outPadding}
//                     fullScreenId={fullScreenId}

//                 >

//                     {
//                         RenderIn && <RenderIn itemData={item} />
//                     }

//                 </Item>
//             );
//         })

//     )
// };

// export default Home;
