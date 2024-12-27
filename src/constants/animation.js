export const animateGsapTimeline = (
    timeline,
    rotationRef,
    rotationState,
    firstTarget,
    secondTarget,
    animationProps
  ) => {
    timeline.to(rotationRef.current.rotation, {
      y: rotationState,
      duration: 1,
      ease: "power2.inOut",
    });
  
    timeline.to(
      firstTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    );
  
    timeline.to(
      secondTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    );
  };
  
  // '<'는 timeline의 시작점을 의미한다. 즉, rotation이 끝나고 animationProps가 시작된다는 의미이다.