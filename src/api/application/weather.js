import request from "../../utils/request"

export default {

    getWeatherList(pageCurrent,pageSize,searchFactor){
        return request({
            url: `/application/weather/getWeatherList/${pageCurrent}/${pageSize}`,
            method: "post",
            data: searchFactor
        })
    },
    addWeather(){
      return request({
          url: "/application/weather/getnow",
          method: "get"
      })
    },
    updateWeather(weather){
        return request({
            url: "/application/weather/updateWeather",
            method: "post",
            data: weather
        })
    },
    deleteWeather(id){
        return request({
            url: `/application/weather/deleteWeather/${id}`,
            method: "delete"
        })
    }

}
