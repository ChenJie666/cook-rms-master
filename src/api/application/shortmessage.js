import request from '@/utils/request.js'

export default {

    getShortMessageList(){
        return request({
            url: '/application/message/alllist',
            method: 'get'
        })
    },

    addShortMessage(shortMessage){
        return request({
            url: 'application/message/add',
            method: 'post',
            data: shortMessage
        })
    },

    updateShortMessage(shortMessage){
        return request({
            url: 'application/message/update',
            method: 'post',
            data: shortMessage
        })
    },

    deleteShortMessage(id){
        return request({
            url: `/application/message/delete/${id}`,
            method: 'delete'
        })
    }

}
