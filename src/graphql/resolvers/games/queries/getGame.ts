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
    name: "GetGame",
    type: TC.mongooseResolvers.findOne(),
    args: { id: "MongoID" },
    description: "Get game info by id",
    resolve: async ({ args, context }: any) => {
      console.log(args.id);
      const game = await GameModel.findOne({
        _id: args.id,
      });
      console.log("found game: ", game);
      return game;
    },
  };
  return resolver;
}

export default returnResolver;
