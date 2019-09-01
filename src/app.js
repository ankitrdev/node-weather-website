const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

const app = express();

// Define path for app config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name:'Arya Dogra'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'about',
        imageUrl: '/img/Network-Profile.png'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        name:'Arya',
        helptext:'This is the help page'

    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {lati,long, placeName } = {})=>{
        if(error){
            return res.send({error: error});
        }

        forecast(lati, long, (error, forecastData) => {
            if(error){
                return console.log(error);
            }
            res.send({
                location: req.query.address,
                address: placeName,
                forecast: forecastData
            })
          })
    })
})

app.get('/products', (req, res)=>{

    if (!req.query.search) {
        // or use return statement on res.send
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query.search);
        res.send({
            products:[]
        })
    }

})

app.get('/help/*', (req, res)=>{
    res.render('helpError',{
        title: 'Help article not found',
        errorHelp: 'No help article here'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404 , page not found',
        errortext: 'Not the right page'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});








 

// app.com
// app.com/help
// app.com/about




// app.get('', (req, res)=>{
//     res.send('<h2>This is the home page</h2>')
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name:'Arya',
//     },{
//         name:'sarah'
//     }
// ]);
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>This is the about page</h1>');
// })
