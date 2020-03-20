import { useMemo } from "react";
// import request from "@lianmed/request";
import { StompService } from "@lianmed/utils";
import _ from 'lodash'

// const remote_url = ''
// const stomp_url = 'transfer.lian-med.com:9987'
// const s = 'transfer.lian-med.com'
const s = '192.168.123.56:9987'
export const useInit = () => {

    const stompService = useMemo(() => new StompService(s), [])

    return { stompService }
}