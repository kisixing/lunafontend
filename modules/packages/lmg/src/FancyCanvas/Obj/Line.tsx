import React, { useRef, useEffect, useState, Props } from 'react'
import { fabric } from "fabric";
import { ILineOptions } from 'fabric/fabric-impl';
interface IProps extends Props<any> {
    c?: fabric.Canvas
    points?: number[]
    options?: ILineOptions
}
const FancyCanvas = (props: IProps) => {
    const {
        points = [10, 10, 9999, 10],
        options = {
            left: 0,
            top: 150,
            stroke: 'red',
            // lockMovementX: true,
            // lockMovementY: true,
            hasControls: false,
            fill:'red'
        },
        c
    } = props
    useEffect(() => {
        const line = new fabric.Line(points, options)
        c && c.add(line)
    }, [c])


    return null
}

export default FancyCanvas
