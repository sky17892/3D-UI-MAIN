import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { pauseImg, playImg, replayImg } from "../utils";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoContainerRef = useRef([]);
  const videoSpanRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "play none none none", // onEnter, onLeave, onEnterBack, onLeaveBack
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let animationGsap = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(animationGsap.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoContainerRef.current[videoId], {
              width: window.innerWidth < 760 ? "6vw" : "8vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "#fff",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoContainerRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      const animationUpdate = () => {
        animationGsap.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      // GSAP Ticker는 애니메이션을 주기적으로 업데이트하고 관리하는 역할을 하며, 애니메이션의 실행 주기를 제어하고 여러 애니메이션을 동기화하는 데 매우 유용한 기능. 프레임 기반 애니메이션을 원활하게 실행하고, 필요한 경우 타이머 기반 작업도 처리할 수 있다.

      if (isPlaying) {
        gsap.ticker.add(animationUpdate);
      } else {
        gsap.ticker.remove(animationUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetadata = (e, i) => setLoadedData((pre) => [...pre, e]);

  return (
    <div>
      <div className="flex items-center">
        {hightlightsSlides.map((list, idx) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-2xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[idx] = el)}
                  onEnded={() =>
                    idx !== 3
                      ? handleProcess("video-end", idx)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({
                      ...pre,
                      isPlaying: true,
                    }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetadata(e, idx)}
                  // className={`${
                  //   list.id === 2 && "translate-x-44"
                  // } pointer-events-none`}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, idx) => (
                  <p key={idx} className="text-xl md:text-2xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-800 backdrop-blur-[8px] rounded-full">
          {videoRef.current.map((_, idx) => (
            <span
              key={idx}
              className="mx-2 w-3 h-3 bg-gray-400 rounded-full relative"
              ref={(el) => (videoContainerRef.current[idx] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[idx] = el)}
              ></span>
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt=""
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
