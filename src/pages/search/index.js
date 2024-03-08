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
          console.log(data); // Log the data to the console
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
    <div className="flex flex-col gap-10">
      {/** Videos */}
      <div>
        {searchData && (
          <div className="flex flex-col gap-[16px] h-[201px]">
            {searchData.map((video, index) => (
              <Link
                href={video.url}
                key={index}
                className="flex items-center gap-4"
              >
                <img
                  src={video.thumbnail}
                  className="w-[325px] aspect-video rounded-xl"
                />
                <div>
                  <h1 className="text-lg font-semibold line-clamp-2">
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
                    <p className="text-base ml-2">{video.uploaderName}</p>
                  </div>
                  <p className="text-base text-secondaryText">
                    {video.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/** Channels */}
      {/* <div>
        <h1 className="font-semibold text-2xl mb-3">Channels</h1>
        {searchChannels && (
          <div className="flex flex-wrap gap-6 justify-around">
            {searchChannels.slice(0, 6).map((channel, index) => (
              <div key={index}>
                <ChannelCard channel={channel} />
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default SearchPage;
