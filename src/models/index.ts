import { UserModel, GameModel } from "./models";
export { UserModel, GameModel };

import { User } from "./types";
import { Game } from "./types";

interface UserMod extends Omit<User, "_id"> {
  _id?: string;
}
