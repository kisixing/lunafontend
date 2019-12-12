import React, { useRef, useEffect, useState, Props } from 'react'
import { fabric } from "fabric";
export { default as Line } from "./Obj/Line";
export { default as Rect } from "./Obj/Rect";
interface IProps extends Props<any> {
    width?: 0,
    height?: 0,
    children?: any
    style?: React.CSSProperties
}
export const FancyCanvas = (props: IProps) => {

    const canvas = useRef(null)
    const [c, setC] = useState(null)
    useEffect(() => {
        const fc = new fabric.Canvas(canvas.current)

        setC(fc)
    }, [])
    const children = React.Children.map(props.children, child => {
        return React.cloneElement(child as any, {
            c,
        })
    })
    return (
        <>
            <canvas ref={canvas}  {...props} />
            {c && children}
        </>
    )
}


