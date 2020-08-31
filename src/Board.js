import React from 'react';

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

export default Board;
