import React, { PropsWithChildren, useRef, useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';
import { Suit } from '../Suit';
import { PointType } from '../../interface';
import MenuStrategies from "./MenuStrategies/index";
export default ((props: PropsWithChildren<{ s: React.MutableRefObject<Suit> }>) => {
    const s = props.s

    const [pType, setPType] = useState<PointType>()
    const offsetX = useRef(0)
    const offsetY = useRef(0)

    useEffect(() => {
        console.log('pType', pType)
    }, [pType])



    return (
        <>

            <Dropdown overlay={MenuStrategies({ pType, s, offsetX, offsetY })} trigger={['contextMenu']}>
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }} onContextMenu={e => {
                    const target = e.currentTarget
                    const { clientX, clientY } = e

                    const { x, y } = target.getBoundingClientRect()
                    offsetX.current = clientX - x
                    offsetY.current = clientY - y
                    const type = s.current.getPointType(offsetX.current, offsetY.current)
                    setPType(type)
                }}>
                    {
                        props.children
                    }
                </div>
                {/* {
                    React.Children.map(props.children, (_: any) => {
                        return React.cloneElement(_, {
                            onContextMenu: e => {
                                // e.preventDefault()
                                // e.stopPropagation()
                                console.log('menu', e)
                                // return false
                            }
                        })
                    })
                } */}
            </Dropdown>

        </>
    );
})
