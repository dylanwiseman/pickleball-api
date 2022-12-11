import { GameModel } from "../../../../models";

import mongoose from "mongoose";
import { GenerateResolverType } from "graphql-compose-mongoose";
import { ObjectTypeComposer } from "graphql-compose";
// import firebaseAdmin from "firebase-admin";

function returnResolver(
  TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
    mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
  }
) {
  const resolver = {
    name: "CreateGame",
    type: TC.mongooseResolvers.findOne(),
    args: {
      userName: "String!",
      email: "String!",
      password: "String!",
    },
    description: "Create and save a game",
    resolve: async ({ args, context }: any) => {
      //   const auth = firebaseAdmin.auth();
      //   const firebaseUser = await auth.createUser({
      //     ...args,
      //   });
      const gameParams = {
        email: args.email,
        userName: args.userName,
      };
      const game = await GameModel.create(gameParams);

      return game;
    },
  };

  return resolver;
}

export default returnResolver;
