const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=63938494cb4633acf85e9b98cb754e8c&query=' + latitude +',' + longitude + '&units=f'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connecto to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. The wind speed is ' + body.current.wind_speed + '.' + ' The humidity is ' + body.current.humidity + '%')
        }
    })

}

module.exports = forecast