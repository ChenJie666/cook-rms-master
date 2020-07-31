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
    addDiyClock(clockVO){
      return request({
          url: "/application/time/add",
          method: "post",
          data: clockVO
      })
    },
    updateClock(clockVO){
        return request({
            url: "/application/time/update",
            method: "post",
            data: clockVO
        })
    },
    deleteClock(id){
        return request({
            url: `/application/time/delete/${id}`,
            method: "delete"
        })
    }

}
