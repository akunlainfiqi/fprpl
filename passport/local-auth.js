const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;

const { UsersModels } = require('../models');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UsersModels.findById(id);
    done(null, user);
  });

passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
    },
    async (req,email,password,done) => {
        const user = await UsersModels.findOne({email: email});
        if(user){
            return done(null, false, {message: 'User already exists'});
        } else {
            const newUser = new UsersModels();
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
        const user = await UsersModels.findOne({email: email});
        const res = await user.comparePassword(email,password);
        if(!user || !res){
            return done(null, false, {message: 'Username or password incorrect'})
        }
        return done(null, user);
    }
));

