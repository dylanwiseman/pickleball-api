import { ObjectTypeComposer, schemaComposer } from "graphql-compose";
import mongoose from "mongoose";
import { GenerateResolverType } from "graphql-compose-mongoose";
import * as userResolvers from "./resolvers/users";
import * as gameResolvers from "./resolvers/games";
import { UserTC, GameTC } from "./typeComposers";

const createGQLSchema = () => {
  const addGameResolvers = (
    TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
      mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
    }
  ) => {
    TC.addResolver(gameResolvers.createGame(TC));
    TC.addResolver(gameResolvers.getGamesByUser(TC));
    TC.addResolver(gameResolvers.getGame(TC));

    const mutation: { [name: string]: any } = {};
    mutation.CreateGame = TC.getResolver("CreateGame");
    schemaComposer.Mutation.addFields(mutation);

    const query: { [name: string]: any } = {};
    query.GetGamesByUser = TC.getResolver("GetGamesByUser");
    query.GetGame = TC.getResolver("GetGame");
    schemaComposer.Query.addFields(query);
  };

  const addUserResolvers = (
    TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
      mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
    }
  ) => {
    TC.addResolver(userResolvers.getSelf(TC));
    TC.addResolver(userResolvers.registerUser(TC));
    TC.addResolver(userResolvers.getUserByName(TC));
    TC.addResolver(userResolvers.addGames(TC));

    const query: { [name: string]: any } = {};
    query.GetSelf = TC.getResolver("GetSelf");
    query.GetUserByName = TC.getResolver("GetUserByName");
    schemaComposer.Query.addFields(query);

    const mutation: { [name: string]: any } = {};
    mutation.RegisterUser = TC.getResolver("RegisterUser");
    mutation.AddGames = TC.getResolver("AddGames");
    schemaComposer.Mutation.addFields(mutation);
  };
  addGameResolvers(GameTC);
  addUserResolvers(UserTC);

  const addUserRelations = () => {
    UserTC.addRelation("games", {
      resolver: () => GameTC.mongooseResolvers.connection(),
      prepareArgs: {
        filter: (source) => ({
          _id: { $in: source.games || [] },
        }),
      },
      projection: { games: true },
    });

    const addGameRelations = () => {
      GameTC.addRelation("player1.id", {
        resolver: () => GameTC.mongooseResolvers.findById(),
        prepareArgs: { _id: (source: any) => source.player1.id || null },
        projection: { player1: { id: true } },
      });
    };

    addGameRelations();
    addUserRelations();
  };
  return schemaComposer.buildSchema();
};

export { createGQLSchema };
