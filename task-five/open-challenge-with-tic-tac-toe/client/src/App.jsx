import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Board from "./components/board";
import Winners from "./components/winners";

const initArray = Array(5).fill(Array(5).fill(""));

const App = () => {
  const [board, setBoard] = useState(initArray);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(false);
  const [allWinners, setAllWinners] = useState([]);

  const clickHandler = (row, col) => {
    if (!board[row][col] && !winner) {
      const newBoard = board.map((row) => [...row]);
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      nextPlayerHandler(currentPlayer);
      winnerHandler(newBoard, row, col);
    }
  };

  const nextPlayerHandler = (currentPlayer) => {
    const players = ["X", "Y", "Z"];
    const currentIndex = players.indexOf(currentPlayer);
    const result = players[(currentIndex + 1) % players.length];
    setCurrentPlayer(result);
  };

  const winnerHandler = (board, row, col) => {
    const player = board[row][col];
    if (
      checkLine(board[row], player) ||
      checkLine(
        board.map((row) => row[col]),
        player
      ) ||
      (row === col &&
        checkLine(
          board.map((row, index) => row[index]),
          player
        )) ||
      (row + col === board.length - 1 &&
        checkLine(
          board.map((row, index) => row[board.length - 1 - index]),
          player
        ))
    ) {
      setWinner(player);
      axios
        .post("/api/addwinner", { winnerName: player })
        .then((response) => {
          const temp = [...allWinners, response.data];
          setAllWinners(temp);
        })
        .catch((err) => console.log(err));
    }
  };

  const checkLine = (line, player) => {
    return line.every((cell) => cell === player);
  };

  const resetHandler = () => {
    setBoard(initArray);
    setCurrentPlayer("X");
    setWinner(false);
  };

  useEffect(() => {
    axios
      .get("/api/getwinners")
      .then((response) => {
        setAllWinners(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-10/12 sm:w-72 mx-auto mt-10 text-center">
      <Board board={board} clickHandler={clickHandler} />
      <button
        className="bg-blue-600 w-full rounded text-white text-xl mt-1"
        onClick={resetHandler}
      >
        Reset
      </button>
      {winner && <div className="text-xl mt-10">Winner: {winner}</div>}
      <Winners allWinners={allWinners} />
    </div>
  );
};

export default App;
