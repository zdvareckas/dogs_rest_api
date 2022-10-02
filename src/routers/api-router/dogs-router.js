const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  update,
  remove
} = require('../../controllers/dogs-controller');

const dogsRouter = Router();

dogsRouter.get('/', fetchAll);
dogsRouter.get('/:id', fetch);
dogsRouter.post('/', create);
dogsRouter.patch('/:id', update);
dogsRouter.delete('/:id', remove);

module.exports = dogsRouter;
