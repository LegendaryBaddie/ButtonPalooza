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
        set: 0,
        required: true,
    },
    innerText: {
        type: String,
        required: true,
        set: innerText,
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
    borderWidth: {
        type: String,
        required: true,
    },
});

ButtonModel = mongoose.model('Button', ButtonSchema);

module.exports.ButtonModel = ButtonModel;
module.exports.ButtonSchema = ButtonSchema;
