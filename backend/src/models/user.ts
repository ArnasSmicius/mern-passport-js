import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

interface ISession {
  refreshToken: string;
}

const Session = new Schema<ISession>({
  refreshToken: { type: String, default: "" },
});

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  firstName: string;
  lastName: string;
  authStrategy: string;
  points: number;
  refreshToken: [typeof Session];
}

// 2. Create a Schema corresponding to the document interface.
const User = new Schema<IUser>({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  authStrategy: { type: String, default: "local" },
  points: { type: Number, default: 50 },
  refreshToken: { type: [Session] },
});

// Delete refreshToken from toJSON method in order to not expose refresh token
User.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);

module.exports = model<IUser>("User", User);
