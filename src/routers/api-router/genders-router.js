const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  update,
  remove
} = require('../../controllers/genders-controller');

const gendersRouter = Router();

gendersRouter.get('/', fetchAll);
gendersRouter.get('/:id', fetch);
gendersRouter.post('/', create);
gendersRouter.patch('/:id', update);
gendersRouter.delete('/:id', remove);

module.exports = gendersRouter;
