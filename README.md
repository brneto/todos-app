# Todo App Demo
A small [PWA](https://en.m.wikipedia.org/wiki/Progressive_web_application) React/Redux application example to demostrate how to use known best practices, design pattern ([CQS](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation)) and libraries to achieve a sofware highly scalable, realiable and maintainable.

## Table of Contents
- [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Build](#build)
- [Documentation](#documentation)
  - [Introduction](#introduction)
  - [Reducer + Flux = Redux](#reducer-flux-redux)
- [Libraries](#libraries)
- [Development Aid Tools](#development-aid-tools)
- [Testing Tools](#testing-tools)

- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Usage
Download modules:

	$ yarn

Run app server in development:

	$ yarn start

Stop app server:

	$ yarn stop

### Build
	$ yarn build

Generated files will be in the `dist` folder.

## Documentation

### Introduction
Despite the fact this is a small app just to demostrate the use of some interesting technologies on developing a frontend software, to fully comprehend the code and the design choices to this small app by only digging in the source code can turn into a pretty tough job if you don't know the concepts behind that's led me to take the current approaches in code.

On the following topics I'll try to explain all the theory bases been used to implement this demo app.

### Reducer + Flux = Redux
For many years, the [MVC (Model-View-Controller)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern has been the _de facto_ standart regards to frontend apps design for long time, but with the advance of complex web app with countless number of user interactions and interfaces started to make the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) architecture started to be inefficient.

Aiming to solve the [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) drawbacks regarding to the instability and complexity the Facebook engineers come out with an alternative called [Flux](https://facebook.github.io/flux/).

Keeping that in mind, [Redux](https://redux.js.org/) is just an implementantion of the [Flux](https://facebook.github.io/flux/) architecture (as many others), but with an additional constraint, Redux **doesn't allow to have more than one [Store](https://redux.js.org/basics/store)** while for [Flux](https://facebook.github.io/flux/) it's possible to have as many [Store](https://facebook.github.io/flux/docs/in-depth-overview/#stores) as you decide. Store on those architecture is where it's keeped the application state.

Besides, [Redux](https://redux.js.org/) has added the concept of **[Reducers](https://redux.js.org/basics/reducers#reducers) (a special function that must be always called in order to change the state beared in the application Store)**.

Before start talking about Redux itself in more details, I believe it would be also valuable knows a little bit more about the forerunner architectures which led us till Redux.

### Model-View-Controller
[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) is very much known by the three-layer architecture which divides the system into three components:
- Model: holds data and business logic
- View: displays the model in the UI
- Controller: interfaces between View and Model

![MVC Architecture Diagram][mvc-diagram]

The Controller receives the User requests, manipulate the Model and View to render back a new View to the User in response.
## Libraries
:atom_symbol: [React](https://reactjs.org/)

:hammer_and_wrench: [Lodash](https://lodash.com/)

:ram: [Ramda](https://ramdajs.com/)

:nail_care: [Styled Components](https://www.styled-components.com/)

:gift: [React Router v4](https://github.com/ReactTraining/react-router)

:electron: [Redux](https://redux.js.org/)

:gem: [Immer](https://github.com/mweststrate/immer)

:card_file_box: [Normalizr](https://github.com/paularmstrong/normalizr)

:robot: [Reselect](https://github.com/reduxjs/reselect)

:punch: [Redux Actions](https://redux-actions.js.org/)

:atom: [Redux Saga](https://redux-saga.js.org/)

:wavy_dash: [Connected React Router](https://github.com/supasate/connected-react-router)

:hourglass: [Moment](https://github.com/moment/moment/)

:running: [Express](http://expressjs.com/)

:satellite: [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

:package: [ES Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## Development Aid Tools
[ESLint](https://eslint.org/)

[Stylelint](https://stylelint.io/)

[Babel](https://babeljs.io/)

[Webpack](https://webpack.js.org/)

[PostCSS](https://postcss.org/)

[Hard Source Webpack Plugin](https://github.com/mzgoddard/hard-source-webpack-plugin)

[Workbox](https://developers.google.com/web/tools/workbox/)

[Autoprefixer](https://github.com/postcss/autoprefixer)

[CSS Hot Loader](https://github.com/shepherdwind/css-hot-loader)

[PM2](http://pm2.keymetrics.io/)

[Redux Logger](https://github.com/evgenyrodionov/redux-logger)

[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

## Testing Tools
:black_joker: [Jest](https://jestjs.io/)

:goat: [React Testing Library](https://github.com/kentcdodds/react-testing-library)

:owl: [Jest DOM](https://github.com/gnapse/jest-dom) (Custom Jest Matchers)

:door: [Nock](https://github.com/nock/nock)

:snowflake: [Deep Freeze](https://github.com/substack/deep-freeze)

:book: [Redux Saga Test Plan](http://redux-saga-test-plan.jeremyfairbank.com/)

[Watchman](https://facebook.github.io/watchman/)

## Contributing
Bugs, feature requests and more, in [GitHub Issues](https://github.com/brneto/todos-app/issues).

## License
[MIT License](https://github.com/brneto/todos-app/blob/master/LICENSE.md).

<!--images reference-->
[mvc-diagram]: ./modeling/mvcDiagram.png "MVC Architecture Diagram"
