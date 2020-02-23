const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/84465f7684bc92ce4cb9505bdeed5545/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si"

    request({ url, json: true},(error, { body }) => {     //response object destructured
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.error) {
            callback('Unable to find location. Please try another search!', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability + "% chance of rain."
                )
        }
    })
}

module.exports = forecast