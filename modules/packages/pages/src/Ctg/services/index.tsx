import request from "@lianmed/request";

interface ICtgExamsPdf {
    age: any
    diagnosis: string
    docid: string
    end: number
    fetalcount: number
    gestationalWeek?: string
    inpatientNO: string
    name: string
    outputType?: string
    start: number
    startdate: string
    fetal:any
    
}

export const fetchCtgExamsPdf = async (data: ICtgExamsPdf) => {
    const { outputType = '210', ...o } = data
    return request.post('/ctg-exams-pdf', { data: { ...o, outputType } }).then(res => res && res.pdfdata && `data:application/pdf;base64,${res.pdfdata}`).catch(e => e)
}