const request = require('request')


const forecast = (latitude, longitude, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=cada5080723e976333b88975b8894184&query=' + longitude + ',' + latitude + '&units=f';
    const url = 'http://api.weatherstack.com/current?access_key=cada5080723e976333b88975b8894184&query=' + longitude + ',' + latitude;

    console.log(url)

    request({ url: url, json: true }, (error, data) => {
        if (error) {
            callback("Unable to reach the service provider")
        } else if (data.body.success === false) {
            console.log('error in finding the location')
        } else {
            callback(undefined, data)
        }
    })
}


module.exports = {
    forecast: forecast,
}
