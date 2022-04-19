const { request } = require('express');
const { response } = require('express');
const { distance } = require('../helpers/distance');
const Turn = require('../models/turn');

const turnsByUIDGet = async (req = request, res = response) => {
  try {
    const uid = req.params.uid;
    const turns = await Turn.find({ user: uid });
    res.json(turns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const turnsInitPost = async (req = request, res = response) => {
  try {
    const turn = new Turn(req.body);
    await turn.save();
    res.status(201).json(turn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const turnsFinishPut = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const turn = await Turn.findById(id);
    if (!turn) {
        return res.status(400).json({error: {msg: `Id [${id}] de turno no existe`}});
    }
    const klms = distance(
      Number(turn.locationIn.lat),
      Number(turn.locationIn.long),
      Number(req.body.locationOut.lat),
      Number(req.body.locationOut.long)
    );
    
    if (klms > 1) {
      return res
        .status(400)
        .json({
          error: { msg: `El punto de salida no coincide con el punto de ingreso [${klms} klms]` },
        });
    }
    
    turn.totalTimeMins = (new Date(req.body.timeOut) - turn.timeIn)/(1000*60);
    turn.locationOut = req.body.locationOut;
    turn.timeOut = req.body.timeOut;
    await turn.save();
    res.status(200).json(turn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  turnsByUIDGet,
  turnsInitPost,
  turnsFinishPut,
};
