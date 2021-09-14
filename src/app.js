const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, '../public'); // retrieves the path for public directory.
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDir)); 

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Shlomi'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shlomi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shlomi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'Address must be provided'
        })
    }
    
    const address = req.query.address;

    geocode(address,(error, { latitude, longitude, location } = {}) => {
        if (error)
        {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
            {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        proucts: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shlomi',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shlomi',
        msg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});