
import moment from 'moment'
export function formatDate(s = null) {
    let d
    if (s && s._isAMomentObject) {
        d = s
    } else {
        d = s ? new Date(s) : new Date()
    }
    return moment(d).format('YYYY-MM-DD')
}
export function formatTime(s = null) {
    let d
    if (s && s._isAMomentObject) {
        d = s
    } else {
        d = s ? new Date(s) : new Date()
    }
    return moment(d).format('YYYY-MM-DD HH:mm:ss')
}
export function getMomentObj(s: moment.MomentInput) {
    return s && moment(s)
}

