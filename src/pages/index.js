import VideoCard from "$/components/global/cards/VideoCard";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pipedapi.kavin.rocks/trending?region=IN"
      );
      const data = await response.json();
      console.log(data); // Log the data to the console
      setHomePageData(data);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div>
      {homePageData && (
        <div className="flex flex-wrap gap-6 justify-around">
          {homePageData.map((video, index) => (
            <Link href={video.url} key={index} className="w-[350px]">
              <div className="w-[350px] aspect-video">
                <img
                  src={video.thumbnail}
                  className="w-[350px] h-auto aspect-video rounded-lg"
                />
              </div>
              <div className="flex flex-col mt-3">
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
                    {formatCount(video.views)} views&nbsp;&nbsp;•&nbsp;&nbsp;
                    {video.uploadedDate}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
