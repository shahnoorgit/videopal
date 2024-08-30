import { Model, model, models, Schema } from "mongoose";

const videoSchema = new Schema({
  url: {
    type: String,
    required: true,
    match: /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,63})([\/\w \.-]*)*\/?$/i,
  },

  title: { type: String, required: true },

  description: { type: String, required: false },

  thumbnail: { type: String, required: true },

  duration: { type: Number, required: true },

  views: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  dislikes: { type: Number, default: 0 },

  channelType: {
    type: String,
    required: true,
    enum: ["Channel", "PrivateChannel"],
  },

  channel: {
    type: Schema.Types.ObjectId,
    refPath: "channelType",
    required: true,
  },

  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

const Video = models.Video || model("Video", videoSchema);

export default Video;
