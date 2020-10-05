const express = require('express');
const path = require('path');
const logger = require('morgan');
const Handlebars = require('handlebars')
const hbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

require('./passport/auth-user');
const passport = require('passport')


const app = express();

// view engine setup
const engine = hbs.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', engine.engine);
app.set('view engine', 'hbs');


//midlewares
app.use(express.static(path.join(__dirname, 'public', 'stylesheets')));
app.use(express.static(path.join(__dirname, 'public', 'javascripts')));
app.use(express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//setting session
app.use(session({
  secret: 'secretKey', 
  resave: false,
  saveUninitialized: false,
  
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

//variables globales
app.use((req, res, next) => {
  app.locals.user = req.user;
  app.locals.error_msg = req.flash('board_error')
  app.locals.tasks_error = req.flash('tasks_error');
  next();
})

// ROUTES
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));




//active server
app.listen(3000,()=> {
  console.log('app running in localhost:3000');
})


// NOTA
// para poder mostrar los datos de los objetos en los helpers de express-passport
// a partir de las ultimas versiones de express-passport nesesitamos instalar como adicional
// una version especifica de handlebars

// npm i handlebars@4.5.0
// la siguiente propiedad de handlebars
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// y por ultimo los agregamos en la configuracion del motor
// handlebars: allowInsecurePrototypeAccess(Handlebars)
