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
    type: [TC],
    args: { gamesArray: ["String"] },
    description: "Get games by user",
    resolve: async ({ args, context }: any) => {
      console.log(args.gamesArray);

      const games = await GameModel.find({
        _id: { $in: args.gamesArray },
      });
      console.log("found games: ", games);
      return games;
    },
  };
  return resolver;
}

export default returnResolver;
