import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js'
import logo from './images/logo.svg';
import toe from './images/toe.svg';
import tictac from './images/tic-tac.svg';
import tictactoe from './images/tic-tac-toe.svg';
import './styles/index.scss';

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
    <h2 className="made-by mb-0 pb-1">
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

function NavbarIcon(props) {
  return (
    <a
      className="navbar-brand"
      href="https://github.com/simply-so/tutorial-react"
    >
      <img
        src={tictactoe}
        className="tic-tac-toe line-icon d-inline-block align-center mr-2"
        alt="tic-tac-toe"
      />
      <span className="d-none d-md-inline">
        : a <span className="react-js">reactjs</span> practice app
      </span>
    </a>
  );
}

function Header(props) {
  return (
    <header className="header px-md-5 px-3 py-2">
      <nav className="navbar navbar-light px-lg-5">
        <NavbarIcon />
      </nav>
    </header>
  );
}

class Page extends React.Component {
  render () {
    return (
      <div className="theme--default">
        <div className="page">
          <Header />
          <Game />
          <Footer />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

/* TODO: my ideas for improvements
 *  - add the ability to toggle between light and dark mode
 */
