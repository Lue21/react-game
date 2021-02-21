import "./App.css";
import dino from "./dino";

const doubleDino = [...dino, ...dino];

function App() {
  return (
    <div className="App">
      <h1>Catch Them All</h1>
      <div className="cards-container">
        {doubleDino.map((dino, index) => (
          <DinoCard key={index} dino={dino} />
        ))}
      </div>
    </div>
  );
}

function DinoCard({ dino }) {
  return (
    <div className="dino-card flipped">
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
    </div>
  );
}

export default App;
