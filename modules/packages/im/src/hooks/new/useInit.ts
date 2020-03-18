import { useEffect, useRef } from "react";
// import request from "@lianmed/request";
import { StompService } from "@lianmed/utils";
import _ from 'lodash'

// const remote_url = ''
const stomp_url = 'transfer.lian-med.com:9987'

export const useInit = () => {
    const stompService = useRef(new StompService(stomp_url))



    return { stompService }
}