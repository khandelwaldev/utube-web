import VideoPlayer from "$/components/VideoPlayer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from "date-fns";
import parse from "html-react-parser";
import ThumbDownIcon from "$/components/icons/ThumbDownIcon";
import ThumbUpIcon from "$/components/icons/ThumbUpIcon";
import ShareIcon from "$/components/icons/ShareIcon";
import MenuDotsIcon from "$/components/icons/MenuDotsIcon";
import Link from "next/link";

const Watch = () => {
  const router = useRouter();

  const id = router.query.v;

  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `https://pipedapi.kavin.rocks/streams/${id}`
        );
        const data = await response.json();

        setVideoData(data);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };
    if (id) {
      fetchVideoData();
    }
  }, [id]);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  function formatCount(count) {
    if (count === undefined || count === null) {
      return "N/A"; // or any default value you want to return for undefined or null
    }

    if (count >= 1000000000) {
      return (count / 1000000000).toFixed(1) + "B";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count.toString();
    }
  }

  function formatUploadDate(uploadDate) {
    if (!uploadDate) {
      return "Invalid date";
    }

    const now = new Date();
    const parsedUploadDate = parseISO(uploadDate);

    if (!parsedUploadDate || isNaN(parsedUploadDate.getTime())) {
      return "Invalid date format";
    }

    const minutesDiff = differenceInMinutes(now, parsedUploadDate);
    const hoursDiff = differenceInHours(now, parsedUploadDate);
    const daysDiff = differenceInDays(now, parsedUploadDate);
    const monthsDiff = differenceInMonths(now, parsedUploadDate);
    const yearsDiff = differenceInYears(now, parsedUploadDate);

    if (minutesDiff < 60) {
      return `${minutesDiff} ${minutesDiff === 1 ? "minute" : "minutes"} ago`;
    } else if (hoursDiff < 24) {
      return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`;
    } else if (daysDiff < 30) {
      return `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
    } else if (monthsDiff < 12) {
      return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"} ago`;
    } else {
      return `${yearsDiff} ${yearsDiff === 1 ? "year" : "years"} ago`;
    }
  }

  return (
    <div className="flex justify-between">
      <div className="w-[70%]">
        {/** video */}
        <div className="aspect-video">
          <VideoPlayer src={videoData.hls} thumbnail={videoData.thumbnailUrl} />
        </div>

        {/** Info */}
        <div className="mt-6 w-full">
          <h1 className="font-semibold text-xl line-clamp-2">
            {videoData.title}
          </h1>
          {/** Channel info */}
          <div className="w-full h-[55px] flex items-center justify-between mt-[10px]">
            <div className="flex items-center gap-3 w-[50%]">
              <img
                src={videoData.uploaderAvatar}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="h-[43px] flex flex-col">
                <h1 className="font-medium text-base line-clamp-1">
                  {videoData.uploader}
                </h1>
                <span className="text-secondaryText text-xs">
                  {formatCount(videoData.uploaderSubscriberCount)} subscribers
                </span>
              </div>

              <button className="w-[94px] h-[34px] flex items-center justify-center text-base font-semibold bg-white rounded-2xl text-black ml-5">
                Subscribe
              </button>
            </div>
            <div className="flex items-center h-[36px] gap-2">
              <div className="flex items-center h-full bg-secondaryBg rounded-2xl">
                <button className="w-[100px] h-full flex gap-1 items-center justify-center hover:bg-secondaryHoverBg rounded-l-2xl">
                  <ThumbUpIcon size={25} color={"#fff"} />
                  <span className="text-base font-medium">
                    {formatCount(videoData.likes)}
                  </span>
                </button>
                <span className="mx-[3px] text-secondaryText">|</span>
                <button className="w-[52px] h-full flex items-center justify-center hover:bg-secondaryHoverBg rounded-r-2xl">
                  <ThumbDownIcon size={20} color={"#fff"} />
                </button>
              </div>
              <button className="w-[92px] h-full flex gap-1 items-center justify-center bg-secondaryBg hover:bg-secondaryHoverBg rounded-2xl">
                <i>
                  <ShareIcon size={22} color={"#fff"} />
                </i>
                <span className="text-base font-medium">Share</span>
              </button>
              <button className="w-[36px] h-full bg-secondaryBg hover:bg-secondaryHoverBg rounded-full flex items-center justify-center">
                <MenuDotsIcon size={22} color={"#fff"} />
              </button>
            </div>
          </div>
          {/** Description */}
          <div className="bg-secondaryBg p-3 rounded-lg mt-3">
            <p className="font-medium text-sm">
              {formatCount(videoData.views)} views&nbsp;&nbsp;•&nbsp;&nbsp;
              {formatUploadDate(videoData.uploadDate)}
            </p>

            <div className="text-sm font-medium mt-[10px] description">
              {typeof videoData.description === "string"
                ? parse(videoData.description)
                : "Invalid description"}
            </div>
          </div>
        </div>
      </div>
      {/** Related videos */}
      {videoData.relatedStreams && (
        <div className="w-[28%] flex flex-col gap-6">
          {videoData.relatedStreams.slice(1).map((video, index) => (
            <a
              href={video.url}
              key={index}
              className="w-full h-[100px] flex gap-[16px] items-center justify-around"
            >
              <img
                src={video.thumbnail}
                className="h-[96px] w-auto rounded-lg"
              />
              <div className="h-full w-full flex-col">
                <h1 className="line-clamp-2 font-medium text-sm">
                  {video.title || video.name}
                </h1>
                <p className="text-[12px] line-clamp-1 text-secondaryText mt-1">
                  {video.uploaderName}
                </p>
                <p className="text-[10px] line-clamp-1 flex items-center text-secondaryText">
                  {formatCount(video.views)} views&nbsp;&nbsp;•{" "}
                  {video.uploadedDate || "undefined"}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watch;
