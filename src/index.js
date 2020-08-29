import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className={"square" + (props.isWinner ? " winner" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinner={(this.props.winningSquares && this.props.winningSquares.includes(i))}
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

function MovePosition(props) {
  if (!props.col || !props.row) {
    return null;
  }
  return (
    <span className="move-position">
      ({props.col}, {props.row})
    </span>
  );
}

class Move extends React.Component {
  renderPosition() {
    return (
      <MovePosition
        col={this.props.position ? this.props.position.col : null}
        row={this.props.position ? this.props.position.row : null}
      />
    );
  }

  render() {
    const position = this.renderPosition();
    let desc = this.props.move ?
      'move #' + this.props.move :
      'game start';
    desc = this.props.isCurrent ?
      desc[0].toUpperCase() + desc.slice(1) :
      "Go to " + desc;

    return (
      <button
        className={"btn btn-primary move" + (this.props.isCurrent ? " current" : "")}
        disabled={this.props.isCurrent}
        onClick={this.props.onClick}
      >
        {desc} {position}
      </button>
    );
  }
}

class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reversed: false,
    };
  }

  reverseMoves() {
    const reversed = this.state.reversed;
    this.setState({
      reversed: !reversed,
    });
  }

  renderMove(move, position) {
    return (
      <Move
        move={move}
        position={position}
        isCurrent={(this.props.currentMove === move)}
        onClick={() => this.props.onClick(move)}
      />
    );
  }

  render() {
    const history = this.props.history;
    let moves = history.map((step, move) => {
      const previousMove = move ?
        history[move - 1].squares : null;
      const position = determinePosition(previousMove, step.squares);

      return (
        <li key={move} className="my-2">
          {this.renderMove(move, position)}
        </li>
      );
    });
    if (this.state.reversed) {
      moves = moves.reverse();
    }

    return (
      <div>
        <ol className="moves">{moves}</ol>
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary btn-sm sort" onClick={() => this.reverseMoves()}>
            Sort moves in
            {this.state.reversed ? " ascending " : " descending "}
            order
          </button>
        </div>
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
      <div className="game container-fluid p-md-5 p-3">
        <h1 className="px-lg-5 py-2">Tic-Tac-Toe</h1>
        <div className="row px-lg-5 py-3">
          <div className="game-board col-12 col-md py-3">
            <h2 className="status">{status}</h2>
            <Board
              squares={current.squares}
              winningSquares={winner ? winner.move : null}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info col-12 col-md py-3">
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
      break;
    }
  }
  if (newSquare === null) { return null; }

  const row = parseInt(newSquare / 3) + 1;
  const col = (newSquare % 3) + 1;
  return {
    col: col,
    row: row,
  };
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/* TODO: my ideas for improvements
 *  - improve the overall styling using Bootstrap
 *  - add the ability to toggle between light and dark mode
 *  - add the ReactJS logo gif to the page
 */
