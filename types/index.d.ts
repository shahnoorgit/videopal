/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

declare type ChannelType = {
  _id: string;
  name: string;
  creator: string;
  bio: string;
  profile: string;
  banner: string;
  subscribers: string[];
  videos: string[];
  createdAt: Date;
};
