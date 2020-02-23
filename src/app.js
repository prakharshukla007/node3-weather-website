const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prakhar Shukla'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {     //leave off the file extension
        title: 'About me',
        name: 'Prakhar Shukla'
    })  
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'This is a sample help message!',
        name: 'Prakhar Shukla'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Prakhar',
//     }, {
//         name: 'Andrew'
//     }])
// })



// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must mention an address to search for! Fool, ya fool!'
        })
    }
    
    geocode(req.query.address,  (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})  // shorthand
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})  // shorthand
            }

            res.send({
                address: req.query.address,
                location,          // shorthand
                forecast: forecastData
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({       //instead of else use return to just return it and end the function
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prakhar Shukla',
        msg: '- Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prakhar Shukla',
        msg: '- Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})