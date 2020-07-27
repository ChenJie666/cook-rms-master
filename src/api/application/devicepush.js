import request from "../../utils/request"

export default {

    notePush(notepushVO){
        return request({
            url: "/application/device/notepush",
            method: "post",
            data: notepushVO
        })
    }

}
