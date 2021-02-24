import "./App.css";
import dino from "./dino";
import DinoCard from "./components/DinoCard";
import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import shuffle from "lodash.shuffle";
import Footer from "./components/footer";
import Button from "@material-ui/core/Button";
import Player from "./components/Player";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import dinoBig from "./dino";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";

import Switch from "@material-ui/core/Switch";

let doubleDino = shuffle([...dino, ...dino]);
let doubleDinoBig = shuffle([...dinoBig, ...dinoBig]);

function App() {
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState(
    localStorage.getItem("MatchedCards") || []
  );
  const [moves, setMoves] = useState(0);
  const handle = useFullScreenHandle();

  const [theme, setTheme] = useState(localStorage.getItem("SwitchT") || "light");
  const [state, setState] = useState({
    checkedB: localStorage.getItem("SwitchN") || false,
  });
  const themeToggler = (event) => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    setState({ ...state, [event.target.name]: event.target.checked });
    localStorage.setItem("SwitchN", true)
    localStorage.setItem("SwitchT", 'dark')



  };


  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard = doubleDino[opened[0]];
    const secondCard = doubleDino[opened[1]];

    if (firstCard.id === secondCard.id) {
      setMatched((matched) => [...matched, firstCard.id]);
    }
  }, [opened]);

  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 700);
  }, [opened]);

  useEffect(() => {
    if (matched.length === dino.length)
      setTimeout(() => alert("You won!"), 700);
    localStorage.setItem("MatchedCards", matched);
  }, [matched]);

  function flipCard(index) {
    setMoves((moves) => moves + 1);
    setOpened((opened) => [...opened, index]);
  }
  function reset() {
    setState((state) => false);
    setTheme((theme) => 'light');
    setMoves((moves) => (moves = 0));
    setOpened((opened) => []);
    setMatched((matched) => []);
    doubleDino = shuffle([...dino, ...dino]);
    localStorage.clear();
  }
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
