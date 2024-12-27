import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "./../utils/index";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 768 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrc = () => {
    if (window.innerWidth < 768) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc);

    // clean up
    return () => {
      window.removeEventListener("resize", handleVideoSrc);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2.5, duration: 1 });
    gsap.to("#bt", {
      opacity: 1,
      y: -30,
      delay: 2.5,
      duration: 1,
      ease: "expo.out",
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative flex flex-center">
      <div className="h-5/6 flex-center w-full flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="w-[80%]">
          <video autoPlay muted key={videoSrc} className="pointer-events-none">
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div
          id="bt"
          className="flex flex-col items-center translate-y-20 opacity-0"
        >
          <a href="#highlights" className="btn">
            Buy
          </a>
          <p className="font-normal text-xl">From $199/month or $999</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
