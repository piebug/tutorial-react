# Tutorial: React JS

This project is my implementation of the official [React JS tutorial](https://reactjs.org/tutorial/tutorial.html). The goal was to build a solitary Tic-Tac-Toe game that displays a record of each move in an interactive list. It does nothing and means nothing, but it sure is cute.

This was my first foray into React and will hopefully be a good reference for the future 🐱‍💻 - although some of the code written here is already considered outdated! I will most likely also use this project as a React sandbox for practicing new techniques later on. 

## Setup

### Create React App

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I kept the source files that Create React App auto-generates in the `cra_src/` folder. They were different enough from what I was doing that I thought I'd like to keep them around as alternate examples.

Likewise, I preserved the auto-generated README.md as [`CRA_README.md`](CRA_README.md). This has generic instructions for running a React app with `npm`.

### Install & Deploy

Use `npm install` to install the dependencies, which include:

* [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) (and [React Bootstrap](https://react-bootstrap.github.io/))
* [Sass](https://sass-lang.com/)
* [Octicons](https://primer.style/octicons/)

I also use [`gh-pages`](https://www.npmjs.com/package/gh-pages) to deploy the project to GitHub Pages. To redeploy, use `npm run deploy`.
