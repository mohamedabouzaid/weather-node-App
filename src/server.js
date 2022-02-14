const express=require('express')
const path = require('path');
const port = 3000
const app =express();
const hbs=require('hbs')
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
    title:"Web",
   
})

})
///send html
app.get('/about',(req,res)=>{
    res.render('about',{
       
        name:"mohamed"
    })
    
    })
 //send json(object trans to json)
 app.get('/help', (req, res) => {
    res.send({name:"mohamed",age:26})
  })
  //send array of objects
 app.get('/weather', (req, res) => {
   res.send([{name:"mohamed",age:26},{name:"ahmed",age:20}])
 })
 app.get('**', (req, res) => {
   res.send('404 page')
 })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))



