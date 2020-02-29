
import { useState } from 'react';
import request from "@lianmed/request";
import { event } from '@lianmed/utils';




export default (docid: string) => {

    const [bizSn, setBizSn] = useState(docid);



    const [archived, setArchived] = useState(false)
    const [archiveLoading, setArchiveLoading] = useState(false)



    const archive = () => {
        setArchiveLoading(true)
        request.put(`/doc/${archived ? 'undo-' : ''}archive`, { data: { bizSn } })
            .then(r => {
                if (!r) return
                setArchived(!archived)
                event.emit('signed')
            })
            .finally(() => setArchiveLoading(false))
    }





    return {
        setBizSn, bizSn, archive, archiveLoading, archived
    }
}
