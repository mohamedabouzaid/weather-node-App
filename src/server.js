const express=require('express')
const path = require('path');
const port =process.env.PORT ||3000
const app =express();
const hbs=require('hbs')
const geocoding=require('./utils/geocoging');
const forecast=require('./utils/forcast')

//absolute path to folder
//console.log(__dirname);
//absolute path to file
//console.log(__filename);
//the path of static page


//express define path 
//console.log(path.join(__dirname,'../public'));
const publicDirectoryPath=  path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialPath=path.join(__dirname,'../template/partial')

//setup handler engin and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
res.render('index',{
    title: 'Weather',
    name: 'Abouzaid'
   
})

})
///send html
app.get('/about',(req,res)=>{
    res.render('about',{
       
        title: 'About Me',
        name: ' abouzaid'
    })
    
    })
 //send json(object trans to json)
 app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Abouzaid'
    })
})
  //send array of objects
  app.get('/weather', (req, res) => {
      if(!req.query.address){
    
        return res.send({error:"you must send address"})

      }
      else{
         
        geocoding(req.query.address, (error, {latitude,longitude,place}={}) => {
            if(error){
              return res.send(error);
            }
            
             forecast(latitude,longitude,(error, forecastData) => {
               if(error){
                 return res.send(error);
               }
               res.send({
                forecast: forecastData,
                place,
                address:req.query.address

                });
             
             });
           });
      }
   
})
//req.query
app.get('/product', (req, res) => {
    if(!req.query.search){
     return res.send({error:'you must enter search'})

    }
    console.log(req.query.search);
    res.send({search:'your select search'})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abouzaid',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aouzaid',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))



