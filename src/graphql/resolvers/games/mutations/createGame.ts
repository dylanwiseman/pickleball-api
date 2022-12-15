import { GameModel } from "../../../../models";

import mongoose from "mongoose";
import { GenerateResolverType } from "graphql-compose-mongoose";
import { ObjectTypeComposer } from "graphql-compose";

function returnResolver(
  TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
    mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
  }
) {
  const resolver = {
    name: "CreateGame",
    type: TC.mongooseResolvers.findOne(),
    args: {
      player1_id: "String!",
      player1_plus: "Number!",
      player1_plusPoint: "Number!",
      player1_minus: "Number!",
      player1_minusPoint: "Number!",
      player2_id: "String!",
      player2_plus: "Number!",
      player2_plusPoint: "Number!",
      player2_minus: "Number!",
      player2_minusPoint: "Number!",
      player3_id: "String!",
      player3_plus: "Number!",
      player3_plusPoint: "Number!",
      player3_minus: "Number!",
      player3_minusPoint: "Number!",
      player4_id: "String!",
      player4_plus: "Number!",
      player4_plusPoint: "Number!",
      player4_minus: "Number!",
      player4_minusPoint: "Number!",
      team1Score: "Number!",
      team2Score: "Number!",
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
      const game = await GameModel.create(gameParams);
      return game;
    },
  };
  return resolver;
}

export default returnResolver;
