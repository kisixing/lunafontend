import { useEffect, useRef } from 'react';


import { Drawer } from "./interface";

const ResizeObserver = (window as any).ResizeObserver

export default (onReady: () => Drawer, data: any, box: any) => {


    const suit = useRef<Drawer>(null)

    useEffect(() => {
        let instance = suit.current = onReady()
        let resizeObserver = new ResizeObserver(() => {
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
