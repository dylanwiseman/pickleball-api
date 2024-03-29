import { GameModel } from "../../../../models";
import addGames, {
  returnResolver as addGamesResolver,
} from "../../users/mutations/addGames";

import mongoose from "mongoose";
import { GenerateResolverType } from "graphql-compose-mongoose";
import { ObjectTypeComposer } from "graphql-compose";
import { UserTC } from "../../../../graphql/typeComposers";

function returnResolver(
  TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
    mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
  }
) {
  const resolver = {
    name: "CreateGame",
    type: TC.mongooseResolvers.findOne(),
    args: {
      player1_id: "MongoID",
      player1_plus: "Int!",
      player1_plusPoint: "Int!",
      player1_minus: "Int!",
      player1_minusPoint: "Int!",
      player2_id: "MongoID",
      player2_plus: "Int!",
      player2_plusPoint: "Int!",
      player2_minus: "Int!",
      player2_minusPoint: "Int!",
      player3_id: "MongoID",
      player3_plus: "Int!",
      player3_plusPoint: "Int!",
      player3_minus: "Int!",
      player3_minusPoint: "Int!",
      player4_id: "MongoID",
      player4_plus: "Int!",
      player4_plusPoint: "Int!",
      player4_minus: "Int!",
      player4_minusPoint: "Int!",
      team1Score: "Int!",
      team2Score: "Int!",
      win: "Boolean!",
    },
    description: "Create and save a game",
    resolve: async ({ args, context }: any) => {
      const gameParams = {
        player1: {
          id: args.player1_id,
          plus: args.player1_plus,
          plusPoint: args.player1_plusPoint,
          minus: args.player1_minus,
          minusPoint: args.player1_minusPoint,
        },
        player2: {
          id: args.player2_id,
          plus: args.player2_plus,
          plusPoint: args.player2_plusPoint,
          minus: args.player2_minus,
          minusPoint: args.player2_minusPoint,
        },
        player3: {
          id: args.player3_id,
          plus: args.player3_plus,
          plusPoint: args.player3_plusPoint,
          minus: args.player3_minus,
          minusPoint: args.player3_minusPoint,
        },
        player4: {
          id: args.player4_id,
          plus: args.player4_plus,
          plusPoint: args.player4_plusPoint,
          minus: args.player4_minus,
          minusPoint: args.player4_minusPoint,
        },
        team1Score: args.team1Score,
        team2Score: args.team2Score,
        win: args.win,
      };
      const addGames = addGamesResolver(UserTC);
      const game = await GameModel.create(gameParams);

      // Call AddGames resolver for each player
      await Promise.all([
        addGames.resolve({
          args: { _id: args.player1_id, game: game._id },
          context,
        }),
        addGames.resolve({
          args: { _id: args.player2_id, game: game._id },
          context,
        }),
        addGames.resolve({
          args: { _id: args.player3_id, game: game._id },
          context,
        }),
        addGames.resolve({
          args: { _id: args.player4_id, game: game._id },
          context,
        }),
      ]);

      return game;
    },
  };
  return resolver;
}

export default returnResolver;
