const router = require('express').Router();
const { TransactionsController } = require('../controllers');

router.get('/', (req, res) => {
    res.status(200).send({message:"transactions"});
})

router.get('/all',
    asyncHandler(TransactionsController.getAll)
)

router.post(
    '/createDonate',
    isAuthenticated,
    asyncHandler(TransactionsController.createDonate)
);

router.post(
    '/createWithdraw',
    isAuthenticated,
    asyncHandler(TransactionsController.createDonate)
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