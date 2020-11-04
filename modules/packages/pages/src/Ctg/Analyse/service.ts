import request from '@lianmed/request';
import { formatDate } from '@lianmed/utils';
import { TableListParams, TableListItem, TableListData, historyItem, CtgLable } from './data.d';
const paramMap = {
  startDate: 'visitDate.greaterOrEqualThan',
  endDate: 'visitDate.lessOrEqualThan',
  note: 'note.contains'
}
export async function queryRule(data: TableListParams) {
  const { params } = data
  const { page } = params
  const p = {
    // size: pageSize,
    ...(Object.entries(params).reduce((p, [k, v]) => {
      k = paramMap[k] || k
      v = (v && v._isAMomentObject) ? formatDate(v) : v
      p[`${k}`] = v || undefined
      return p
    }, {})),
    page: (page - 1) || 0,

  }
  console.log('params', p);

  return Promise.all([
    request.get('/prenatal-visitspage', {
      params: p,
    }),
    request.get('/prenatal-visits/count', {
      params: p,
    }).catch(() => 20)
  ]).then(arr => {
    return {
      data: arr[0] as TableListData,
      total: arr[1] as number,
      success: true,
      pageSize: 20,
      current: 1,
    }
  })


}
export async function queryHistory(data: { note: any }): Promise<historyItem[]> {

  const params = {
    'note.equals': data.note
  }

  // return request.get('/ctg-exams-criteria', { params })
  return request.get('/diagnosis-histories', { params }).then((data: any[]) => {
    return data.map(({ analysis, diagnosis, result, ...other }) => {
      let _analysis, _diagnosis, _result
      try {
        _analysis = JSON.parse(analysis)
      } catch (error) {
        _analysis = {}
      }
      try {
        _diagnosis = JSON.parse(diagnosis)
      } catch (error) {
        _diagnosis = {}
      }
      try {
        _result = JSON.parse(result)
      } catch (error) {
        _result = {}
      }
      return {
        analysis: _analysis,
        diagnosis: _diagnosis,
        result: _result,
        ...other
      }
    })
  })


}

export async function removeHistory(params: { id: any }) {
  return request.delete('/diagnosis-histories/' + params.id, {
    successText: '删除成功'
  });
}
export async function updateHistory(data: historyItem) {
  return request.put('/diagnosis-histories', {

    data: {
      ...data,
      result: data.result ? JSON.stringify(data.result) : undefined,
      diagnosis: data.diagnosis ? JSON.stringify(data.diagnosis) : undefined,
      analysis: data.analysis ? JSON.stringify(data.analysis) : undefined,
    },
    successText: '保存成功'
  });
}

export async function addRule(params: TableListItem) {
  return request.get('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateLable(data: CtgLable) {
  return request.put('/ctg-labels', {
    data,
  });
}
