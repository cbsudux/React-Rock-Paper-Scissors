import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";

function Choice({ choice, handleClick }) {
  return (
    <div className="choice" onClick={() => handleClick(choice.id)}>
      <p>{choice.name}</p>
    </div>
  );
}

function gameLogic(userChoice, computerChoice) {
  let result = null;
  if (userChoice === computerChoice) {
    result = "draw";
  } else if (userChoice === "Rock") {
    if (computerChoice === "Paper") {
      result = "lose";
    } else if (computerChoice === "Scissors") {
      result = "win";
    }
  } else if (userChoice === "Paper") {
    if (computerChoice === "Scissors") {
      result = "lose";
    } else if (computerChoice === "Rock") {
      result = "win";
    }
  } else if (userChoice === "Scissors") {
    if (computerChoice === "Rock") {
      result = "lose";
    } else if (computerChoice === "Paper") {
      result = "win";
    }
  }

  return result;
}

function App() {
  const choices = [
    { id: 0, name: "Rock" },
    { id: 1, name: "Paper" },
    { id: 2, name: "Scissors" },
  ];

  let [result, setResult] = useState("");
  let [userWinCount, setUserWinCount] = useState(0);
  let [computerWinCount, setComputerWinCount] = useState(0);

  let [userChoice, setUserChoice] = useState("");
  let [computerChoice, setComputerChoice] = useState("?");


  function restartGame() {
    setUserWinCount(0)
    setComputerWinCount(0)
    setResult('')
    setComputerChoice('?')
  }

  function handleClick(id) {
    const userChoice = choices[id].name;
    const computerChoice = choices[Math.floor(Math.random() * 3)].name;

    setUserChoice(userChoice);
    setComputerChoice(computerChoice);

    let tempResult = gameLogic(userChoice, computerChoice);
    console.log(tempResult);
    setResult(tempResult);

    // userWinCount and computerWinCount don't update immediately (but on next refresh)
    if (result === "win") {
      setUserWinCount((userWinCount) => userWinCount + 1);
    } else if (result === "lose") {
      setComputerWinCount((computerWinCount) => computerWinCount + 1);
    }

    // userWinCount and computerWinCount  updates immediately here 
    // if (tempResult === "win") {
    //   setUserWinCount((userWinCount) => userWinCount + 1);
    // } else if (tempResult === "lose") {
    //   setComputerWinCount((computerWinCount) => computerWinCount + 1);
    // }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Rock.Paper.Scissors</h1>
        <p>{userWinCount} Wins</p>
        <p>{computerWinCount} Wins</p>
      </div>

      <div className="gameArea">
        <div className="choices">
          <p> Choose your option </p>
          <Choice choice={choices[0]} handleClick={handleClick} />
          <Choice choice={choices[1]} handleClick={handleClick} />
          <Choice choice={choices[2]} handleClick={handleClick} />
        </div>
        <div className="computerChoiceBox">
          <p>Computer Choice</p>
          <div className="computerChoice">
            <p>{computerChoice}</p>
          </div>
        </div>
      </div>
      <p>{result}</p>
      <button onClick = {() => restartGame()}><p>Restart Game</p></button>
    </div>
  );
}

export default App;
