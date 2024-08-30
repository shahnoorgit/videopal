"use client";
import React, { useEffect } from "react";
import VideoCard from "../components/VideoCard"; // Import your VideoCard component
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store";
import { getUserByClerk } from "@/lib/actions/user.action";
import { handleError } from "@/utils";

const videos = [
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 1",
    channelName: "Channel A",
    views: "1M views",
    uploadDate: "2 days ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 2",
    channelName: "Channel B",
    views: "800K views",
    uploadDate: "3 days ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 3",
    channelName: "Channel C",
    views: "600K views",
    uploadDate: "1 week ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 4",
    channelName: "Channel D",
    views: "1.2M views",
    uploadDate: "2 weeks ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 5",
    channelName: "Channel E",
    views: "300K views",
    uploadDate: "3 weeks ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 6",
    channelName: "Channel F",
    views: "150K views",
    uploadDate: "1 month ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 7",
    channelName: "Channel G",
    views: "200K views",
    uploadDate: "2 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 8",
    channelName: "Channel H",
    views: "1.5M views",
    uploadDate: "3 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 9",
    channelName: "Channel I",
    views: "400K views",
    uploadDate: "4 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 10",
    channelName: "Channel J",
    views: "2M views",
    uploadDate: "6 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 11",
    channelName: "Channel K",
    views: "750K views",
    uploadDate: "7 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 12",
    channelName: "Channel L",
    views: "350K views",
    uploadDate: "8 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 13",
    channelName: "Channel M",
    views: "900K views",
    uploadDate: "9 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 14",
    channelName: "Channel N",
    views: "450K views",
    uploadDate: "10 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 15",
    channelName: "Channel O",
    views: "1.3M views",
    uploadDate: "11 months ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 16",
    channelName: "Channel P",
    views: "600K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 17",
    channelName: "Channel Q",
    views: "350K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 18",
    channelName: "Channel R",
    views: "500K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 19",
    channelName: "Channel S",
    views: "200K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 20",
    channelName: "Channel T",
    views: "800K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 21",
    channelName: "Channel U",
    views: "300K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 22",
    channelName: "Channel V",
    views: "1M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 23",
    channelName: "Channel W",
    views: "600K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 24",
    channelName: "Channel X",
    views: "700K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 25",
    channelName: "Channel Y",
    views: "2M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 26",
    channelName: "Channel Z",
    views: "400K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 27",
    channelName: "Channel AA",
    views: "1.1M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 28",
    channelName: "Channel BB",
    views: "1.5M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 29",
    channelName: "Channel CC",
    views: "250K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 30",
    channelName: "Channel DD",
    views: "350K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 31",
    channelName: "Channel EE",
    views: "500K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 32",
    channelName: "Channel FF",
    views: "700K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 33",
    channelName: "Channel GG",
    views: "800K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 34",
    channelName: "Channel HH",
    views: "1.2M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 35",
    channelName: "Channel II",
    views: "1M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 36",
    channelName: "Channel JJ",
    views: "900K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 37",
    channelName: "Channel KK",
    views: "600K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 38",
    channelName: "Channel LL",
    views: "750K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 39",
    channelName: "Channel MM",
    views: "850K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 40",
    channelName: "Channel NN",
    views: "300K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 41",
    channelName: "Channel OO",
    views: "400K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 42",
    channelName: "Channel PP",
    views: "1.3M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 43",
    channelName: "Channel QQ",
    views: "2M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 44",
    channelName: "Channel RR",
    views: "1.5M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 45",
    channelName: "Channel SS",
    views: "600K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 46",
    channelName: "Channel TT",
    views: "900K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 47",
    channelName: "Channel UU",
    views: "1M views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 48",
    channelName: "Channel VV",
    views: "300K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 49",
    channelName: "Channel WW",
    views: "500K views",
    uploadDate: "1 year ago",
  },
  {
    thumbnail: "/image/thumbnail.webp",
    title: "Sample Video 50",
    channelName: "Channel XX",
    views: "750K views",
    uploadDate: "1 year ago",
  },
];

const VideoFeed: React.FC = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { setUser, resetUser, user: zuUser } = useUserStore();
  useEffect(() => {
    if (userId) {
      const getUser = async (userId: string) => {
        try {
          const userdata = await getUserByClerk(userId);
          console.log(userdata);
          setUser(userdata);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      getUser(userId);
    } else {
      resetUser();
    }
  }, [userId, user, setUser]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          thumbnail={video.thumbnail}
          title={video.title}
          channelName={video.channelName}
          views={video.views}
          uploadDate={video.uploadDate}
        />
      ))}
    </div>
  );
};

export default VideoFeed;
