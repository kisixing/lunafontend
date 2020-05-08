import React, { useState, useRef, useEffect } from 'react';
import request from "@lianmed/request";

import ButtonGroup from 'antd/lib/button/button-group';
import { Button } from 'antd';
import { Suit } from './Suit';
import { ICacheItem } from '../services/types';
import { event } from "@lianmed/utils";
interface IProps {
    ctg: React.MutableRefObject<Suit>
    data: ICacheItem
    visible: boolean
    className: string
}

export const ButtonTools = (props: IProps) => {
    const { ctg, visible, className, data } = props
    const [activeList, setActiveList] = useState(new Set())
    const audio_ref1 = useRef<HTMLAudioElement>()
    const audio_ref2 = useRef<HTMLAudioElement>()
    const audio_ref3 = useRef<HTMLAudioElement>()
    const timeoutId = useRef<NodeJS.Timeout>()
    const [replayKey, setReplayKey] = useState(0)
    const audioRefMap: { [x: string]: React.MutableRefObject<HTMLAudioElement> } = {
        audio_ref1,
        audio_ref2,
        audio_ref3
    }
    const prefix = request.configure.prefix
    const btns = [
        {
            text: '心音回放',
            onClick: () => {
                const lineTool = ctg.current.lineTool
                lineTool && lineTool.toggleVisibility()
            }
        }
    ]
    function stopPlay() {
        event.emit('ctg:replay', '')
        clearInterval(timeoutId.current)
    }
    useEffect(() => {
        function cb() {
            const r = (ctg.current.drawSelect.selectingBarPoint / ctg.current.data.index) || 0
            const index = ctg.current.data.index * r
            let i = 0
            timeoutId.current = setInterval(() => {

                const dis = (index - ctg.current.leftViewposition) / 2
                console.log('go', dis + 2 * (++i))

                ctg.current.drawSelect.selectingBar.setLeft(dis + 2 * (++i))
            }, 1000);

            // target.current.play()
        }
        event
            .on('ctg:canReplay', cb)
        return () => {
            event
                .off('ctg:canReplay', cb)

            clearInterval(timeoutId.current)
        }
    }, [])
    useEffect(() => {
        // const target = audioRefMap[`audio_ref${replayKey}`]
        // Object.entries(audioRefMap).forEach(([k, v]) => v.current && v.current.pause())

        // if (target) {
        //     const audio = target.current
        //     const r = (ctg.current.drawSelect.selectingBarPoint / ctg.current.data.index) || 0
        //     audio.currentTime = r * audio.duration
        //     audio.ontimeupdate = () => {
        //         const play_r = audio.currentTime / audio.duration
        //         const index = ctg.current.data.index * play_r
        //         const dis = (index - ctg.current.leftViewposition) / 2
        //         ctg.current.drawSelect.selectingBar.setLeft(dis)
        //     }
        //     audio.onended = () => setReplayKey(0)
        //     audio.play()
        //     // target.current.play()
        // }

    }, [replayKey, data])

    useEffect(() => {
        setReplayKey(0)
        stopPlay()

    }, [data])
    return (
        <>
            <ButtonGroup size="small" style={{ position: 'absolute', right: 0, bottom: 0, opacity: visible ? 1 : 0 }} className={className}>
                {
                    data && Array(data.fetal_num).fill(0).map((_, i) => {
                        const isTarget = replayKey === i + 1
                        return <Button key={`b${i}`} type={isTarget ? 'primary' : 'default'} onClick={() => {
                            const k = isTarget ? 0 : (i + 1)
                            const id = k ? `${data.docid}_${replayKey}` : ''
                            setReplayKey(k)
                            id ? event.emit('ctg:replay', id) : stopPlay()

                        }}>
                            第{i + 1}胎心音回放
                        </Button>
                    })
                }
                {
                    btns.map((_, index) => {
                        const _set = new Set(activeList)
                        const isExist = _set.has(index)

                        return <Button type={isExist ? 'primary' : 'default'} key={index} onClick={() => {
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
            {
                data && Array(data.fetal_num).fill(0).map((_, i) => {
                    return <audio ref={audioRefMap[`audio_ref${i + 1}`]} src={`${prefix}/ctg-exams-audio/${data.docid}_${i + 1}`} />
                })
            }
        </>
    );
}
