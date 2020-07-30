import request from "../../utils/request"
import {mixinAxisModelCommonMethods} from "echarts/src/helper";

export default {

    getClockList(pageCurrent,pageSize){
        return request({
            url: `/application/time/list/${pageCurrent}/${pageSize}`,
            method: "get",
        })
    },
    addClock() {
        return request({
            url: "/application/time/getnow",
            method: "get"
        })
    },
    deleteClock(id){
        return request({
            url: `/application/time/delete/${id}`,
            method: "delete"
        })
    }

}
