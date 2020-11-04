
import { useEffect, useState } from 'react'

import { fetchPage, post, put, del, get } from "@lianmed/request";

interface IPageData {
    current: number
    pageSize: number
    total?: number
    [x: string]: any
}
interface IDict {
    [x: string]: any
}
type TGenParams = () => Promise<IDict>
export const usePage = <T extends {}>(model: string, initParams: IPageData = { pageSize: 10, current: 1 }, genParams: TGenParams = () => Promise.resolve({}), keyMaps: Record<string, any> = {}) => {
    const { current, pageSize, ...others } = initParams
    const [listData, setListData] = useState<T[]>([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState<IPageData>({ current, pageSize })

    function fetchList(runtimeParams: { current?: number, pageSize?: number, [x: string]: any } = {}) {
        setLoading(true)

        genParams().then(gParams => {
            fetchPage<T>(model, { pageSize: pagination.pageSize, current: pagination.current, ...others, ...gParams, ...runtimeParams }, keyMaps)
                .then(r => {
                    setListData(r.data)
                    setPagination(r.pagination)
                    return r
                })
                .finally(() => setLoading(false))
        })


    }
    function getItems(params: { [x: string]: any } = {}) {
        return get<T[]>(`/${model}`, {
            params: { ...initParams, ...params }
        });
    }
    function updateItem(data: { [x: string]: any }) {
        return put(`/${model}`, {
            data
        }).then(() => fetchList());
    }
    function createItem(data: { [x: string]: any }) {
        return post(`/${model}`, {
            data
        }).then(() => fetchList());
    }
    function removeItem(data: { [x: string]: any }) {
        return del(`/${model}`, {
            data
        }).then(() => fetchList());
    }
    useEffect(() => {
        fetchList()
    }, [])
    return {
        loading,
        listData,
        pagination,
        fetchList,
        createItem,
        removeItem,
        updateItem,
        getItems,
    }
}


