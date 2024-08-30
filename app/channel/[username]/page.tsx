"use client";
import React, { useEffect, useState } from "react";
import { getChannelById } from "@/lib/actions/channel.action";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Channel: React.FC = () => {
  const { username } = useParams();
  const [channel, setChannel] = useState<ChannelType | null>(null);

  useEffect(() => {
    const getChannel = async (username: string) => {
      try {
        const currentChannel = await getChannelById(username);
        console.log(currentChannel);
        if (currentChannel.error) {
          alert(currentChannel.error);
          console.log(currentChannel);
        } else {
          setChannel(currentChannel);
        }
      } catch (err) {
        console.error("Error fetching channel:", err);
      }
    };

    getChannel(username as string);
  }, [username]);

  const isLoading = !channel?.name;

  const subNums = channel?.subscribers.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Channel Banner */}
      <div className="relative">
        {isLoading ? (
          <Skeleton height={300} width={1200} />
        ) : (
          <Image
            src={channel?.banner!}
            alt={`${channel?.name} banner`}
            width={1200}
            height={300}
            className="w-screen h-60 object-cover"
          />
        )}
        <div className="absolute bg-transparent bottom-5 left-5 flex items-center space-x-4">
          {isLoading ? (
            <Skeleton circle height={120} width={120} />
          ) : (
            <Image
              src={channel?.profile!}
              alt={`${channel?.name} profile picture`}
              width={120}
              height={120}
              className="w-32 h-32 rounded-full shadow-md shadow-blue-800 border-4 border-gray-800 object-cover"
            />
          )}
          <div className=" bg-gray-400 rounded-lg shadow-md shadow-blue-800 p-4">
            {isLoading ? (
              <>
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={200} />
                <Skeleton height={20} width={300} className="mt-2" />
              </>
            ) : (
              <>
                <h1 className="text-4xl text-gray-900 font-bold">
                  {channel?.name}
                </h1>
                <p className="text-lg text-gray-900 mt-2">
                  {subNums} Subscriber
                </p>
                <p className="text-lg line-clamp-1 text-gray-900">
                  {channel?.bio}
                </p>
              </>
            )}
            {/* Subscribe Button */}
            <center>
              <div className="mt-3">
                {isLoading ? (
                  <Skeleton height={40} width={150} />
                ) : (
                  <button className="bg-blue-600 text-white py-2  shadow-md shadow-blue-600 px-4 rounded-full hover:bg-blue-700 transition">
                    Subscribe
                  </button>
                )}
              </div>
            </center>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 shadow-md">
        <nav className="flex space-x-4 border-b border-gray-700">
          <Link
            href={`/channel/${channel?.name}/videos`}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Videos
          </Link>
          <Link
            href={`/channel/${channel?.name}/about`}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            About
          </Link>
        </nav>
      </div>

      {/* Channel Content */}
      <main className="flex-1 bg-gray-900">
        {/* Content will be rendered here based on the active tab */}
      </main>
    </div>
  );
};

export default Channel;
