import { useEffect, useRef } from 'react';


import { Drawer } from "./interface";

const ResizeObserver = (window as any).ResizeObserver

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
