
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// Set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))





app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Andrew Me as an example'
    })
})

app.get('/help', (req, res) => {
    res.render('help', { message: 'This is a help message from app.js' })
})

app.get('/help/*', (req, res) => {
    res.render('404', { message: 'help article not found' })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us, Handler JS',
        name: 'brahma'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please enter address to check the weather'
        })
    }

    geocode.geolocation(req.query.address, (error, data) => {
        if (error) {
            return res.send("error in gettin the cooridnates")
        } else {

            forecast.forecast(data.latitude, data.longitude, (error, data) => {
                if (error) {
                    return res.send("Error in fatching weather")
                } else {
                    res.send({
                        temperature: data.body.current.temperature,
                        description: data.body.current.weather_descriptions,
                        address: data.body.location.country,
                        localtime: data.body.location.localtime,
                        image: data.body.current.weather_icons[0]
                    })
                }
            })


        }
    })


    // res.send({ forecast: 'It is snowing, yea .. I wish !!', location: 'Singapore' })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: ' you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    //    res.send('My 404 Page')

    res.render('404', { message: 'PAGE NOT FOUND!' })
})

app.listen(port, () => {
    console.log('server running in port, ' +  port)
});
