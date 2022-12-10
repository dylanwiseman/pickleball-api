import { UserModel } from "../../../../models";
import mongoose from "mongoose";

import { GenerateResolverType } from "graphql-compose-mongoose";
import { ObjectTypeComposer } from "graphql-compose";
import { ValidationError, AuthenticationError } from "apollo-server-express";

function returnResolver(
  TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
    mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
  }
) {
  const resolver = {
    name: "GetUserByName",
    type: TC.mongooseResolvers.findOne(),
    args: { userName: "String" },
    description: "Get info for user by name",
    resolve: async ({ args, context }: any) => {
      console.log(args.userName);
      const user = await UserModel.findOne({
        userName: args.userName,
      });
      console.log("found user: ", user);
      return user;
    },
  };
  return resolver;
}

export default returnResolver;
