import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import styled from "styled-components";
import NowPlayingComponent from "./NowPlaying";

const StyledPlayListContiner = styled.div`
  height: 90%;
  width: 20%;
  margin: 10px;
  padding: 10px;
  border: 2px solid;
  background: linear-gradient(120deg, #007bff7a, #d0314c99);
`;

const StyledListItems = styled.div`
  height: 87vh;
  overflow: scroll;
  margin: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
`;

const StyledPlayListCard = styled.div`
  border: 2px solid;
  padding: 10px;
  margin: 15px;
  background: #ffffffe0;
  height: 100px;
  transition: transform 0.2s ease-in-out;
  display: flex;
  cursor: pointer;
  background-color: #f5dcdc99;
`;
const StyledImg = styled.img`
height:100%`;
const DetailsDiv = styled.div`
margin-left:2%
`

const PlayList = (props) => {
    const { playListVideos, setSelectedVideo, playedChildIndex, slectedVideo } = props;
    const [changedPlayaList, setChangedPlayList] = useState()
    const [dragId, setDragId] = useState();
    const[playList,setPlayList]=useState()
    const[searchList,setSearchList]=useState()
    const onSelectVideo = useCallback((title, index) => {
        const video = playListVideos.find((data) => data.title === title);
        setSelectedVideo(video);
        // setPlayedChildIndex(index)
    }, [playListVideos, setSelectedVideo]);
    const handleDrag = (event) => {
        setDragId(event.currentTarget.id);

    };
    const reorderPlayList = (array, fromIndex, toIndex) => {
        if (fromIndex >= 0 && fromIndex < array.length && toIndex >= 0 && toIndex <= array.length) {
            const newArray = array.slice();
            const removedElement = newArray.splice(fromIndex, 1)[0];
            newArray.splice(toIndex, 0, removedElement);
            return newArray;
        } else {
            console.log("Invalid indices");
            return array.slice();
        }
    }
    const handleDrop = (event) => {
        const dragItem = playList.findIndex((data) => data.title === dragId)
        const dropItem = playList.findIndex((data) => data.title === event.currentTarget.id)
        const changedArray = reorderPlayList(playList, dragItem, dropItem)
        setChangedPlayList(changedArray)
    }
    const findSearchVideo=(query)=>{
       const searchedVideos= playList.filter((videos)=>videos.title.includes(query))
       setSearchList(searchedVideos);
    }
    const onSearch = (event) => {
        findSearchVideo(event)
    }
    const clearSearch=()=>{
        setSearchList([])
    }
    useEffect(()=>{
        if(searchList?.length>0){
            setPlayList(searchList)
        }
        else if(changedPlayaList!==undefined){
            setPlayList(changedPlayaList)
        }
        else if(playListVideos?.length>0){
            setPlayList(playListVideos)
        }
    },[searchList,changedPlayaList,playListVideos])
    console.log(slectedVideo,"###")
    return (
        <StyledPlayListContiner className="playerListContiner">
            <SearchBar  onRequestSearch={onSearch} onCancelSearch={clearSearch}/>
            <StyledListItems className="listItems">
                {playList?.map((videoData, index) => (
                    <StyledPlayListCard
                        className="playListCard"
                        key={index}
                        id={videoData.title}
                        onClick={() => onSelectVideo(videoData.title)}
                        draggable={true}
                        onDragOver={(ev) => ev.preventDefault()}
                        onDragStart={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div>
                            <StyledImg src={videoData?.thumb} alt={videoData.title} />
                        </div>
                        <DetailsDiv>
                            <h4 style={{ margin: "0px" }}>{videoData.title} </h4>
                            <h5 style={{ margin: "1px" }}><i>{`[${videoData.subtitle}]`}</i></h5>
                            {videoData?.title === slectedVideo?.title ? <NowPlayingComponent /> : <></>}
                        </DetailsDiv>
                    </StyledPlayListCard>
                ))}
            </StyledListItems>
        </StyledPlayListContiner>
    );
};

export default PlayList;