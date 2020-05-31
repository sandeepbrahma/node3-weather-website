const request = require('request');


const geolocation = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2FuZGVlcC1icmFobWEiLCJhIjoiY2thbWFseXpqMGpuNDJzbG9pZmx4c2w5cyJ9.kyNpcpvYduq-9LaQCNHV6w'

    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/singapore.json?access_token=pk.eyJ1Ijoic2FuZGVlcC1icmFobWEiLCJhIjoiY2thbWFseXpqMGpuNDJzbG9pZmx4c2w5cyJ9.kyNpcpvYduq-9LaQCNHV6w'
    request({ url: url, json: true }, (error, { body }) => {

        if (error) {
            callback("could not connect to service provider", undefined)

        } else if (body.features.length === 0) {
            callback("please check the address", undefined)

        }
        else {

            callback(undefined, {

                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            });
        }
    })


}
module.exports = {
    geolocation: geolocation
}

