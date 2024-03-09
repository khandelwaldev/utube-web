import VideoCard from "$/components/global/cards/VideoCard";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pipedapi.kavin.rocks/trending?region=US"
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
            <Link
              href={video.url}
              key={index}
              className="w-[350px] max-[1230px]:w-[300px] max-[1062px]:w-[425px] max-[989px]:w-[350px] max-[839px]:w-[280px] max-[625px]:w-[250px] max-[565px]:w-full"
            >
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
                    {formatCount(video.views)} views&nbsp;&nbsp;•&nbsp;&nbsp;
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
                    <span className="line-clamp-1">{video.uploaderName}</span>
                    <span className="line-clamp-1">
                      {formatCount(video.views)} views
                    </span>
                    <span className="line-clamp-1">{video.uploadedDate}</span>
                  </p>
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
