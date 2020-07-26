import request from '@/utils/request.js'

export default {

    getVoiceList(){
        return request({
            url: '/application/voice/list',
            method: 'get'
        })
    },

    addVoice(voiceFirmware){
        return request({
            url: '/application/voice/add',
            method: 'post',
            data: voiceFirmware
        })
    },

    updateVoice(voiceFirmware){
        return request({
            url: '/application/voice/update',
            method: 'post',
            data: voiceFirmware
        })
    },

    deleteVoice(id){
        return request({
            url: `/application/voice/delete/${id}`,
            data: 'delete'
        })
    }

}
