"use client";

import { useEffect, useRef, useState } from "react";

export default function BoomerangCloudVideo() {
  const normalVideoRef = useRef<HTMLVideoElement>(null);
  const reversedVideoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState<"normal" | "reversed">("normal");
  const currentVideoRef = useRef<"normal" | "reversed">("normal");
  const blendDuration = 0.6; // seconds blend for crossfade
  const normalBlendStartedRef = useRef(false);
  const reversedBlendStartedRef = useRef(false);

  useEffect(() => {
    currentVideoRef.current = currentVideo;
  }, [currentVideo]);

  useEffect(() => {
    const normalVideo = normalVideoRef.current;
    const reversedVideo = reversedVideoRef.current;
    
    if (!normalVideo || !reversedVideo) return;

    // Start with normal video once it's ready
    const handleCanPlay = () => {
      normalVideo.play().catch((err) => {
        console.error("Video play failed:", err);
      });
    };

    if (normalVideo.readyState >= 2) {
      // Video is already loaded
      handleCanPlay();
    } else {
      normalVideo.addEventListener('canplay', handleCanPlay, { once: true });
    }

    const handleNormalTimeUpdate = () => {
      if (!normalVideo.duration) return;
      
      // Start blending 0.1s before the video ends
      const timeUntilEnd = normalVideo.duration - normalVideo.currentTime;
      
      if (timeUntilEnd <= blendDuration && !normalBlendStartedRef.current && currentVideoRef.current === "normal") {
        normalBlendStartedRef.current = true;
        // Start the reversed video and begin crossfade
        reversedVideo.currentTime = 0;
        reversedVideo.play().catch((err) => {
          console.error("Reversed video play failed:", err);
        });
        // Start crossfade
        setCurrentVideo("reversed");
      }
    };

    const handleReversedTimeUpdate = () => {
      if (!reversedVideo.duration) return;
      
      // Start blending 0.1s before the video ends
      const timeUntilEnd = reversedVideo.duration - reversedVideo.currentTime;
      
      if (timeUntilEnd <= blendDuration && !reversedBlendStartedRef.current && currentVideoRef.current === "reversed") {
        reversedBlendStartedRef.current = true;
        // Start the normal video and begin crossfade
        normalVideo.currentTime = 0;
        normalVideo.play().catch((err) => {
          console.error("Normal video play failed:", err);
        });
        // Start crossfade
        setCurrentVideo("normal");
      }
    };

    const handleNormalEnded = () => {
      // Ensure we're on reversed video when normal ends
      if (currentVideoRef.current === "normal") {
        reversedVideo.currentTime = 0;
        reversedVideo.play().catch((err) => {
          console.error("Reversed video play failed:", err);
        });
        setCurrentVideo("reversed");
      }
      normalBlendStartedRef.current = false;
    };

    const handleReversedEnded = () => {
      // Ensure we're on normal video when reversed ends
      if (currentVideoRef.current === "reversed") {
        normalVideo.currentTime = 0;
        normalVideo.play().catch((err) => {
          console.error("Normal video play failed:", err);
        });
        setCurrentVideo("normal");
      }
      reversedBlendStartedRef.current = false;
    };

    normalVideo.addEventListener("timeupdate", handleNormalTimeUpdate);
    reversedVideo.addEventListener("timeupdate", handleReversedTimeUpdate);
    normalVideo.addEventListener("ended", handleNormalEnded);
    reversedVideo.addEventListener("ended", handleReversedEnded);

    return () => {
      normalVideo.removeEventListener("timeupdate", handleNormalTimeUpdate);
      reversedVideo.removeEventListener("timeupdate", handleReversedTimeUpdate);
      normalVideo.removeEventListener("ended", handleNormalEnded);
      reversedVideo.removeEventListener("ended", handleReversedEnded);
      normalVideo.removeEventListener('canplay', handleCanPlay);
    };
  }, [blendDuration]);

  return (
    <div className="fixed inset-0 z-0 bg-[#181619] cloud-drift">
      <video
        ref={normalVideoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/logofiles/HR_Clouds_BG.png"
        className={`absolute inset-0 w-full h-full object-cover ${currentVideo === "normal" ? "opacity-100" : "opacity-0"}`}
        style={{ 
          minWidth: '100%', 
          minHeight: '100%', 
          backgroundColor: '#181619',
          transition: 'opacity 0.6s ease-in-out',
          pointerEvents: 'none'
        }}
      >
        <source src="/clouds.mp4" type="video/mp4" />
      </video>
      <video
        ref={reversedVideoRef}
        muted
        playsInline
        preload="auto"
        poster="/logofiles/HR_Clouds_BG.png"
        className={`absolute inset-0 w-full h-full object-cover ${currentVideo === "reversed" ? "opacity-100" : "opacity-0"}`}
        style={{ 
          minWidth: '100%', 
          minHeight: '100%', 
          backgroundColor: '#181619',
          transition: 'opacity 0.6s ease-in-out',
          pointerEvents: 'none'
        }}
      >
        <source src="/clouds-reversed.mp4" type="video/mp4" />
      </video>
      {/* Subtle dark overlay for legibility */}
      <div className="absolute inset-0 bg-[#181619]/15" />
    </div>
  );
}