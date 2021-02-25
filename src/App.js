import "./App.css";
import {dino} from "./dino";
import DinoCard from "./components/DinoCard";
import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import shuffle from "lodash.shuffle";
import Footer from "./components/footer";
import Button from "@material-ui/core/Button";
import Player from "./components/Player";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import {dinoBig} from "./dino";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";

let doubleDino = shuffle([...dinoBig, ...dinoBig]);

function App() {


  // HARD MODE///////////////////////////
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    if (checked) doubleDino = shuffle([...dinoBig, ...dinoBig]);
      
    else  doubleDino = shuffle([...dino, ...dino]);


  };



  // NIGHT THEME /////////////
  const [theme, setTheme] = useState(
    localStorage.getItem("SwitchT") || "light"
  );
  const [state, setState] = useState({
    checkedB: localStorage.getItem("SwitchN") || false,
  });
  const themeToggler = (event) => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    setState({ ...state, [event.target.name]: event.target.checked });
    localStorage.setItem("SwitchN", true);
    localStorage.setItem("SwitchT", "dark");
  };

  // FULLSCREEN////////////////////
  const handle = useFullScreenHandle();

  // CARDS////////////////////
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState(
    localStorage.getItem("MatchedCards") || []
  );
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard = doubleDino[opened[0]];
    const secondCard = doubleDino[opened[1]];

    if (firstCard.id === secondCard.id) {
      setMatched((matched) => [...matched, firstCard.id]);
    }

    if (opened.length === 2) setTimeout(() => setOpened([]), 700);
  }, [opened]);


  useEffect(() => {
    if (matched.length === dinoBig.length)
      setTimeout(() => alert("You won!"), 700);
    localStorage.setItem("MatchedCards", matched);
  }, [matched]);

  function flipCard(index) {
    setMoves((moves) => moves + 1);
    setOpened((opened) => [...opened, index]);
  }
  function reset() {
    setState((state) => false);
    setTheme((theme) => "light");
    setMoves((moves) => (moves = 0));
    setOpened((opened) => []);
    setMatched((matched) => []);
    localStorage.clear();
  }

  // function hardMode() {
  //   doubleDino = shuffle([...dinoBig, ...dinoBig]);
  // }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />

        <div className="App">
          <h1>Catch Them All</h1>

          <FullScreen handle={handle}>
            <div className="nav">
              <p>{moves} moves</p>
              <div className="buttons">
                <Switch
                  checked={state.checkedB}
                  onChange={themeToggler}
                  name="checkedB"
                  color="primary"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handle.enter}
                >
                  <FullscreenIcon />
                </Button>
                <Button variant="contained" color="primary" onClick={reset}>
                  Reset
                </Button>
                <Checkbox
        
        color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onChange={handleCheck}
      />
              </div>
              <Player />
            </div>

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
            <Footer />
          </FullScreen>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
