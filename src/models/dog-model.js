const { Schema, model, Types } = require('mongoose');
const yup = require('yup');

const dogSchema = Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genderId: {
    type: Schema.Types.ObjectId,
    ref: 'Gender',
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const dogValidationSchema = yup.object().shape({
  name: yup.string().typeError('Dog name must be a string.')
    .required('Dog name is required.'),
  age: yup.number().typeError('Dog age must be a number')
    .required('Dog age is required'),
  description: yup.string().typeError('Dog description must be a string.'),
  genderId: yup
    .string().typeError('Dog genderId must be a string')
    .required('Dog genderId is required')
    .test(
      'is-mongo-object-id',
      'Dog genderId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  breed: yup.string().typeError('Dog breed must be a string')
    .required('Dog breed is required'),
  img: yup.string().typeError('Dog img must be a string')
    .required('Dog img is required')
    .url('Dog img must be a valid URL')
});

const dogUpdateValidationSchema = yup.object().shape({
  name: yup.string().typeError('Dog name must be a string.'),
  age: yup.number().typeError('Dog age must be a number'),
  description: yup.string().typeError('Dog description must be a string.'),
  genderId: yup
    .string().typeError('Dog genderId must be a string'),
  breed: yup.string().typeError('Dog breed must be a string'),
  img: yup.string().typeError('Dog img must be a string')
    .url('Dog img must be a valid URL'),
});

dogSchema.statics.validateNew = (dogData) => dogValidationSchema.validateSync(dogData);
dogSchema.statics.validateUpdate = (dogData) => dogUpdateValidationSchema.validateSync(dogData);

const DogModel = model('Dog', dogSchema);

module.exports = DogModel;
