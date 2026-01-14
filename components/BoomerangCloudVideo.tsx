"use client";

import { useEffect, useRef } from "react";

export default function BoomerangCloudVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isReversingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try using negative playbackRate for smooth reverse (modern browsers)
    // Fallback to manual control if not supported
    let supportsNegativePlaybackRate = true;
    
    const checkSupport = () => {
      try {
        const testRate = video.playbackRate;
        video.playbackRate = -1;
        supportsNegativePlaybackRate = video.playbackRate === -1;
        video.playbackRate = testRate;
      } catch {
        supportsNegativePlaybackRate = false;
      }
    };

    const handleTimeUpdate = () => {
      if (!isReversingRef.current) return;

      // When reversing with negative playbackRate, check if we've reached the start
      if (supportsNegativePlaybackRate && video.currentTime <= 0.1) {
        isReversingRef.current = false;
        video.playbackRate = 1;
        video.currentTime = 0;
        video.play().catch((err) => {
          console.error("Video play failed:", err);
        });
      }
    };

    const startReverse = () => {
      if (supportsNegativePlaybackRate) {
        // Use native negative playbackRate for smooth reverse
        isReversingRef.current = true;
        video.playbackRate = -1;
        video.play().catch((err) => {
          console.error("Video play failed:", err);
        });
      } else {
        // Fallback: smoother manual reverse with better timing
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        isReversingRef.current = true;

        let lastFrameTime = performance.now();
        const reverse = (currentTime: number) => {
          if (!video || !isFinite(video.duration)) {
            animationFrameRef.current = requestAnimationFrame(reverse);
            return;
          }

          const deltaTime = (currentTime - lastFrameTime) / 1000; // Convert to seconds
          lastFrameTime = currentTime;

          // Smooth reverse: match forward playback speed (1x)
          const step = deltaTime; // Same speed as forward playback
          const newTime = Math.max(0, video.currentTime - step);
          video.currentTime = newTime;

          if (newTime <= 0.01) {
            // Reached the start, start playing forward again
            isReversingRef.current = false;
            video.currentTime = 0;
            video.play().catch((err) => {
              console.error("Video play failed:", err);
            });
          } else {
            animationFrameRef.current = requestAnimationFrame(reverse);
          }
        };

        reverse(performance.now());
      }
    };

    const handleEnded = () => {
      // Video ended while playing forward, start reversing
      if (!supportsNegativePlaybackRate) {
        video.pause();
      }
      startReverse();
    };

    // Check if browser supports negative playbackRate
    checkSupport();

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    
    // Start playing forward
    video.playbackRate = 1;
    video.play().catch((err) => {
      console.error("Video play failed:", err);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#181619]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ minWidth: '100%', minHeight: '100%', backgroundColor: '#181619' }}
      >
        <source src="/clouds.mp4" type="video/mp4" />
      </video>
      {/* Subtle dark overlay for legibility */}
      <div className="absolute inset-0 bg-[#181619]/15" />
    </div>
  );
}