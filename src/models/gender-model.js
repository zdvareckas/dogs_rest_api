const { Schema, model } = require('mongoose');
const yup = require('yup');

const genderSchema = Schema({
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const genderValidationSchema = yup.object().shape({
  title: yup.string().typeError('Gender title must be a string')
    .required('Gender title is required')
});

const genderUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Gender title must be a string')
});

genderSchema.statics.validateNew = (genderData) => genderValidationSchema.validateSync(genderData);
genderSchema.statics.validateUpdate = (genderData) => genderUpdateValidationSchema.validateSync(genderData);

const GenderModel = model('Gender', genderSchema);

module.exports = GenderModel;
