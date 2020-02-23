const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJha2hhcnNodWtsYSIsImEiOiJjazZzNmEyaXYwYTN4M2xsZzh1d2F4OHVzIn0.qwevMZsZuWmr4eXYW__NqA&limit=1'

    request({ url, json: true}, (error, { body }) => {   //Property shorthand for url and response object destructuring
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length == 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode