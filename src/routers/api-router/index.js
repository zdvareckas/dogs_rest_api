const { Router } = require('express');
const dogsRouter = require('./dogs-router');
const gendersRouter = require('./genders-router');

const apiRouter = Router();

apiRouter.use('/dogs', dogsRouter);
apiRouter.use('/genders', gendersRouter);

module.exports = apiRouter;
