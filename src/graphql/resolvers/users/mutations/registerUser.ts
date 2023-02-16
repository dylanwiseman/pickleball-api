import { UserModel } from "../../../../models";

import mongoose from "mongoose";
import { GenerateResolverType } from "graphql-compose-mongoose";
import { ObjectTypeComposer } from "graphql-compose";
import firebaseAdmin from "firebase-admin";

function returnResolver(
  TC: ObjectTypeComposer<mongoose.Document<any, {}>, any> & {
    mongooseResolvers: GenerateResolverType<mongoose.Document<any, {}>, any>;
  }
) {
  console.log("registering....");
  const resolver = {
    name: "RegisterUser",
    type: TC.mongooseResolvers.findOne(),
    args: {
      userName: "String!",
      email: "String!",
      password: "String!",
    },
    description: "Registers a new user",
    resolve: async ({ args, context }: any) => {
      const auth = firebaseAdmin.auth();
      const firebaseUser = await auth.createUser({
        ...args,
      });
      console.log("fb user: ", firebaseUser);
      const userParams = {
        email: args.email,
        authId: firebaseUser.uid,
        userName: args.userName,
      };
      console.log("registering user");
      const user = await UserModel.create(userParams);

      return user;
    },
  };

  return resolver;
}

export default returnResolver;
