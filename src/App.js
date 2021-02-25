import "./App.css";
import DinoCard from "./components/DinoCard";
import { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import shuffle from "lodash.shuffle";
import Footer from "./components/footer";
import Button from "@material-ui/core/Button";
import Player from "./components/Player";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import { dinoBig } from "./dino";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

let doubleDino = shuffle([...dinoBig, ...dinoBig]);

function App() {
  // FAST MODE///////////////////////////
  const [checked, setChecked] = useState(localStorage.getItem("FastMode") === "false" || localStorage.getItem("FastMode") === null ? false : true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    localStorage.setItem("FastMode", event.target.checked);
  };

  ///CARD BACK/////////////////////////////
  const [checked2, setChecked2] = useState(
    localStorage.getItem("CardBack") === "false" || localStorage.getItem("CardBack") === null ? false : true);

  const handleCheck2 = (event) => {
    setChecked2(event.target.checked);

    localStorage.setItem("CardBack", event.target.checked)
  };

  // NIGHT THEME ////////////////////////
  const [theme, setTheme] = useState(
    localStorage.getItem("SwitchN") === "false" || localStorage.getItem("SwitchN") === null ? "light" : "dark"
  );
  const [state, setState] = useState({
    checkedB: localStorage.getItem("SwitchN") === "false" || localStorage.getItem("SwitchN") === null ? false : true,
  });
  const themeToggler = (event) => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    setState({ ...state, [event.target.name]: event.target.checked });
    localStorage.setItem("SwitchN", event.target.checked);
  };

  // FULLSCREEN////////////////////////
  const handle = useFullScreenHandle();

  // CARDS////////////////////////////
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState(
    localStorage.getItem("MatchedCards") || []
  );

  let savedMoves = localStorage.getItem("Moves") || 0;

  const [moves, setMoves] = useState(+savedMoves || 0);

  useEffect(() => {
    if (opened.length < 2) return;

    const firstCard = doubleDino[opened[0]];
    const secondCard = doubleDino[opened[1]];

    if (firstCard.id === secondCard.id) {
      setMatched((matched) => [...matched, firstCard.id]);
    }

    if (opened.length === 2 && checked === true)
      setTimeout(() => setOpened([]), 400);
    setTimeout(() => setOpened([]), 800);
  }, [opened, checked]);

  useEffect(() => {
    if (matched.length === dinoBig.length)
      setTimeout(() => alert("You won!"), 700);
    localStorage.setItem("MatchedCards", matched);
  }, [matched]);

  function flipCard(index) {
    setMoves((moves) => moves + 1);
    setOpened((opened) => [...opened, index]);
    localStorage.setItem("Moves", moves + 1);
  }
  function reset() {
    // setState((state) => false);
    // setTheme((theme) => "light");
    setMoves((moves) => (moves = 0));
    setOpened((opened) => []);
    setMatched((matched) => []);
    localStorage.clear();
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />

        <div className="App">
          <FullScreen handle={handle}>
            <h1>Find Them All</h1>
            <p>{moves} moves</p>

            <div className="nav">
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="start"
                    control={
                      <Switch
                        checked={state.checkedB}
                        onChange={themeToggler}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Night mode"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                      checked={localStorage.getItem("FastMode") === 'false' || localStorage.getItem("FastMode") === null  ? false : true}

                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        onChange={handleCheck}
                      />
                    }
                    label="Fast mode"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                      checked={localStorage.getItem("CardBack") === 'false' || localStorage.getItem("CardBack") === null ? false : true}

                        color="primary"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        onChange={handleCheck2}
                      />
                    }
                    label="Card back"
                    labelPlacement="start"
                  />
                  <Player />
                </FormGroup>
              </FormControl>
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
                    isChecked={checked2}
                  />
                );
              })}
            </div>
            <Button
                    variant="contained"
                    color="primary"
                    onClick={handle.enter}
                  ><FullscreenIcon /></Button>
                  <Button variant="contained" color="primary" onClick={reset}>
                    New Game
                  </Button>
            <Footer />
          </FullScreen>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
