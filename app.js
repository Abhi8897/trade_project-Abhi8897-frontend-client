const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const gameRoutes=require('./routes/gameRoutes');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');



const app=express();
let port=3005;
let host='localhost';
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(methodOverride('_method'));



app.use(session({
    secret: 'jaksdhkjahsdjd',
    resave: false, // no need to save session unless it is updated.
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000},//lifetime of cookie- 60 mins
    store: new mongoStore({mongoUrl:'mongodb://127.0.0.1:27017/milestone4'}) //stores session in db with default collection name as sessions.
}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.user = req.session.user||null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
})



mongoose.connect('mongodb://127.0.0.1:27017/milestone4', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //start the server
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

    app.get('/',(req,res)=>{
        res.render('index');
    })
    
    app.get('/about',(req,res)=>{
        res.render('about');
    })
    
    app.get('/contact',(req,res)=>{
        res.render('contact');
    })

app.use('/games',gameRoutes);
app.use('/users', userRoutes);
app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});



