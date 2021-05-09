import React from 'react';
import ReactDOM from 'react-dom';
import { MoonIcon, SunIcon } from '@primer/octicons-react';
import Header from './Header.js';
import Game from './Game.js';
import Footer from './Footer.js';
import './styles/index.scss';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDefaultTheme: true,
    };
  }

  handleThemeChange() {
    this.setState({
      isDefaultTheme: !this.state.isDefaultTheme,
    });
  }

  render () {
    const theme = this.state.isDefaultTheme ?
      themes.default : themes.dark;
    const themeOption = this.state.isDefaultTheme ?
      themes.dark : themes.default;
    const themeIcon = this.state.isDefaultTheme ?
      <MoonIcon /> : <SunIcon />;

    return (
      <div className={"theme--" + theme}>
        <div className="page container-fluid">
          <Header
            onClick={() => this.handleThemeChange()}
            theme={themeOption}
            themeIcon={themeIcon}
          />
          <Game />
          <Footer />
        </div>
      </div>
    );
  }
}

const themes = {
  default: "default",
  dark: "dark",
}

// ===============================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

/* TODO: ideas for improvements
 *  - write tests
 *  - containerize
 */
