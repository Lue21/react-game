import "./App.css";
import dino from "./dino";
import DinoCard from "./components/DinoCard";
import { useEffect, useState } from "react";

const doubleDino = [...dino, ...dino];

function App() {
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard = doubleDino[opened[0]];
    const secondCard = doubleDino[opened[1]];

    if (firstCard.id === secondCard.id) {
      setMatched((matched) => [...matched, firstCard.id]);
    }
  }, [opened]);

  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  useEffect(() => {
    if (matched.length === dino.length) 
      alert('You won!')
  }, [matched])

  function flipCard(index) {
    setMoves((moves) => moves + 1)
    setOpened((opened) => [...opened, index]);
  }

  return (
    <div className="App">
      <p>{moves} moves</p>
      <h1>Catch Them All</h1>
      <div className="cards-container">
        {doubleDino.map((dino, index) => {
          let isFlipped = false;

          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(dino.id)) isFlipped = true;

          return (
            <DinoCard
              key={index}
              index={index}
              dino={dino}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
