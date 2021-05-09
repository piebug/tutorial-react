import React from 'react';
import logo from './images/logo.svg';
import toe from './images/toe.svg';
import tictac from './images/tic-tac.svg';
import './styles/Footer.scss';

function ReactLogo(props) {
  return (
    <div className="react-logo">
      <img src={logo} className="logo" alt="ReactJS logo" />
      <p>
        <a href="https://reactjs.org/" className="react-home">React</a>
      </p>
    </div>
  );
}

function PillToeIcons(props) {
  return (
    <div className="pill-toe-icons">
      <img src={tictac} className="tic-tac line-icon" alt="tic-tac" />
      <img src={toe} className="toe line-icon" alt="toe" />
    </div>
  );
}

function IconsAttribute(props) {
  return (
    <p className="small">
      Icons made by{' '}
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> (tic-tac-toe),{' '}
      <a href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a> (tic-tac), and{' '}
      <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> (toe) from{' '}
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>.
    </p>
  );
}

function MadeBy(props) {
  return (
    <h2 className="made-by">
      Made by Sandy.
    </h2>
  );
}

function Footer(props) {
  return (
    <footer className="footer">
      <div>
        <MadeBy />
        <IconsAttribute />
        <PillToeIcons />
      </div>
      <ReactLogo />
    </footer>
  );
}

export default Footer;
