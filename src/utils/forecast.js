const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=73997621bda27eaaba69bf8f866c4b19&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect', undefined);
        }
        else if (body.error)
        {
            callback('Unable to find location', undefined);
        }
        else
        {
            const temperature = body.current.temperature;
            const feelsLike = body.current.feelslike;
            callback(undefined, `${body.current.weather_descriptions[0]}. it is currently ${temperature} out. It feels like ${feelsLike}`);
        }
    })
}
module.exports = forecast;