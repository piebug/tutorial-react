import React from 'react';
import './styles/MoveList.scss';

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
        className={"move btn btn-outline-primary" + (this.props.isCurrent ? " current" : "")}
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
        <li key={move}>
          {this.renderMove(move, position)}
        </li>
      );
    });
    if (this.state.reversed) {
      moves = moves.reverse();
    }

    return (
      <div className="move-list">
        <ol className="moves">{moves}</ol>
        <button
          className="btn btn-outline-primary btn-sm btn-subtle"
          onClick={() => this.reverseMoves()}
        >
          Sort moves in
          {this.state.reversed ? " ascending " : " descending "}
          order
        </button>
      </div>
    );
  }
}

export default MoveList;
