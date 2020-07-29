import moment from "moment"

export function toTimestamp(Datetime){
    return moment(Datetime,'YYYY-MM-DD HH:mm:ss');
}

export function toDatetime(timestamp){
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}
