import './App.css';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Data } from './data/Data';
import PlayList from './components/PlayList';
import styled from 'styled-components';
import VideoPlayer from './components/VideoPlayer';
const StyledDiv = styled.div`
display: flex;
`;
export const Context = createContext()
function App() {
  const [playListVideos, setPlayListVideos] = useState()
  const [selectedVideo, setSelectedVideo] = useState()
  const getTheData = useCallback(async () => {
    const result = Data();
    const video = result?.categories[0]?.videos.sort();
    setPlayListVideos(video)
  }, [])
  useEffect(() => {
    getTheData()
    // eslint-disable-next-line
  }, [])
  const [commenData, setCommonData] = useState({
    autoPlay: false
  })
  return (
    <StyledDiv className='continer'>
      <Context.Provider value={commenData}>
        <VideoPlayer selectedVideo={selectedVideo}
          playListVideos={playListVideos}>

        </VideoPlayer>
        <PlayList 
          playListVideos={playListVideos}
          setSelectedVideo={setSelectedVideo}
          selectedVideo={selectedVideo}
          setCommonData={setCommonData}
        >

        </PlayList>
      </Context.Provider>
    </StyledDiv>
  );
}

export default App;
