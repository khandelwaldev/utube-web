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
import { NextSeo } from "next-seo";
import DownIcon from "$/components/icons/DownIcon";

const Watch = () => {
  const router = useRouter();

  const id = router.query.v;

  const [videoData, setVideoData] = useState(null);
  const [videoComments, setVideoComments] = useState(null);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const openDecription = () => {
    setDescriptionOpen(true);
  };

  const closeDecription = () => {
    setDescriptionOpen(false);
  };

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

    const fetchVideoComments = async () => {
      try {
        const response = await fetch(
          `https://pipedapi.kavin.rocks/comments/${id}`
        );
        const data = await response.json();

        setVideoComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (id) {
      fetchVideoComments();
    }
  }, [id]);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  if (!videoComments) {
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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${videoData.title || "UTube"}`,
          text: `Watch ${
            videoData.title || "your favorite videos"
          } on UTube for free without any disturbing ADs`,
          url: `https://utube-web.vercel.app/watch?v=${id}`,
        });
        console.log("Successfully shared");
      } else {
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <NextSeo
        title={`${videoData.title} - UTube` || "Utube"}
        description={`Watch ${
          videoData.title || "your favorite videos"
        } on UTube for free without any disturbing ADs`}
        openGraph={{
          url: `https://utube-web.vercel.app/watch?v=${id}`,
          title: `${videoData.title} - UTube`,
          description: `Watch ${
            videoData.title || "your favorite videos"
          } on UTube for free without any disturbing ADs`,
          images: [
            {
              url: videoData.thumbnailUrl,
              width: 800,
              height: 420,
              alt: "UTube",
            },
          ],
        }}
      />
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between">
        <div className="w-full lg:w-[70%]">
          {/** video */}
          <div className="aspect-video object-cover">
            <VideoPlayer
              src={videoData.hls}
              thumbnail={videoData.thumbnailUrl}
              title={videoData.title}
              uploaderName={videoData.uploaderName}
            />
          </div>

          {/** Info */}
          <div className="mt-6 w-full">
            <h1 className="font-semibold text-base lg:text-xl line-clamp-2">
              {videoData.title}
            </h1>
            {/** Channel info */}
            <div className="w-full md:h-[55px] flex flex-col md:flex-row md:items-center md:justify-between gap-5 mt-[10px]">
              <div className="flex items-center gap-3 w-full md:w-[50%]">
                <img
                  src={
                    videoData.uploaderAvatar ||
                    "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                  }
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
                <button
                  onClick={handleShare}
                  className="w-[92px] h-full flex gap-1 items-center justify-center bg-secondaryBg hover:bg-secondaryHoverBg rounded-2xl"
                >
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

              {/** Short descrption */}
              <div
                className={`text-sm font-medium mt-[10px] description h-[60px] overflow-hidden ${
                  descriptionOpen ? "hidden" : "block"
                }`}
              >
                <p className="line-clamp-2">
                  {typeof videoData.description === "string"
                    ? parse(videoData.description)
                    : "Invalid description"}
                </p>
                <button onClick={openDecription}>more</button>
              </div>

              {/** Full Description */}
              <div
                className={`text-sm font-medium mt-[10px] description ${
                  descriptionOpen ? "block" : "hidden"
                }`}
              >
                <p>
                  {typeof videoData.description === "string"
                    ? parse(videoData.description)
                    : "Invalid description"}
                </p>
                <button onClick={closeDecription}>show less</button>
              </div>
            </div>

            {/** Comments */}
            <div className="mt-6 hidden md:flex flex-col gap-6">
              {videoComments.comments.map((cmnt, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    cmnt.commentId == null ? "hidden" : "block"
                  }`}
                >
                  <div>
                    <img
                      src={cmnt.thumbnail}
                      className="w-[35px] h-[35px] rounded-full"
                    />
                  </div>
                  <div>
                    <p>
                      <span className="text-sm font-medium">{cmnt.author}</span>
                      &nbsp;&nbsp;
                      <span className="text-sm text-secondaryText">
                        {cmnt.commentedTime}
                      </span>
                    </p>
                    <p className="text-sm mt-1 description">
                      {typeof cmnt.commentText === "string"
                        ? parse(cmnt.commentText)
                        : "Invalid description"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="flex items-center gap-1">
                        <i className="h-[30px] w-[30px] flex items-center justify-center hover:bg-secondaryHoverBg rounded-full">
                          <ThumbUpIcon size={22} color={"#fff"} />
                        </i>
                        <span className="text-sm text-secondaryText">
                          {formatCount(cmnt.likeCount)}
                        </span>
                      </button>
                      <button className="h-[30px] w-[30px] flex items-center justify-center hover:bg-secondaryHoverBg rounded-full rotate-180">
                        <ThumbUpIcon size={22} color={"#fff"} />
                      </button>
                      <button className="text-sm font-medium ml-1 py-1 px-2 rounded-2xl hover:bg-secondaryHoverBg">
                        Reply
                      </button>
                    </div>
                    <button
                      className={`w-[100px] h-[35px] flex items-center ${
                        cmnt.replyCount == -1 ? "hidden" : "block"
                      } rounded-2xl justify-center hover:bg-[#3ea6ff3b]`}
                    >
                      <span className="flex items-center gap-1">
                        <i>
                          <DownIcon size={18} color={"#3ea6ff"} />
                        </i>
                        <span className="text-[#3ea6ff] text-sm font-medium">
                          {formatCount(cmnt.replyCount)} replies
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/** Related videos */}
        {videoData.relatedStreams && (
          <div className="w-full lg:w-[28%] flex flex-row flex-wrap justify-around lg:justify-normal lg:flex-col gap-6">
            {videoData.relatedStreams.slice(1).map((video, index) => (
              <a href={video.url} key={index}>
                <div className="hidden lg:flex w-full h-auto xl:h-[100px] flex-col xl:flex-row gap-[16px] items-center justify-around">
                  <img
                    src={video.thumbnail}
                    className="w-full h-auto aspect-video xl:h-[96px] xl:w-auto rounded-lg"
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
                </div>

                {/** Another one */}

                <div className="lg:hidden w-[350px] max-[1230px]:w-[300px] max-[1062px]:w-[425px] max-[989px]:w-[350px] max-[839px]:w-[280px] max-[625px]:w-[250px] max-[565px]:w-full">
                  <div className="w-[350px] max-[1230px]:w-[300px] max-[1062px]:w-[425px] max-[989px]:w-[350px] max-[839px]:w-[280px] max-[625px]:w-[250px] max-[565px]:w-full aspect-video">
                    <img
                      src={video.thumbnail}
                      className="w-[350px] max-[1230px]:w-[300px] max-[1062px]:w-[425px] max-[989px]:w-[350px] max-[839px]:w-[280px] max-[625px]:w-[250px] max-[565px]:w-full h-auto aspect-video rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col mt-3 max-[839px]:hidden">
                    <div className="flex gap-3">
                      <img
                        src={video.uploaderAvatar}
                        className="w-[36px] h-[36px] rounded-full"
                      />
                      <h1 className="text-base font-medium line-clamp-2">
                        {video.title}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-[1px] mt-1 ml-[48px]">
                      <span className="text-sm text-secondaryText">
                        {video.uploaderName}
                      </span>
                      <span className="text-sm text-secondaryText">
                        {formatCount(video.views)}{" "}
                        views&nbsp;&nbsp;•&nbsp;&nbsp;
                        {video.uploadedDate}
                      </span>
                    </div>
                  </div>

                  <div className="hidden max-[839px]:flex mt-2 items-center gap-2">
                    <div className="max-w-[35px] w-full">
                      <img
                        src={video.uploaderAvatar}
                        className="w-[35px] h-[35px] rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-sm font-medium line-clamp-2">
                        {video.title}
                      </h1>
                      <p className="text-[12px] text-secondaryText line-clamp-1 flex items-center gap-2">
                        <span className="line-clamp-1">
                          {video.uploaderName}
                        </span>
                        <span className="line-clamp-1">
                          {formatCount(video.views)} views
                        </span>
                        <span className="line-clamp-1">
                          {video.uploadedDate}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Watch;
