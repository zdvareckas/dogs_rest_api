const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const DogModel = require('../models/dog-model');

const createDogNotFoundError = (dogId) => createNotFoundError(`Dog with #${dogId} was not found.`);

const fetchAll = async (req, res) => {
  const { extend } = req.query;

  try {
    const dogDocs = extend === 'genderId'
      ? await DogModel.find().populate('genderId')
      : await DogModel.find()

    res.status(200).json(dogDocs);
  } catch (error) { sendErrorResponse(error, res) }
};

const fetch = async (req, res) => {
  const dogId = req.params.id;
  const { extend } = req.query;

  try {
    const foundDog = extend === 'genderId'
      ? await DogModel.findById(dogId).populate('genderId')
      : await DogModel.findById(dogId)

    if (foundDog === null) throw createDogNotFoundError(dogId);

    res.status(200).json(foundDog);

  } catch (error) { sendErrorResponse(error, res) }
};

const create = async (req, res) => {
  const newDogDoc = req.body;

  try {
    DogModel.validateNew(newDogDoc);

    const newDog = await DogModel.create(newDogDoc);

    res.status(201).json(newDog);

  } catch (error) { sendErrorResponse(error, res) }
};

const update = async (req, res) => {
  const dogId = req.params.id;
  const { name, age, description, genderId, breed, img } = req.body;
  const newDogData = removeEmptyProps({ name, age, description, genderId, breed, img });

  try {
    await DogModel.validateUpdate(newDogData);

    const updatedDogData = await DogModel.findByIdAndUpdate(
      dogId,
      newDogData,
      { new: true }
    );

    if (updatedDogData === null) throw createDogNotFoundError(dogId);

    res.status(200).json(updatedDogData);

  } catch (error) { sendErrorResponse(error, res); }
};

const remove = async (req, res) => {
  const dogId = req.params.id;
  try {
    const deletedDog = await DogModel.findByIdAndDelete(dogId);
    if (deletedDog === null) throw createDogNotFoundError(dogId);

    res.status(200).json(deletedDog);
  } catch (error) { sendErrorResponse(error, res) }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  update,
  remove
};
