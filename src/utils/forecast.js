const request = require('request');

const forecast = (latitude, logitute, callback)=>{
    url = 'https://api.darksky.net/forecast/f955d54ca2f84300e6427a979b0d98f1/'+ latitude +','+logitute;

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to reach forcast API', undefined)
        } else if(body.error){
            callback('We are unable to provide you with required result at this moment', undefined)
        } else{
            callback(undefined, 
            `It will be ${body.daily.data[0].summary} High today is ${body.daily.data[0].temperatureHigh} with temparture of ${body.currently.apparentTemperature} fahrenheit and ${body.currently.precipProbability} percent posibility of rain `
            )
        }
    })
}


module.exports = forecast;