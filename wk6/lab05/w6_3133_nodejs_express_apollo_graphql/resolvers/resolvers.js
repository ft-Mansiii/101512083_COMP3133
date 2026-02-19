import MovieModel from "../models/Movie.js";

const resolvers = {
  Query: {
    // 2a) Get all movies
    getAllMovies: async () => {
      return await MovieModel.find();
    },

    // 2b) Get movie by ID
    getMovieById: async (_, { id }) => {
      return await MovieModel.findById(id);
    },

    // 2c) Get movies by Director name using STATIC method
    getMoviesByDirectorName: async (_, { director_name }) => {
      return await MovieModel.findByDirectorName(director_name);
    },
  },

  Mutation: {
    // 3a) Insert new movie
    addMovie: async (_, { input }) => {
      const movie = new MovieModel(input);
      return await movie.save();
    },

    // 3b) Update movie
    updateMovie: async (_, { id, input }) => {
      const updated = await MovieModel.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
      if (!updated) throw new Error("Movie not found");
      return updated;
    },

    // 3c) Delete movie by ID
    deleteMovieById: async (_, { id }) => {
      const deleted = await MovieModel.findByIdAndDelete(id);
      return deleted ? true : false;
    },
  },

  Movie: {
    // Map Mongo _id to GraphQL id
    id: (parent) => parent._id.toString(),
  },
};

export default resolvers;
