const router = require('express').Router();
const passport = require('passport');

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
        req.logIn(user, (err)=>{
            if(err){
                console.log("login erorr ", err);
            }
            req.session.save(()=>{res.status(302).redirect('/users/profile');});
        });
    })(req, res, next);
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err,user,info) => {
        if (err) {
            return next(err);
        }
        if (!user){
            return res.status(409).send(info);
        }
        return res.status(302).redirect('/users/profile');
    })(req, res, next);
});

router.post('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;