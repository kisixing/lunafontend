
import { useEffect } from 'react'

import request from "@lianmed/request";



export default (prefix: string, data?: { password?: string, username?: string }, cb?: () => void) => {
    useEffect(() => {
        const sp = new window.URL(location.href).searchParams
        const password = sp.get('password')
        const username = sp.get('username')
        if (!data && password && username) {
            data = { password, username }
        }

        request.post('/authenticate', { data, prefix }).then(({ id_token }: any) => {
            request.config({ Authorization: id_token, prefix })
            cb && cb()
        })
    }, [])
}


