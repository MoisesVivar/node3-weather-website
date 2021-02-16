const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup statitc directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Moisés Vivar'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Moisés Vivar'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'I hope this message can help you.',
        title: 'Help',
        name: 'Moisés Vivar'
    })
})

app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location} = {}) =>{

        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        }) 

    })

})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page',{
        errorMsg: 'Help article not found',
        name: 'Moisés Vivar',
        title: '404 Help'
    })
})

app.get('*',(req, res) => {
    res.render('404Page',{
        errorMsg: 'Page not found',
        name: 'Moisés Vivar',
        title: '404 Page'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})

