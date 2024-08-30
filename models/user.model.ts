import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  likedVids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
  ],
  profile: {
    type: String,
  },
  publicChannel: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    required: false,
  },
  privateChannel: [
    {
      type: Schema.Types.ObjectId,
      ref: "PrivateChannel",
    },
  ],
  tier: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
});

const User = models.User || model("User", userSchema);

export default User;
