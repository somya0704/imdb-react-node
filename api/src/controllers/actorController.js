const Actor = require('../models/actorModel');

export const getActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    return res.json({ status: 'success', message: 'actors list retrieved', actors });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong' });
    throw error;
  }
};

export const newActor = async (req, res) => {
  const { data } = req.body;
  try {
    const actor = new Actor(data);
    const newCreatedActor = await actor.save();
    return res.json({ status: 'ok', message: 'new actor added', actor: newCreatedActor });
  } catch (error) {
    res.status(400).json({ error });
    throw error;
  }
};

export const updateActor = async (req, res) => {
  try {
    const actors = await Actor.findOneAndUpdate({ name: req.params.name }, req.body);
    if (!actors) {
      return res.status(404).send('not found');
    }
    res.status(200).send(actors);
  } catch (error) {
    res.status(400).json({ error: 'something went wrong' });
    throw error;
  }
};
