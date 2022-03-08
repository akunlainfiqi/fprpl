const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.status(200).send({ message: 'users' });
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

router.get('/profile', isAuthenticated, (req,res,next)=>{
    return res.status(200).send(req.user);
})

router.post('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
}
)

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(302).redirect('/');
}
module.exports = router;