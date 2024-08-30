"use client";
import React from "react";
import Image from "next/image";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  channelName: string;
  views: string;
  uploadDate: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnail,
  title,
  channelName,
  views,
  uploadDate,
}) => {
  return (
    <div className="bg-white overflow-hidden shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail Container */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <Image
          src={thumbnail}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-1">{channelName}</p>
        <p className="text-gray-500 text-sm">
          {views} • {uploadDate}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
