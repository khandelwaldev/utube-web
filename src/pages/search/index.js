import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const SearchPage = () => {
  const router = useRouter();

  const query = router.query.q;

  const [searchData, setSearchData] = useState(null); // videos

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(
            `https://pipedapi.kavin.rocks/search?q=${query}&filter=videos`
          );
          const data = await response.json();
          // console.log(data); // Log the data to the console
          setSearchData(data.items);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [query]);

  if (!searchData) {
    return <p>Loading...</p>;
  }

  function formatCount(count) {
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
    <>
      <NextSeo title={`${query} - UTube`} />
      <div>
        {searchData && (
          <div className="flex flex-col max-[750px]:flex-row max-[750px]:flex-wrap max-[750px]:justify-around gap-[16px] h-[201px]">
            {searchData.map((video, index) => (
              <Link href={video.url} key={index}>
                <div className="flex items-center gap-4 max-[750px]:hidden">
                  <img
                    src={video.thumbnail}
                    className="w-[325px] max-[940px]:w-[300px] aspect-video rounded-xl"
                  />
                  <div>
                    <h1 className="text-lg max-[940px]:text-base font-semibold line-clamp-2">
                      {video.title}
                    </h1>
                    <p className="text-[12px] text-secondaryText">
                      {formatCount(video.views)} views&nbsp;&nbsp;•&nbsp;&nbsp;
                      {video.uploadedDate}
                    </p>
                    <div className="h-[50px] flex items-center">
                      <img
                        src={video.uploaderAvatar}
                        className="w-[25px] h-[25px] rounded-full"
                      />
                      <p className="text-base max-[940px]:text-sm ml-2">
                        {video.uploaderName}
                      </p>
                    </div>
                    <p className="text-base max-[940px]:text-sm text-secondaryText max-[940px]:line-clamp-2">
                      {video.shortDescription}
                    </p>
                  </div>
                </div>

                {/** Another one */}
                <div className="hidden max-[750px]:block w-[350px] max-[1230px]:w-[300px] max-[1062px]:w-[425px] max-[989px]:w-[350px] max-[839px]:w-[280px] max-[625px]:w-[250px] max-[565px]:w-full">
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
