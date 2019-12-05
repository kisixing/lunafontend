import { useEffect, useRef } from 'react';
import { ResizeObserver } from "@lianmed/utils";

import { Drawer } from "./interface";


export default (data: any, box: any, onReady: () => Drawer, onResize?: () => void) => {


    const suit = useRef<Drawer>(null)

    useEffect(() => {
        let instance = suit.current = onReady()
        let resizeObserver = new ResizeObserver(() => {
            onResize && onResize()
            instance.resize()
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
    }, [data])

    return {}
};
