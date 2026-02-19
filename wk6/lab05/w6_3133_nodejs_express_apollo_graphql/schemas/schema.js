import { gql } from "graphql-tag";

const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
  }

  input AddMovieInput {
    name: String!
    director_name: String!
    production_house: String!
    release_date: String! # YYYY-MM-DD
    rating: Float!
  }

  input UpdateMovieInput {
    name: String
    director_name: String
    production_house: String
    release_date: String
    rating: Float
  }

  type Query {
    # 2a) Get all movies
    getAllMovies: [Movie!]!

    # 2b) Get movie by ID
    getMovieById(id: ID!): Movie

    # 2c) Get movies by Director name using static method
    getMoviesByDirectorName(director_name: String!): [Movie!]!
  }

  type Mutation {
    # 3a) Insert new movie
    addMovie(input: AddMovieInput!): Movie!

    # 3b) Update movie
    updateMovie(id: ID!, input: UpdateMovieInput!): Movie!

    # 3c) Delete movie by ID
    deleteMovieById(id: ID!): Boolean!
  }
`;

export default typeDefs;
