const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let ButtonModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();
const setInnerText = innerText => _.escape(innerText).trim();

const ButtonSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    set: setName,
  },
  presses: {
    type: Number,
    min: 0,
    required: true,
  },
  innerText: {
    type: String,
    required: true,
    set: setInnerText,
  },
  fillColor: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  borderColor: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
    ref: 'Account',
  },
  goal: {
    type: Number,
    required: true,
  },
  reward: {
    type: String,
    required: true,
  },
  goalMet: {
    type: Boolean,
    required: true,
  },
});

ButtonSchema.statics.toAPI = doc => ({
  name: doc.name,
  presses: doc.presses,
  innerText: doc.innerText,
  fillColor: doc.fillColor,
  textColor: doc.textColor,
  borderColor: doc.borderColor,
  borderWidth: doc.borderWidth,
  goal: doc.goal,
  reward: doc.reward,
});

ButtonSchema.statics.removeByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return ButtonModel.findOneAndRemove(search, callback);
};

ButtonSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return ButtonModel.findOne(search, callback);
};
ButtonSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };
  return ButtonModel.findOne(search, callback);
};

ButtonModel = mongoose.model('Button', ButtonSchema);

module.exports.ButtonModel = ButtonModel;
module.exports.ButtonSchema = ButtonSchema;
