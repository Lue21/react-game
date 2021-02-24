import React from "react";
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
const Play = ({ play }) => {
  return (

      <PlayCircleFilledWhiteIcon  color='secondary' className="button"  onClick={play}/>
  );
};

export default Play;
