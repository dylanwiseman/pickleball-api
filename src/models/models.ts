import mongoose, { model, Schema } from "mongoose";

const StatsSchema = new Schema({
  gamesPlayed: { type: Number, default: 0 },
  avgContribution: { type: Number, default: 0 },
  totalContribution: { type: Number, default: 0 },
});

const UserSchema = new Schema(
  {
    authId: { type: String, require: true },
    email: { type: String, require: true },
    userName: String,
    games: { type: [String], default: [], require: true },
    stats: { type: Schema.Types.ObjectId, ref: "Stats" },
  },
  { timestamps: true }
);

const GameSchema = new Schema(
  {
    player1: {
      id: { type: String, require: true },
      plus: Number,
      plusPoint: Number,
      minus: Number,
      minusPoint: Number,
    },
    player2: {
      id: { type: String, require: true },
      plus: Number,
      plusPoint: Number,
      minus: Number,
      minusPoint: Number,
    },
    player3: {
      id: { type: String, require: true },
      plus: Number,
      plusPoint: Number,
      minus: Number,
      minusPoint: Number,
    },
    player4: {
      id: { type: String, require: true },
      plus: Number,
      plusPoint: Number,
      minus: Number,
      minusPoint: Number,
    },
    team1Score: { type: Number, require: true },
    team2Score: { type: Number, require: true },
    win: { type: Boolean, require: true },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || model("User", UserSchema, "users");

export const GameModel =
  mongoose.models.Game || model("Game", GameSchema, "games");

export const StatsModel =
  mongoose.models.Stats || model("Stats", StatsSchema, "stats");
