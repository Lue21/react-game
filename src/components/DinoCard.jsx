import React from 'react';

export default function DinoCard({ index, dino, isFlipped, flipCard }) {
    return (
        <button className={`dino-card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => flipCard(index)}>
        <div className="inside-card">
          <div className="front">
            <img
              src={`https://kate-natours.netlify.app/dino${dino.id}.png`}
              alt="dino"
              width="100"
            />
          </div>
          <div className="back">D</div>
        </div>
      </button>
    );
}
  
