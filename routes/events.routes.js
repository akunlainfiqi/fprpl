const router = require('express').Router();
const { EventsController } = require('../controllers');

router.get('/', (req, res) => {
    res.status(200).send({ message: 'events' });
});

router.get(
    '/all',
    asyncHandler(EventsController.getAll)
);

router.get(
    '/:id',
    asyncHandler(EventsController.getById)
);

router.post(
    '/create',
    isAuthenticated,
    asyncHandler(EventsController.create)
);

router.patch(
    '/:id',
    asyncHandler(EventsController.update)
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