const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;

var app =express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();

});

hbs.registerHelper('screamIt',(text) =>{
   return text.toUpperCase();
})
app.set('view engine','hbs');

//register middleware
app.use((req, res, next)=>{
 var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n',(error) =>{
    if (error){
      console.log('Unable to append to server log');
    }
  });
  console.log(log)
  next();
});
//Maintenance Mode
// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

//Public Page setup
app.use(express.static(__dirname+'/public'));
app.get('/', (req, res) =>{
  res.render('home.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage:'Welcome to Bengali Association of Rochester'
  })
});

app.get('/about',(req,res) =>{

  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });

});

app.get('/bad',(req,res) =>{
  res.send ({
    errorMessage:'Unable to hnadle'
  });
});

app.listen(port,() =>{
  console.log(`Server is up and running on port ${port}`);
});
