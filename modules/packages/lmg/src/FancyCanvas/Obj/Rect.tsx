import React, { useRef, useEffect, useState, Props } from 'react'
import { fabric } from "fabric";
import { ILineOptions } from 'fabric/fabric-impl';
interface IProps extends Props<any> {
    c?: fabric.Canvas
    options?: ILineOptions
}
const FancyCanvas = (props: IProps) => {
    const {
        options = {
            top: 0,
            left: 0,
            width: 50,
            height: 50,
            fill: 'red',
            // lockMovementY: true,
            hasControls: false,
        },
        c
    } = props
    useEffect(() => {
        const line = new fabric.Rect(options)
        c && c.add(line)
    }, [c])


    return null
}

export default FancyCanvas
