const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.status(200).send({message:"root"});
})

router.post('/signin', (req, res, next) => { 
    passport.authenticate('local-signin', (err,user,info) => {
        if (err) {
            return next(err);
        }
        if (!user){
            return res.status(409).send(info);
        }
        req.logIn(user,{session: false},(err)=>{
            if(err){
                console.log("login erorr ", err);
            }
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, 'capekngurusinauth',{expiresIn:"1d"});
            return res.json({ token });
        });
    })(req, res, next);
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup',{session: false}, (err,user,info) => {
        if (err) {
            return next(err);
        }
        if (!user){
            return res.status(409).send(info);
        }
        return res.status(200).send(user);
    })(req, res, next);
});

router.post('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;