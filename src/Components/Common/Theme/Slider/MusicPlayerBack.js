import React, { useState, useEffect } from "react";

import { nextIcon, playIcon, prevIcon } from "../../../../utils/icons";

const MusicPlayerBack = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  activeIndex,
  setActiveIndex,
  swiperRef,
  attributes,
}) => {
  const { audioProperties, style = {}, options = {}, elements = {} } = attributes;
  const { color = '#0003', progressColor = '#000' } = style?.range?.input || {};
  
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef, options, audioProperties[activeIndex]?.audio.url]);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Failed to play the audio automatically: ", error);
        setIsPlaying(false);
      });
    }
  }, [activeIndex, isPlaying, options, elements]);

  const changeMusic = (direction) => {
    const audio = audioRef.current;
    let newIndex = activeIndex;

    if (direction === "forward") {
      newIndex = (activeIndex + 1) % audioProperties.length;
    } else if (direction === "backward") {
      newIndex =
        (activeIndex - 1 + audioProperties.length) % audioProperties.length;
    }

    setActiveIndex(newIndex);

    setProgress(0);
    setCurrentTime(0);

    const nextAudioUrl = audioProperties[newIndex]?.audio?.url;

    if (nextAudioUrl) {
      audio.src = nextAudioUrl;
      if (isPlaying) {
        audio.play();
      }
    
    } else {
      audio.pause();
      setIsPlaying(false);
    }

    if (swiperRef.current) {
      swiperRef.current.slideTo(newIndex);
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    const currentTime = audio.currentTime;
    setCurrentTime(currentTime);

    const progress = (currentTime / audio.duration) * 100;

    setProgress(progress);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playPauseMusic = () => {
    const audio = audioRef.current;
    if (audioProperties[activeIndex]?.audio.url) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  };


  return (
    <div className="music-player">
      <h1 className="title" placeholder="Add Music Title...">
        {audioProperties[activeIndex]?.title}
      </h1>
      <p className="name artist" placeholder="Add Music Name...">
        {audioProperties[activeIndex]?.artist}
      </p>

      <audio
        ref={audioRef}
        onTimeUpdate={updateProgress}
        key={audioProperties[activeIndex]?.audio?.url}
        onEnded={() => {
          const audio = audioRef.current;
      
          if (options?.isLoop) {
            audio.currentTime = 0;
            audio.play();
            setCurrentTime(0);
            setIsPlaying(true);
          } else if (options?.isAutoPlay) {
            changeMusic("forward");
          } else {
            audio.currentTime = 0;
            setCurrentTime(0);
            setIsPlaying(false);
          }
        }}
      >
        <source
          src={audioProperties[activeIndex]?.audio.url}
          type="audio/mpeg"
        />
      </audio>
      <div className="progress-container">
        {elements?.currentTime && <p className="time currentTime">{formatTime(currentTime)}</p>}
        <input
          type="range"
          className='progress'
          value={progress ? progress : 0}
          id="progresses"
          onChange={handleSeek}
          min="0"
          max="100"
          step="0.1"
          style={{
            background: `linear-gradient(to right, ${progressColor} ${progress}%, ${color} ${progress}%)`,
          }}
        />

        {elements?.totalTime && <p className="time totalTime">
          {audioProperties[activeIndex]?.audio?.url
            ? formatTime(duration)
            : "00:00"}
        </p>}

      </div>

      <div className="controls">
        {elements?.navigation && <button
          className="control navigation"
          onClick={() => {
            changeMusic("backward");
          }}
        >
          {prevIcon}
        </button>}

        <button className={`playPause ${isPlaying ? 'playing' : 'paused'}`} onClick={playPauseMusic}>{playIcon}</button>

        {elements?.navigation && <button
          className="control navigation"
          onClick={() => {
            changeMusic("forward");
          }}
        >
          {nextIcon}
        </button>}
      </div>
    </div>
  );
};

export default MusicPlayerBack;
