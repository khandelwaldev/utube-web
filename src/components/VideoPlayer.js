// VideoPlayer.js
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";

const VideoPlayer = ({ src, thumbnail, title, uploaderName }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const source = src;
    const video = videoRef.current;
    const defaultOptions = {};

    if (!Hls.isSupported()) {
      video.src = source;
      const player = new Plyr(video, defaultOptions);
    } else {
      const hls = new Hls();
      hls.loadSource(source);

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const availableQualities = hls.levels.map((l) => l.height);
        availableQualities.unshift(0);

        defaultOptions.quality = {
          default: 0,
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };

        defaultOptions.i18n = {
          qualityLabel: {
            0: "Auto",
          },
        };

        hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
          const span = document.querySelector(
            ".plyr__menu__container [data-plyr='quality'][value='0'] span"
          );
          if (hls.autoLevelEnabled) {
            span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
          } else {
            span.innerHTML = `AUTO`;
          }
        });

        const player = new Plyr(video, defaultOptions);

        if ("mediaSession" in navigator) {
          var navMS = navigator.mediaSession;
          navMS.metadata = new MediaMetadata({
            title: title,
            artwork: [
              {
                src: thumbnail,
                sizes: "128x128 256x256",
                type: "image/x-icon",
              },
            ],
          });
          // navMS.setActionHandler('play', function() {
          //     player.play();
          // });
          // navMS.setActionHandler('pause', function() {
          //     player.pause();
          // });
          // navMS.setActionHandler('stop', function() {
          //     player.stop();
          // });
          // navMS.setActionHandler('seekbackward', function() {
          //     player.rewind(10);
          // navMS.setActionHandler('seekforward', function() {
          //     player.forward(10);
          // });
          // })
        }
      });

      hls.attachMedia(video);
      window.hls = hls;
    }

    function updateQuality(newQuality) {
      if (newQuality === 0) {
        window.hls.currentLevel = -1;
      } else {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            console.log("Found quality match with " + newQuality);
            window.hls.currentLevel = levelIndex;
          }
        });
      }
    }
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      poster={thumbnail}
      style={{ width: "100%", objectFit: "cover" }}
    ></video>
  );
};

export default VideoPlayer;
