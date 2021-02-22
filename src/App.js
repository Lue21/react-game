import "./App.css";
import dino from "./dino";
import DinoCard from './components/DinoCard';
import { useEffect, useState } from "react";

const doubleDino = [...dino, ...dino];

function App() {

  const [opened, setOpened] = useState([]);

  useEffect(() => {
    if (opened.length === 2) 
      setTimeout(() => setOpened([]), 800)
  }, [opened])

  function flipCard(index) {
    setOpened((opened) => [...opened, index]);
  }


  return (
    <div className="App">
      <h1>Catch Them All</h1>
      <div className="cards-container">
        {doubleDino.map((dino, index) => {
          
          let isFlipped = false;
          
          if (opened.includes(index))
            isFlipped = true;

          return (
            <DinoCard
              key={index}
              index={index}
              dino={dino}
              isFlipped={isFlipped}
              flipCard={flipCard}/>
            );
        })}
      </div>
    </div>
  );
}



export default App;
