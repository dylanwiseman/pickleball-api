import { UserModel, GameModel } from "../models/models";
import { composeMongoose } from "graphql-compose-mongoose";

const UserTC = composeMongoose(UserModel, {});
const GameTC = composeMongoose(GameModel, {});

export { UserTC, GameTC };
