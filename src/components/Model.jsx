import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import ModelView from "./ModelView";
import { yellowImg } from "./../utils/index";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateGsapTimeline } from "./../constants/animation";

const Model = () => {
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 pro in Natural Titanium",
    color: ["#8f8a81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });

  // 기기 크기에 따른 컨트롤 요소 저장
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation states
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 1,
      });
    }

    if (size === "small") {
      animateGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 1,
      });
    }
  }, [size]);

  return (
    <section className="py-10">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading px-4 pt-8">
          Take a closer look.
        </h1>
      </div>

      <div className="flex flex-col items-center mt-5">
        <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          <ModelView
            index={1}
            groupRef={small}
            controlRef={cameraControlSmall}
            setRotationSize={setSmallRotation}
            gsapType="view1"
            item={model}
            size={size}
          />

          <ModelView
            index={2}
            groupRef={large}
            controlRef={cameraControlLarge}
            setRotationSize={setLargeRotation}
            gsapType="view2"
            item={model}
            size={size}
          />

          <Canvas
            className="w-full h-full"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              overflow: "hidden",
            }}
            eventSource={document.getElementById("root")}
          >
            <View.Port />
          </Canvas>
        </div>

        <div className="mx-auto w-full">
          <p className="text-sm font-light text-center mb-5">{model.title}</p>

          <div className="flex-center">
            <ul className="color-container">
              {models.map((item, idx) => (
                <li
                  key={idx}
                  className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                  style={{ backgroundColor: item.color[0] }}
                  onClick={() => setModel(item)}
                ></li>
              ))}
            </ul>

            <button className="size-btn-container">
              {sizes.map(({ label, value }) => (
                <span
                  key={label}
                  className="size-btn"
                  style={{
                    backgroundColor: size === value ? "#fff" : "transparent",
                    color: size === value ? "#000" : "#fff",
                  }}
                  onClick={() => setSize(value)}
                >
                  {label}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;