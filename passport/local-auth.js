const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;

const { Users } = require('../models');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Users.findById(id);
    done(null, user);
  });

passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
    },
    async (req,email,password,done) => {
        const user = await Users.findOne({email: email});
        if(user){
            return done(null, false, {message: 'User already exists'});
        } else {
            const newUser = new Users();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            await newUser.save();
            done(null, newUser);
        }
    }
));

passport.use('local-signin', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
    },
    async (req,email,password,done) => {
        const user = await Users.findOne({email: email});
        if(!user || !user.comparePassword(email,password)){
            return done(null, false, {message: 'Username or password incorrect'})
        }
        return done(null, user);
    }
));