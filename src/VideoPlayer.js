import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import styled from "styled-components";
import { Context } from "./App";
const VideoPlayerContainer = styled.div`
  max-height: 98vh;
  width: 80%;
  border: 2px solid;
  padding: 10px;
  margin: 10px;
  overflow: auto;
  box-sizing: border-box;
  
  /* Scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;

  /* For WebKit browsers like Chrome and Safari */
  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Additional styles for paragraphs and h2 elements */
  p, h2 {
    margin-top: 2%;
  }
`;
const VideoPlayer = (props) => {
  const { selectedVideo, playListVideos } = props;
  const [targetVideoIndex, setTargetVideoIndex] = useState(0);
  const commonValue = useContext(Context)
  console.log(commonValue, "#Video")

  useEffect(() => {
    setTargetVideoIndex(
      selectedVideo !== undefined ? playListVideos.findIndex((video) => video.title === selectedVideo.title) : 0
    );
  }, [selectedVideo, playListVideos]);

  const handleVideoEnded = () => {
    setTargetVideoIndex((prevIndex) => (prevIndex + 1) % (playListVideos?.length || 1));
  };

  const targetVideo = playListVideos?.[targetVideoIndex];
  return (
    <VideoPlayerContainer className="videoPlayerContiner">
      {targetVideo && targetVideo.sources && targetVideo.sources[0] ? (
        <ReactPlayer
          url={targetVideo.sources[0]}
          controls
          width="100%"
          height="80%"
          playing={commonValue.autoPlay}
          muted={true}
          onEnded={handleVideoEnded}
        />
      ) : null}
      {targetVideo ? (
        <>
          <h2>{`${targetVideo.title}[${targetVideo.subtitle}]`}</h2>
          <p>
            <i>{targetVideo.description}</i>
          </p>
        </>
      ) : null}
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
