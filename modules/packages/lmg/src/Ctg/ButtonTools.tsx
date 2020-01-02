import React, { useRef, useState, useImperativeHandle, Ref, forwardRef } from 'react';


import ButtonGroup from 'antd/lib/button/button-group';
import { Button } from 'antd';
import { Suit } from './Suit';

interface IProps {
    ctg?: React.MutableRefObject<Suit>
    visible: boolean
}

export const ButtonTools = (props: IProps) => {
    const { ctg, visible } = props
    const [activeList, setActiveList] = useState(new Set())
    const btns = [
        {
            text: '基线工具',
            onClick: () => {
                const lineTool = ctg.current.lineTool
                lineTool && lineTool.toggleVisibility()
            }
        }
    ]
    return (
        <ButtonGroup size="small" style={{ position: 'absolute', right: 0, bottom: 0, opacity: visible ? 1 : 0 }} >
            {
                btns.map((_, index) => {
                    const _set = new Set(activeList)
                    const isExist = _set.has(index)

                    return <Button type={isExist ? 'primary' : 'default'} key={index}  onClick={() => {
                        if (isExist) {
                            _set.delete(index)
                        } else {
                            _set.add(index)
                        }
                        _.onClick()
                        setActiveList(_set)

                    }} >{_.text}</Button>
                })
            }
        </ButtonGroup>
    );
}
