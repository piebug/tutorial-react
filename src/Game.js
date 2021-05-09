import React from 'react';
import Board from "./Board.js"
import MoveList from "./MoveList.js"
import './styles/Game.scss';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        move: lines[i],
      };
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;
    } else if (this.state.stepNumber < 9) {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else {
      status = "Draw"
    }

    return (
      <div className="game">
        <h1>Tic-Tac-Toe</h1>
        <div className="row">
          <div className="game-board col-12 col-md-auto">
            <h2>{status}</h2>
            <Board
              squares={current.squares}
              winningSquares={winner ? winner.move : null}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info col-12 col-md-auto">
            <h2>Moves</h2>
            <MoveList
              history={this.state.history}
              currentMove={this.state.stepNumber}
              onClick={(move) => this.jumpTo(move)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
