const { Schema, model } = require('mongoose');

const TurnSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El id de usuario es obligatorio'],
  },
  locationIn: {
    lat: {
      type: String,
      required: [true, 'La latitud de ingreso es requerida'],
    },
    long: {
      type: String,
      required: [true, 'La longitud de ingreso es requerida'],
    },
  },
  timeIn: {
    type: Date,
    required: [true, 'Hora de inicio es requerida'],
  },
  locationOut: {
    lat: { type: String },
    long: { type: String },
  },
  timeOut: {
    type: Date,
  },
  totalTimeMins: {
    type: Number,
    default: 0,
  },
  extraHourReason: {
    type: String,
  },
  isManualFinished: {
    type: Boolean,
  },
});

module.exports = model('Turn', TurnSchema);
