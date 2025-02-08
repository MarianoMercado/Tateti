import { useState } from "react";
import Footer from "./components/Footer/Footer";
import { Square } from "./components/Square/Square";
import { TURNS } from "./components/Constants/Constants";
import { checkWinnerFrom } from "./components/Logic/Logic";
import confetti from "canvas-confetti";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  // null significa que no hay ganador
  const [winneer, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((value) => value !== null);
  };

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
      setWinner(newWinner);

      confetti();
    } else if (checkEndGame(newBord)) {
      setWinner(false);
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

        {winneer !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winneer === false ? "Empate" : `Ganó`}</h2>
              <header className="win">
                {winneer && <Square> {winneer}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
        <button onClick={resetGame}>Empezar de nuevo</button>
      </main>
      <Footer />
    </>
  );
}

export default App;
