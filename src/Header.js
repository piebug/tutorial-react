import React from 'react';
import Form from 'react-bootstrap/Form';
import tictactoe from './images/tic-tac-toe.svg';
import './styles/Header.scss';

function NavbarTicTacToe(props) {
  return (
    <a
      className="navbar-ttt"
      href="https://github.com/pies-n-loaf/tutorial-react"
    >
      <img
        src={tictactoe}
        className="tic-tac-toe"
        alt="tic-tac-toe"
      />
      <span className="navbar-ttt-title">
        : a <span className="react-js">reactjs</span> practice app
      </span>
    </a>
  );
}

function Header(props) {
  return (
    <header className="header">
      <nav className="navbar navbar-light">
        <NavbarTicTacToe />
        <div class="theme-switch">
          {props.themeIcon}
          <Form.Switch 
            id="themeSwitch"
            label={<span className="sr-only">switch to {props.theme} mode</span>}
            onClick={props.onClick}
            defaultChecked
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
