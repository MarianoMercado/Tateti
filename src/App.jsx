import { useState } from "react";
import Footer from "./components/Footer/Footer";
import { Square } from "./components/Square/Square";
import { TURNS } from "./components/Constants/Constants";
import { checkWinnerFrom } from "./components/Logic/Logic";
import confetti from "canvas-confetti";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const updateBoard = (index) => {
    //no se puede pisar un valor
    if (board[index] !== null) return;

    //actualiza el tablero
    const newBord = [...board];
    newBord[index] = turn;
    setBoard(newBord);

    //cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBord);
    if (newWinner) {
      alert(`Ganó ${newWinner}`);
      setBoard(Array(9).fill(null));
      setTurn(TURNS.X);
      confetti();
    }
  };

  return (
    <>
      <main className="board">
        <h1>TA - TE - TÍ</h1>
        <section className="game">
          {board.map((value, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {value}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
