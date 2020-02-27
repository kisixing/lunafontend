
import moment from 'moment'
console.log('moment', moment)
export function formatDate(s = null) {
    let d
    if (s && s._isAMomentObject) {
        d = s
    } else {
        d = s ? new Date(s) : new Date()
    }
    return moment(d).format('YYYY-MM-DD')
}