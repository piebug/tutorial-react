import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let className = "square";
    if (this.props.winningSquares && this.props.winningSquares.includes(i)) {
      className += " winner";
    }
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        className={className}
        key={i}
      />
    );
  }

  render() {
    const rows = Array(3).fill(null).map((row, i) => {
      const squares = Array(3).fill(null).map((square, j) => {
        return this.renderSquare(j + (3 * i));
      });
      return (
        <div className="board-row" key={i}>
          {squares}
        </div>
      );
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
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
      reversedMoves: false,
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

  reverseMoves() {
    const reversed = this.state.reversedMoves
    this.setState({
      reversedMoves: !reversed,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const previousMove = move ?
        history[move - 1].squares : null;
      const position = determinePosition(previousMove, step.squares);
      const className = (this.state.stepNumber === move) ?
        "current-move" : "move";
      const desc = move ?
        'Go to move #' + move + ' ' + position : 'Go to game start';

      return (
        <li key={move}>
          <button className={className} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    if (this.state.reversedMoves) {
        moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningSquares={winner ? winner.move : null}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <div>
            <button onClick={() => this.reverseMoves()}>
              Sort moves in
              {this.state.reversedMoves ? " ascending " : " descending "}
              order
            </button>
          </div>
          <ol className="moves">{moves}</ol>
        </div>
      </div>
    );
  }
}

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

function determinePosition(oldSquares, newSquares) {
  let newSquare;
  for (let i = 0; i < newSquares.length; i++) {
      if ((!oldSquares && newSquares[i]) || (oldSquares && (oldSquares[i] !== newSquares[i]))) {
          newSquare = i;
          break
      }
  }
  if (newSquare === null) {  return ''; }

  const row = parseInt(newSquare / 3) + 1;
  const col = (newSquare % 3) + 1;
  return '(' + col + ', ' + row + ')';
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/* TODO: list of extra challenges
 *  - when no one wins, display a message about the result being a draw
 *
 * TODO: my ideas for improvements
 *  - improve the overall styling using Bootstrap
 *  - add the ability to toggle between light and dark mode
 *  - add the ReactJS logo gif to the page
 */
