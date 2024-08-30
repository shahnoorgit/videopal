"use server";
import User from "@/models/user.model";
import connectDb from "../../database/mongo";
import { handleError } from "@/utils";
import Channel from "@/models/channel.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectDb();

    const newUser = await User.create({
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      email: user.email,
      clerkId: user.clerkId,
      likedVids: [],
      history: [],
      subscriptions: [],
      profile: user.photo,
      privateChannel: [],
      tier: "free",
    });

    const initChannel = await Channel.create({
      name: newUser.username,
      creator: newUser._id,
      profile: newUser.profile,
      subscribers: [],
      videos: [],
    });

    newUser.publicChannel = initChannel._id;
    await newUser.save();

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (id: string, user: UpdateUserParams) => {
  try {
    await connectDb();
    //finding current user
    const curentUser = await User.findOne({ clerkId: id });

    // Update the Channel document
    const channel = await Channel.findOne({ name: curentUser.username });
    if (channel) {
      await channel.updateOne({ name: user.username, profile: user.photo });
    } else {
      console.log("Channel not found for this username.");
    }

    // Update the User document
    const updatedUser = await User.updateOne(
      { clerkId: id },
      {
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        profile: user.photo,
      }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error updating user or channel:", error);
    handleError(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectDb();
    const DelUser = await User.findOne({ clerkId: id });

    if (!DelUser) return handleError("User not found");

    // Delete the user's channel
    await Channel.findOneAndDelete({ creator: DelUser._id });

    // Delete the user
    await DelUser.deleteOne();

    return { message: "User deleted successfully" };
  } catch (error) {
    return handleError(error);
  }
};

export const getUserByClerk = async (id: string) => {
  try {
    await connectDb();
    const user = await User.findOne({ clerkId: id });
    console.log(id);
    if (!user) return handleError("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};
