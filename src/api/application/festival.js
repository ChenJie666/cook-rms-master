import request from '../../utils/request'

export default {

    getHolidayList(pageCurrent,pageSize) {
        return request({
            url: `/application/holiday/list/${pageCurrent}/${pageSize}`,
            method: 'get'
        })
    },

    addHoliday(festivalBroadcast) {
        return request({
            url: '/application/holiday/add',
            method: 'post',
            data: festivalBroadcast
        })
    },

    updateHoliday(festivalBroadcast){
        return request({
            url: '/application/holiday/update',
            method: 'post',
            data: festivalBroadcast
        })
    },

    deleteHoliday(id){
        return request({
            url: `/application/holiday/delete/${id}`,
            method: 'delete'
        })
    }

}
