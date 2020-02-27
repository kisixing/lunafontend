export interface _prenatal_visitspage {
    id: number
    visitType: null
    visitTime: string
    createdBy: string
    visitDate: string
    gestationalWeek: null
    appointmentDate: null
    diagnosis: null
    diagnosisCode: null
    gynecologicalExam: null
    pregnancy: {
        id: number
        outpatientNO: null
        inpatientNO: string
        cardNO: null
        areaNO: string
        roomNO: null
        bedNO: string
        adminDate: null
        insuranceType: null
        name: string
        age: number
        gender: null
        dob: null
        idType: null
        idNO: null
        ethnic: null
        telephone: null
        lmp: null
        edd: null
        sureEdd: null
        gravidity: null
        parity: null
        push: null
        im: null
        mpuid: null
        devices: null
    }
    doctor: null
    ecgexam: null
    ctgexam: {
        id: number
        startTime: string
        endTime: string
        result: null
        note: string
        diagnosis: null
        report: null
        fetalposition: null
        fetalnum: null
        sign: null
        signable: boolean
    }
}