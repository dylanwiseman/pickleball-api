import { UserModel } from "../../../../models";
import mongoose from "mongoose";

import { GenerateResolverType } from "graphql-compose-mongoose";
import { ObjectTypeComposer } from "graphql-compose";

export function returnResolver(
  TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
    mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
  }
) {
  const resolver = {
    name: "AddGames",
    type: TC.mongooseResolvers.findOne(),
    args: { _id: "MongoID", game: "MongoID" },
    description: "add game to user's game array",
    resolve: async ({ args, context }: any) => {
      const user = await UserModel.findOne({
        _id: args._id,
      });
      console.log("found user to update: ", user);
      user.games.push(args.game);
      await user.save();
      console.log("user should be updated", user);
      return user;
    },
  };
  return { ...resolver, resolve: resolver.resolve }; // add the resolve property to the returned object
}

export default returnResolver;
