
import { Button, Empty, Pagination, Spin } from 'antd';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// import workerSrc from './pdf.worker.min'
// import './react-pdf.css';

// const pdf_worker_url = process.env.NODE_ENV === 'development'
//     ? 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.min.js'
//     : workerSrc.default;
// pdfjs.GlobalWorkerOptions.workerSrc = pdf_worker_url;

const PreviewContent = props => {
    const { pdfBase64, isFull = false, wh, borderd = true, onDownload } = props;
    const { h, w } = wh;

    const [isFullpage, setFullpage] = useState(false);
    const [height, setHeight] = useState(200); //
    const [width, setWidth] = useState('100%')
    const [numPages, setNumPages] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const onDocumentLoad = useCallback(({ numPages }) => { setNumPages(numPages) }, [])
    const onChangePage = useCallback(page => { setPageNumber(page) }, [])
    const largen = () => {
        setFullpage(true)
        setHeight(h - 24);
        setWidth(w)
    }
    const shrink = () => {
        setFullpage(false)
        setHeight(200);
        setWidth('100%')
    }
    const ref1 = useRef(null)
    const ref2 = useRef(null)

    useLayoutEffect(() => {
        if (document.querySelector('style')) {
            document.querySelector('style').innerHTML = `${document.querySelector('style').innerHTML} 
            .react-pdf__Page {
                display: inline-block;
              }
            `
        }


    }, [])
    useEffect(() => {
        if (isFull) {
            setHeight(h - 24);
            setWidth(w)
        }
    }, [w, h])
useEffect(() => {
    setPageNumber(1)
}, [pdfBase64])
    const content = pdfBase64 ? (
        <div style={{
            width: width,
            ...(isFullpage ? {
                position: 'absolute',
                top: 0,
                left: 0,
                background: '#fff'
            } : {})
        }
        }>
            {
                <>
                    <Document
                        ref={ref1}
                        loading={<Spin style={{ margin: '120px 0' }} />}
                        onLoadSuccess={onDocumentLoad}
                        file={pdfBase64}
                        renderMode="canvas"

                    >
                        <Page pageNumber={pageNumber} scale={1} height={height} />
                    </Document>
                    <Pagination ref={ref2}

                        total={numPages}
                        showTotal={total => `共 ${total} 页`}
                        current={pageNumber}
                        pageSize={1}
                        size="small"
                        onChange={onChangePage}
                    />
                </>
            }
            {isFullpage ? (
                <div style={{ position: 'absolute', top: 24, right: 24 }} >

                    <Button size="large" type="primary" style={{ marginRight: 10 }} onClick={shrink}>
                        <span>返回</span>
                    </Button>
                    {
                        onDownload && (
                            <Button size="large" type="primary" onClick={onDownload}>
                                <span>打印</span>
                            </Button>
                        )
                    }
                </div>
            ) : (
                    isFull || <span style={{ position: 'absolute', bottom: 36, right: 12, }}>
                        <Button
                            title="全屏"
                            type="primary"
                            // icon="fullscreen"
                            onClick={largen}
                        >
                            放大预览
                    </Button>
                    </span>
                )}
        </div >
    ) : (
            <Empty style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', margin: 0 }} />
        );
    return (
        <div style={{
            position: 'relative',
            flex: 1,
            background: '#fff',
            marginRight: 12,
            zIndex: 99,
            border: borderd && '1px solid #d9d9d9',
        }
        } >
            {content}
        </div >
    )
}

export default PreviewContent