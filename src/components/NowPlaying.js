import React  from "react";
import styled, { keyframes } from "styled-components";


const pulseAnimation = keyframes`
  0% {
    height: 1px;
    margin-top: 0;
  }
  10% {
    height: 40px;
    margin-top: -40px;
  }
  50% {
    height: 20px;
    margin-top: -20px;
  }
  60% {
    height: 30px;
    margin-top: -30px;
  }
  80% {
    height: 60px;
    margin-top: -60px;
  }
  100% {
    height: 1px;
    margin-top: 0;
  }
`;

const NowPlaying = styled.div`
position: relative;
    right: -9%;
    width: auto;
    transform: translateX(-50%) translateY(-50%);
    top: 111%;
`;

const Bar = styled.span`
  display: inline-block;
  position: relative;
  margin-right: 1px;
  width: 10px;
  height: 1px;
  overflow: hidden;
  background: linear-gradient(to bottom, #ff6500, rgb(0 0 0 / 56%));
  color: transparent;
  animation: ${pulseAnimation} 1s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const NowPlayingComponent = () => {

    return (
        <>
            <NowPlaying className="playig">
                {[0.5, 0.2, 1.2, 0.9, 2.3, 1.3].map((delay, index) => (
                    <Bar key={index} delay={delay}  />
                ))}
            </NowPlaying>
        </>
    );
};

export default NowPlayingComponent;
