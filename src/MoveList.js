import React from 'react';
import './styles/MoveList.scss';

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
        className={"move btn btn-outline-primary px-2 py-1 mx-2" + (this.props.isCurrent ? " current" : "")}
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
      <div className="d-flex flex-column h-100">
        <ol className="moves pl-3">{moves}</ol>
        <div className="mt-auto">
          <button
            className="btn btn-outline-primary btn-sm btn-subtle border-0 px-1 py-0"
            onClick={() => this.reverseMoves()}
          >
            Sort moves in
            {this.state.reversed ? " ascending " : " descending "}
            order
          </button>
        </div>
      </div>
    );
  }
}

export default MoveList;

// Helper functions

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
