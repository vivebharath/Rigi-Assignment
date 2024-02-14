// import './App.css';
import VideoPlayer from './VideoPlayer';
import { useCallback, useEffect, useState } from 'react';
import { Data } from './Data';
import PlayList from './PlayList';
import styled from 'styled-components';
const StyledDiv = styled.div`
display: flex;
`;
function App() {
  const [playListVideos, setPlayListVideos] = useState()
  const [slectedVideo, setSelectedVideo] = useState()
  const [playedChildIndex, setPlayedChildIndex] = useState(0)
  const getTheData = useCallback(async () => {
    const result = Data();
    const video = result?.categories[0]?.videos.sort();
    setPlayListVideos(video)
  }, [])
  useEffect(() => {
    getTheData()
  }, [])
  return (
    <StyledDiv className='continer'>
      <VideoPlayer slectedVideo={slectedVideo} playListVideos={playListVideos}></VideoPlayer>
      <PlayList playListVideos={playListVideos} setSelectedVideo={setSelectedVideo} playedChildIndex={playedChildIndex} setPlayedChildIndex={setPlayedChildIndex} slectedVideo={slectedVideo}></PlayList>
    </StyledDiv>
  );
}

export default App;
