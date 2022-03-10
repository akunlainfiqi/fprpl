const router = require('express').Router();
const { EventsController } = require('../controllers');

router.get(
    '/',
    asyncHandler(EventsController.getAll)
);

router.post(
    '/create',
    isAuthenticated,
    asyncHandler(EventsController.create)
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