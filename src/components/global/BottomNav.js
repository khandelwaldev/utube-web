import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "../icons/HomeIcon";
import CompassIcon from "../icons/CompassIcon";
import VideoLibraryIcon from "../icons/VideoLibraryIcon";
import MusicPlaylistIcon from "../icons/MusicPlaylistIcon";

const BottomNav = () => {
  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon size={30} color={"#fff"} />,
      type: "primary",
    },
    {
      label: "Explore",
      href: "/explore",
      icon: <CompassIcon size={30} color={"#fff"} />,
      type: "primary",
    },
    {
      label: "Videos",
      href: "/library/videos",
      icon: <VideoLibraryIcon size={30} color={"#fff"} />,
      type: "secondary",
    },
    {
      label: "Songs",
      href: "/library/songs",
      icon: <MusicPlaylistIcon size={30} color={"#fff"} />,
      type: "secondary",
    },
  ];

  const router = useRouter();
  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full h-[55px] bg-primaryBg flex items-center justify-around">
        {navItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`flex items-center h-[45px] ${
                router.pathname === item.href
                  ? "bg-secondaryBg p-3 rounded-2xl gap-2"
                  : ""
              }`}
            >
              <i>{item.icon}</i>
              {router.pathname === item.href ? (
                <span className="text-lg font-medium">{item.label}</span>
              ) : (
                ""
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
