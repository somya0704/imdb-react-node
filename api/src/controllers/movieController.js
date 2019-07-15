const Movie = require('../models/movieModel');

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('actors', 'name');
    return res.json({ status: 'success', message: 'movies list retrieved', movies });
  } catch (error) {
    res.status(400).json({ error: 'something went wrong' });
    throw error;
  }
};

export const newMovie = async (req, res) => {
  try {
    let { data } = req.body;
    data = JSON.parse(data);
    if (req.file) {
      data.poster = `http://localhost:3000/${req.file.path}`.replace('/uploads', '');
    }
    const movie = new Movie(data);
    const newCreatedMovie = await movie.save();
    // const actors = newMovie.actors;
    // for (let index = 0; index < actors.length; index++) {
    //    const actorId = actors[index];
    //   let updatedActor =
    // await Actor.findOneAndUpdate({_id: actorId},  { '$addToSet': { 'movies': newMovie._id } });
    // }
    return res.json({ status: 'ok', message: 'new movie added', data: newCreatedMovie });
  } catch (error) {
    res.status(400).json({ error });
    throw error;
  }
};

export const updateMovie = async (req, res) => {
  try {
    let { data } = req.body;
    data = JSON.parse(data);
    if (req.file) {
      data.poster = req.file.path;
    }
    const movie = await Movie.findOneAndUpdate({ _id: req.params.id }, data);
    if (movie) {
      res.status(200).json({ message: 'successfully updated', data: movie });
    } else {
      return res.status(500).send('not found');
    }
  } catch (error) {
    res.status(400).json({ error });
    throw error;
  }
}
;
