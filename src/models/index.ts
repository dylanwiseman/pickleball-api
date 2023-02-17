import { UserModel, GameModel, StatsModel } from "./models";
export { UserModel, GameModel, StatsModel };

import { User } from "./types";
import { Game } from "./types";
import { Stats } from "./types";

interface UserMod extends Omit<User, "_id"> {
  _id?: string;
}

interface GameMod extends Omit<Game, "_id"> {
  _id?: string;
}

interface StatsMod extends Omit<Stats, "_id"> {
  _id?: string;
}
