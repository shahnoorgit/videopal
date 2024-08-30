import { model, models, Schema } from "mongoose";

const privateChannelSchema = new Schema({
  name: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    default: "This is a private channels's bio",
  },
  profile: { type: String, required: true },
  banner: { type: String },
  joiners: [
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

const PrivateChannel =
  models.PrivateChannel || model("PrivateChannel", privateChannelSchema);

export default PrivateChannel;
