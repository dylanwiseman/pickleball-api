import { UserModel, GameModel, StatsModel } from "../models/models";
import { composeMongoose } from "graphql-compose-mongoose";

const UserTC = composeMongoose(UserModel, {});
const GameTC = composeMongoose(GameModel, {});
const StatsTC = composeMongoose(StatsModel, {});

export { UserTC, GameTC, StatsTC };
