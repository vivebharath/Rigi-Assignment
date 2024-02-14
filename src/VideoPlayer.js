import React, { useEffect, useState } from "react";
// import './VideoPlayer.css';
import ReactPlayer from 'react-player';
import styled from "styled-components";
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
    const { slectedVideo, playListVideos } = props
    const [tragetVideo, setTargetVideo] = useState()
    useEffect(() => {
        playListVideos && setTargetVideo(slectedVideo !== undefined ? slectedVideo : playListVideos[0])
    }, [slectedVideo, playListVideos])
    return (
        <VideoPlayerContainer className="videoPlayerContiner">
            <ReactPlayer
                url={tragetVideo?.sources[0]}
                controls
                width="100%"
                height="80%"
                playing={true}
                muted={true} 
            ></ReactPlayer>
            <h2 >{`${tragetVideo?.title}[${tragetVideo?.subtitle}]`}</h2>
            <p><i>{tragetVideo?.description}</i></p>
        </VideoPlayerContainer>
    )
}
export default VideoPlayer