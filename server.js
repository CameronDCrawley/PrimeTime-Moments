require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport= require('passport')
const cors = require('cors')
const PORT = 8080
const iconicMoment = require('./app/models/iconicMoment')
require('./config/passport')(passport)
module.exports = function(app, passport){

}


const uri = process.env.MONGODB_URI;


mongoose.connect(uri)
.then(data => {
    console.log('connected to the database')


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
    })
})

app.use(cors())
//parses incoming data from the form in my ejs
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())
app.use(session({
    secret:'me',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs'); // set up ejs for templating
app.use((req,res,next)=>{
    next()
})




// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        const user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

app.get('/', isLoggedIn, async (request, response)=>{
   let moments = await iconicMoment.find({})
   console.log(moments)
     response.render('index.ejs',{moments:moments})

})
app.get('/api/iconicMoment', async (request, response)=>{
let moments = await iconicMoment.find()
.then(moment => {
    console.log(moments)
    response.json(moments)

})    
})



app.post('/addMoment', (req, res) => {
  iconicMoment.create(
{   image:req.body.image,
    playerName: req.body.playerName, 
    date:req.body.date,
    moment: req.body.moment,
    descriptionImg: req.body.descriptionImg,
    sport:req.body.sport,
    bid:req.body.bid,
    buyNow:req.body.buyNow
})
.then(result => {
    console.log('saved in the database')
    res.redirect('/')
})
.catch(error => {
    console.error(error)
    res.status(500).send('Erro saving character')
})
})


app.put('/addBid', async(req, res) => {
const {momentName, bid}  = req.body 
console.log(momentName) 
console.log(bid)
 const result = await iconicMoment.findOneAndUpdate(
    {moment:momentName},
    {$push: { bid:bid }},
    {new:true}

  );
  console.log(result)
    res.json('New Bid')
  })


app.delete('/sold', (req, res) => {
const {momentName} = req.body
    iconicMoment.findOneAndDelete(
        {moment:momentName},
        
)
      .then(result => {
        console.log(result)
    console.log('Sold!!!!')
    res.json('Sold!!!!')
})
.catch(error => {
    console.error(error)
    res.status(500).send('Error saving character')
})
})


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');

}
