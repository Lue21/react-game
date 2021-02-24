import React from "react";
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';


const Pause = ({ stop }) => {
  return (
      <PauseCircleOutlineIcon color='secondary' className="button" onClick={() => stop()}/> 
  );
};

export default Pause;
