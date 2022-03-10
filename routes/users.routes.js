const router = require('express').Router();
const { UsersController } = require('../controllers')

router.get(
    '/all',
    asyncHandler(UsersController.getAllUsers)
)

router.get('/', (req, res) => {
    res.status(200).send({ message: 'users' });
});

router.get(
    '/profile', 
    isAuthenticated, 
    asyncHandler(UsersController.getUsers)
);

router.get(
    '/profile/:id', 
    asyncHandler(UsersController.getUsersById)
);

function asyncHandler(handler){
    return async function(req, res, next){
        try {
            await handler(req, res);
        } catch (err) {
            next(err);
        }
    }
}
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(302).redirect('/');
}
module.exports = router;