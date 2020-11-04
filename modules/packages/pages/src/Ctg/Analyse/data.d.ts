import { obvue } from "@lianmed/f_types";
type Partial<T> = {
  [x in keyof T]?: T[x];
};
// export interface TableListItem {
//   key: number;
//   disabled?: boolean;
//   href: string;
//   avatar: string;
//   name: string;
//   owner: string;
//   desc: string;
//   callNo: number;
//   status: number;
//   updatedAt: Date;
//   createdAt: Date;
//   progress: number;
// }
export type TableListItem = obvue.prenatal_visitspage
export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

// export interface TableListData extends obvue.prenatal_visitspage {
//   list: TableListItem[];
//   pagination: Partial<TableListPagination>;
// }
export type TableListData = obvue.prenatal_visitspage[]
export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
  params: { [key: string]: any };
}
export interface CtgLable {
  exception?: number
  status?: number
  result?: number
  favorites?: number
  id?: number
}
interface _historyItem {
  analysis: obvue.ctg_exams_analyse,
  diagnosis: {
    "uctimes": 0,
    "ucStrong": 0,
    "ucdurationtime": 0,
    "uckeeptime": 0,
    "edtimes": 0,
    "ldtimes": 0,
    "vdtimes": 0
  }
  result: {
    "result": "",
    "deformed": boolean,
    "uctimes": 0,
    "ucStrong": 0,
    "ucdurationtime": 0,
    "uckeeptime": 0,
    "edtimes": 0,
    "ldtimes": 0,
    "vdtimes": 0,
    "total": 7,
    "bhrvalue": 142,
    "bhrscore": 2,
    "ltvvalue": 7,
    "ltvscore": 1,
    "accdurationvalue": 29,
    "accdurationscore": 2,
    "accamplvalue": 14,
    "accamplscore": 1,
    "fmvalue": 1,
    "fmscore": 1,
    "isedit": false,
    "type": "Nst",
    "startTime": 0,
    "endTime": 4800
  }
  baseline: null
  diagnosisTime: "2020-10-27T04:12:44+08:00"
  doctor: "admin"
  id: 8
  prenatalVisitId: 50186
}
export type historyItem = Partial<_historyItem>