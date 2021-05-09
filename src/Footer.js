import React from 'react';
import logo from './images/logo.svg';
import toe from './images/toe.svg';
import tictac from './images/tic-tac.svg';
import './styles/Footer.scss';

function ReactLogo(props) {
  return (
    <div className="text-center">
      <img src={logo} className="logo" alt="ReactJS logo" />
      <p>
        <a href="https://reactjs.org/" className="react-home">React</a>
      </p>
    </div>
  );
}

function PillToeIcons(props) {
  return (
    <div>
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
    <footer className="footer px-md-5 px-3 py-3">
      <div className="container-fluid px-lg-5">
        <div className="d-md-flex justify-content-between align-items-top mt-4">
          <div>
            <MadeBy />
            <IconsAttribute />
            <div className="text-center text-md-left">
              <PillToeIcons />
            </div>
          </div>
          <div className="mt-3 mt-md-0">
            <ReactLogo />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
