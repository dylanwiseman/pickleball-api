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
    name: "GetGamesByUser",
    type: TC.mongooseResolvers.findOne(),
    args: { gamesArray: ["String"] },
    description: "Get games by user",
    resolve: async ({ args, context }: any) => {
      console.log(args.gamesArray);

      const games = await GameModel.find({
        _id: { $in: args.gamesArray },
      });
      console.log("found games: ", games);
      return games;

      //   const games = args.games.map(async (gameId: "String") => {
      //     const game = await GameModel.findOne({
      //       _id: gameId,
      //     });
      //     console.log("found game: ", game);
      //     return game;
      //   });
      //   return games;
    },
  };
  return resolver;
}

export default returnResolver;
