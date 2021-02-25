import React from "react";
import {  useState } from "react";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import useSound from "use-sound";



import Pause from "./Pause";
import Play from "./Play";
import sound3 from "../assets/long.mp3";

const Player = () => {
  let [volume, setVolume] = useState(0.5);
  let [play, { stop, isPlaying }] = useSound(sound3, { volume });
  

  const handleChangePlus = () => {
    setVolume(volume < 1 ? volume + 0.1 : volume);
    
  };
  const handleChangeMinus = () => {
    setVolume(volume > 0 ? volume - 0.1 : volume);
  };

  const handleChangeMute = () => {
    setVolume(volume = 0);
  };
 
  return (
    <div className="player">
      {isPlaying ? <Pause stop={stop} /> : <Play play={play} />}
      <VolumeUpIcon color='primary' className="button" onClick={handleChangePlus}></VolumeUpIcon>
      <VolumeDownIcon color='primary' className="button" onClick={handleChangeMinus}></VolumeDownIcon>
      <VolumeMuteIcon color='primary' className="button" onClick={handleChangeMute}></VolumeMuteIcon>

    </div>
  );
};

export default Player;