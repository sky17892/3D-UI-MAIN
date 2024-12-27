import React, { Suspense } from "react";
import IPhone from "./IPhone";

import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";

const ModelView = ({
  index,
  groupRef,
  controlRef,
  setRotationSize,
  gsapType,
  size,
  item,
}) => {
  // console.log(groupRef);
  return (
    <div>
      <View
        index={index}
        id={gsapType}
        className={`w-full h-full absolute ${
          index === 2 ? "right-[-100%]" : ""
        }`}
      >
        {/* ambientLight: https://velog.io/@9rganizedchaos/Three.js-journey-%EA%B0%95%EC%9D%98%EB%85%B8%ED%8A%B8-14 */}
        <ambientLight intensity={0.3} />

        {/* PerspectiveCamera: https://justmakeyourself.tistory.com/entry/camera-setting-threejs */}
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />

        <Lights />

        {/* OrbitControls: https://velog.io/@juunini/three.js-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%95%98%EB%8B%A4 */}
        <OrbitControls
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0, 0)}
          onEnd={() => setRotationSize(controlRef.current.getAzimuthalAngle())}
        />
        {/* Suspens: https://www.elancer.co.kr/blog/detail/267 */}
        <group
          ref={groupRef}
          name={`${index === 1 ? "small" : "large"}`}
          position={[0, 0, 0]}
        >
          <Suspense
            fallback={
              <Html>
                <div>Loading...</div>
              </Html>
            }
          >
            <IPhone
              scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
              item={item}
              size={size}
            />
          </Suspense>
        </group>
      </View>
    </div>
  );
};

export default ModelView;