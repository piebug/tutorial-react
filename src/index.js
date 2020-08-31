import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js'
import logo from './static/logo.svg';
import toe from './static/toe.svg';
import tictac from './static/tic-tac.svg';
import tictactoe from './static/tic-tac-toe.svg';
import './index.css';


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

function Footer(props) {
  return (
    <footer className="footer px-md-5 px-3 py-3">
      <div className="container-fluid px-lg-5">
        <div className="d-md-flex justify-content-between align-items-top mt-4">
          <div>
            <p className="made-by mb-1">
              Made by Sandy.
            </p>
            <IconsAttribute />
            <div class="text-center text-md-left">
              <img src={tictac} className="tic-tac" alt="tic-tac" />
              <img src={toe} className="toe" alt="toe" />
            </div>
          </div>
          <div className="text-center mt-3 mt-md-0">
            <img src={logo} className="logo" alt="ReactJS logo" />
            <p>
              <a href="https://reactjs.org/" className="react-home">React</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Header(props) {
  return (
    <header className="header px-md-5 px-3 py-2">
      <nav className="navbar navbar-light px-lg-5">
        <a className="navbar-brand" href="https://github.com/simply-so/tutorial-react">
          <img src={tictactoe} className="tic-tac-toe d-inline-block align-center mr-2" alt="tic-tac-toe" />
          <span className="d-none d-md-inline">
            : a <span className="react-js">reactjs</span> practice app
          </span>
        </a>
      </nav>
    </header>
  );
}

class Page extends React.Component {
  render () {
    return (
      <div className="page">
        <Header />
        <Game />
        <Footer />
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
