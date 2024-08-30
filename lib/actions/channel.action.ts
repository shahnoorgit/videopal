"use server";
import Channel from "@/models/channel.model";
import connectDb from "../../database/mongo";
import { handleError } from "@/utils";

export const getChannelById = async (username: string) => {
  try {
    console.log(username);
    await connectDb();
    const channel = await Channel.findOne({ name: username });

    if (!channel) return { error: "Channel not found" };
    return JSON.parse(JSON.stringify(channel));
  } catch (error) {
    handleError(error);
  }
};
