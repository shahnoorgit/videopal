import mongoose, { model, models, Schema } from "mongoose";

const channelSchema = new Schema({
  name: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    default: "This is a channels's bio",
  },
  profile: { type: String, required: true },
  banner: {
    type: String,
    default:
      "https://assets.tumblr.com/images/default_header/optica_pattern_05.png",
  },
  subscribers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Channel = models.Channel || model("Channel", channelSchema);

export default Channel;
