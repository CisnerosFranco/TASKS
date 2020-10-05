const passport = require('passport');
const user = require('../models/user');
const localStrategy = require('passport-local').Strategy;
const objectId = require('mongodb').ObjectId;
const { createUsersValidation } = require('../validate/index');

//LOGIN
passport.use('local-signin', new localStrategy(
    {
        //Credenciales requeridas
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true //para que admita callback
    },
    async (req, email, password, done) => {
        let $user = await user.findOne({ email: email });
        if (!$user) {
            return done(null, false, { message: 'not found user' });
        }
        else if (!$user.comparePassword(password)) {
            return done(null, false, { message: 'Wrong Incorrect password' });
        }
        return done(null, {
            id: $user.id,
            name: $user.name,
            email: $user.email,
            avatar: $user.avatar
        });

    }
))

passport.use('local-signup', new localStrategy(
    {
        //Credenciales requeridas
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true //para que admita callback
    },
    async (req, email, password, done) => {
        const $user = await user.findOne({ email: email });
        const dataValidation = createUsersValidation(req.body);
        if (!$user) {
            if(dataValidation) {
                return done(null, false, { message: dataValidation, status: 403 });
            }
            else {
                const newUser = new user({
                    name: req.body.name,
                    email: email,
                    password: password,
                    avatar: req.body.name.charAt(0).toUpperCase()
                });
                await newUser.save();
                return done(null, {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    avatar: newUser.avatar
                });
            }
        }
        else {
            return done(null, false, { message: 'there is already a user with the same email', status: 403 });
        }
    }
))

//serializamos el usuario por su id
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//optenemos el usuario y le damos a passport
passport.deserializeUser(async (id, done) => {
    const usuario = await user.findById(id);
    done(null, usuario);
})







