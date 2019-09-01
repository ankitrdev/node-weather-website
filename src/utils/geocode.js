const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5raXRkZXZiZWF0IiwiYSI6ImNqenhnZmFveDEwa3ozaHBmMDNyMzF5azMifQ.sJ2fwXjIIGs3yhucpMj0Mg&limit=1';

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to find the location', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another service', undefined);
        } else{
            callback(undefined, {
            long: body.features[0].center[0],
            lati: body.features[0].center[1],
            placeName : body.features[0].place_name,
            })
        }
    })


}

module.exports = geocode