import React, { useState, useRef, useEffect } from "react";
import MenuIcon from "../icons/MenuIcon";
import Link from "next/link";
import LogoIcon from "../icons/LogoIcon";
import SearchBox from "./SearchBox";
import HomeIcon from "../icons/HomeIcon";
import VideoLibraryIcon from "../icons/VideoLibraryIcon";
import MusicPlaylistIcon from "../icons/MusicPlaylistIcon";
import { useRouter } from "next/router";
import CompassIcon from "../icons/CompassIcon";

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const router = useRouter();

  const menuItems = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon size={23} color={"#fff"} />,
      type: "primary",
    },
    {
      label: "Explore",
      href: "/explore",
      icon: <CompassIcon size={23} color={"#fff"} />,
      type: "primary",
    },
    {
      label: "Videos",
      href: "/library/videos",
      icon: <VideoLibraryIcon size={23} color={"#fff"} />,
      type: "secondary",
    },
    {
      label: "Songs",
      href: "/library/songs",
      icon: <MusicPlaylistIcon size={23} color={"#fff"} />,
      type: "secondary",
    },
  ];

  return (
    <div>
      {/** Header */}
      <header
        className="fixed top-0 left-0 right-0 h-[55px] bg-primaryBg"
        style={{ zIndex: 999 }}
      >
        <div className="w-full h-full flex items-center justify-between px-5">
          {/** Logo */}
          <div className="flex items-center gap-5">
            <button
              onClick={openMenu}
              className="w-[35px] h-[35px] flex items-center justify-center hover:bg-hoverBg rounded-full"
            >
              <MenuIcon size={30} color={"#fff"} />
            </button>

            <Link href={`/`} className="flex items-center gap-1">
              <LogoIcon size={30} />{" "}
              <span className="text-lg font-medium">UTube</span>
            </Link>
          </div>

          {/** Search box */}
          <div>
            <SearchBox />
          </div>

          <div>
            <button>
              <img
                src={`https:github.com/khandelwaldev.png`}
                width={35}
                height={35}
                className="rounded-full"
              />
            </button>
          </div>
        </div>
      </header>

      {/** Sidebar */}
      <div
        className="fixed left-0 bottom-0 w-[75px] bg-primaryBg"
        style={{
          height: "calc(100% - 55px)",
          transition: "0.3s ease",
          zIndex: 99,
        }}
      >
        <div className="w-full h-full flex flex-col items-center mt-5">
          {menuItems.map(
            (item, index) =>
              item.type === "primary" && (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 w-[80%] py-[5px] rounded-lg ${
                    router.pathname == item.href
                      ? "bg-secondaryBg hover:bg-secondaryHoverBg"
                      : "hover:bg-hoverBg"
                  } mb-1`}
                >
                  <i className="w-[30px] h-[30px] flex items-center justify-center">
                    {item.icon}
                  </i>
                  <span className="text-sm text-primaryText">{item.label}</span>
                </Link>
              )
          )}

          <hr className="w-[88%] border border-border my-6" />

          <span className="text-base font-medium mb-3 text-secondaryText">
            Library
          </span>

          {menuItems.map(
            (item, index) =>
              item.type === "secondary" && (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 w-[80%] py-[5px] rounded-lg ${
                    router.pathname == item.href
                      ? "bg-secondaryBg hover:bg-secondaryHoverBg"
                      : "hover:bg-hoverBg"
                  } mb-1`}
                >
                  <i className="w-[30px] h-[30px] flex items-center justify-center">
                    {item.icon}
                  </i>
                  <span className="text-sm text-primaryText">{item.label}</span>
                </Link>
              )
          )}
        </div>
      </div>

      {/** SideMenu (Closed) */}
      <div
        className={`fixed left-0 bottom-0 ${
          menuOpen ? "w-[225px]" : "w-0"
        } bg-primaryBg overflow-hidden h-full`}
        style={{
          transition: "0.3s ease",
          zIndex: 9999,
        }}
        ref={menuRef}
      >
        {/** Logo */}
        <div className="flex items-center gap-5 p-3">
          <button
            onClick={closeMenu}
            className="w-[35px] h-[35px] flex items-center justify-center hover:bg-hoverBg rounded-full"
          >
            <MenuIcon size={30} color={"#fff"} />
          </button>

          <Link href={`/`} className="flex items-center gap-1">
            <LogoIcon size={30} />{" "}
            <span className="text-lg font-medium">UTube</span>
          </Link>
        </div>
        <div className="w-full h-full flex flex-col mt-5">
          {menuItems.map(
            (item, index) =>
              item.type === "primary" && (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex gap-3 items-center px-3 mx-auto w-[93%] h-[40px] rounded-lg ${
                    router.pathname == item.href
                      ? "bg-secondaryBg hover:bg-secondaryHoverBg"
                      : "hover:bg-hoverBg"
                  } mb-1`}
                >
                  <i className="w-[30px] h-[30px] flex items-center justify-center">
                    {item.icon}
                  </i>
                  <span className="text-sm text-primaryText">{item.label}</span>
                </Link>
              )
          )}

          <hr className="w-[88%] border border-border my-6" />

          <span className="text-base font-medium mb-3 text-secondaryText ml-3">
            Library
          </span>

          {menuItems.map(
            (item, index) =>
              item.type === "secondary" && (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex gap-3 items-center px-3 mx-auto w-[93%] h-[40px] rounded-lg ${
                    router.pathname == item.href
                      ? "bg-secondaryBg hover:bg-secondaryHoverBg"
                      : "hover:bg-hoverBg"
                  } mb-1`}
                >
                  <i className="w-[30px] h-[30px] flex items-center justify-center">
                    {item.icon}
                  </i>
                  <span className="text-sm text-primaryText">{item.label}</span>
                </Link>
              )
          )}
        </div>
      </div>

      {/** Main Content */}
      <main
        className="p-5 mt-[55px] ml-[75px]"
        style={{ transition: "0.3s all" }}
      >
        <div
          className={`fixed top-[55px] left-0 w-full h-full bg-black/30 ${
            menuOpen ? "bolck" : "hidden"
          }`}
          style={{ zIndex: 99 }}
        ></div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
