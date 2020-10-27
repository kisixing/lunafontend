import { useEffect, useRef } from 'react';
import { ResizeObserver } from "@lianmed/utils";
// import {WsService} from "./services/WsService";
import { Drawer } from "./interface";


export default (data: any, box: any, onReady: () => Drawer, resolveSs?: React.MutableRefObject<(v: any) => void>, resolveDd?: React.MutableRefObject<(v: any) => void>) => {


    const suit = useRef<Drawer>(null)

    useEffect(() => {
        let instance = suit.current = onReady()
        resolveSs.current(instance)
        let resizeObserver = new ResizeObserver(() => {

            // onResize && onResize()
            instance.resize()
            window.hasOwnProperty('ResizeObserver') || setTimeout(instance.resize.bind(instance), 300)
        });
        resizeObserver.observe(box.current);
        return () => {
            instance.destroy();
            resizeObserver.disconnect()
        };

    }, []);


    useEffect(() => {
        const current = suit.current
        current && current.init(data)
        data && resolveDd.current(data)
    }, [data])

    return {}
};
