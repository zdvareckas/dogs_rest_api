const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const GenderModel = require('../models/gender-model');

const createGenderNotFoundError = (genderId) => createNotFoundError(`Gender with #${genderId} was not found.`);

const fetchAll = async (req, res) => {
  try {
    const genderDocs = await GenderModel.find();

    res.status(200).json(genderDocs);
  } catch (error) { sendErrorResponse(error, res) }
};

const fetch = async (req, res) => {
  const genderId = req.params.id;

  try {
    const foundGender = await GenderModel.findById(genderId);

    if (foundGender === null) throw createGenderNotFoundError(genderId);

    res.status(200).json(foundGender);

  } catch (error) { sendErrorResponse(error, res) }
};

const create = async (req, res) => {
  const newGenderDoc = req.body;

  try {
    GenderModel.validateNew(newGenderDoc);

    const newGender = await GenderModel.create(newGenderDoc);

    res.status(201).json(newGender);

  } catch (error) { sendErrorResponse(error, res) }
};

const update = async (req, res) => {
  const genderId = req.params.id;
  const { title } = req.body;
  const newGenderData = { title };

  try {
    await GenderModel.validateUpdate(newGenderData);

    const updatedGenderData = await GenderModel.findByIdAndUpdate(
      genderId,
      newGenderData,
      { new: true }
    );

    if (updatedGenderData === null) throw createGenderNotFoundError(genderId);

    res.status(200).json(updatedGenderData);

  } catch (error) { sendErrorResponse(error, res); }
};

const remove = async (req, res) => {
  const genderId = req.params.id;

  try {
    const deletedGender = await GenderModel.findByIdAndDelete(genderId);

    if (deletedGender === null) throw createGenderNotFoundError(genderId);

    res.status(200).json(deletedGender);
  } catch (error) { sendErrorResponse(error, res) }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  update,
  remove
};
