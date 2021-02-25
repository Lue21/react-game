import React from 'react';
import useSound from 'use-sound';
import tic from './tic.mp3';




export default function DinoCard({ index, dino, isFlipped, flipCard, isChecked }) {
  const [play] = useSound(tic);

  return (
    <button className={`dino-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => {
        flipCard(index);
        play();
      }}>
        <div className="inside-card">
          <div className="front">
            <img
              src={`https://kate-natours.netlify.app/dino${dino.id}.png`}
              alt="dino"
              width="80"
            />
          </div>
          <div className="back"><img
              src={`${isChecked ? "https://kate-natours.netlify.app/footprint.png" : "https://kate-natours.netlify.app/tyrannosaurus-rex.png"}`}
              alt="dino"
              width="20"
            /></div>
        </div>
      </button>
    );
}
  
