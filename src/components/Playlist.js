import { useState } from "react"
import Track from "./Track"
import AddTrack from "./AddTrack"

export default function Playlist(props){
    const [status, setStatus] = useState("Paused...")
    const [currentSongIndex, setCurrentSongIndex] = useState(null)

    const handleOnPlayPauseClick = () => {
        if (status === "Paused..."){
            setStatus("Playing...")
        } else if(status === "Playing..."){
            setStatus("Paused...")
        }
    }

    const handleOnNextSongClick = () => {
        if (!currentSongIndex && currentSongIndex != 0){
            setCurrentSongIndex(0)
            setStatus("Playing...")
        } else {
            let nextSongIndex =  currentSongIndex + 1
            if (nextSongIndex >= props.playlist.songs.length){
                nextSongIndex = 0
            }
            setCurrentSongIndex(nextSongIndex)
        }

        setStatus("Playing...")
    }

    const handleOnPreviousSongClick = () => {
        if (!currentSongIndex && currentSongIndex != 0){
            setCurrentSongIndex(0)
            setStatus("Playing...")
        } else {
            let nextSongIndex =  currentSongIndex - 1
            if (nextSongIndex < 0){
                nextSongIndex = props.playlist.songs.length - 1
            }
            setCurrentSongIndex(nextSongIndex)
        }

        setStatus("Playing...")
    }

    const handleOnTrackClick = (index) => {
        setCurrentSongIndex(index)
        setStatus("Playing...")
    }

    const activeTrack = Boolean(currentSongIndex) || currentSongIndex === 0 ? props.playlist.songs[currentSongIndex] : null
    
    return (
        <div className="playlist">
            <div className="info">
            <span className="status">{status}</span>
            <p className="title">{props.playlist.name}</p>
            </div>

            <div className="controls">
                <div className="audio">
                    <audio preload="false" controls></audio>
                </div>
                
                <div className="buttons">
                    <button className="btn" onClick= {handleOnPreviousSongClick}>&larr;</button>
                    <div className="button-play-pause">
                        <span className={status === "Paused..." ? "paused" : "playing"} onClick={handleOnPlayPauseClick}></span>
                    </div>
                    <button className="btn" onClick= {handleOnNextSongClick}>&rarr;</button>
                </div>

                <div className="current-song">
                    <span>
                        {activeTrack ? (
                          <>
                            {currentSongIndex + 1}. {activeTrack.songName}
                         </>
                        ) : null}
                    </span>
                </div>
            </div>

            <ul className="tracks">
                {props.playlist.songs.map((song, index) =>(
                    <Track song={song} key = {song.songName} position = {index +1} onTrackClick = {handleOnTrackClick}/>
                ))}
            </ul>  

            <AddTrack addSong = {props.addSong}/>
        </div>

    )
}

