# dagre-layout - Graph layout for JavaScript

[![Build Status](https://secure.travis-ci.org/tylingsoft/dagre-layout.png?branch=master)](http://travis-ci.org/tylingsoft/dagre-layout)
[![Coverage Status](https://coveralls.io/repos/github/tylingsoft/dagre-layout/badge.svg?branch=master)](https://coveralls.io/github/tylingsoft/dagre-layout?branch=master)

This project is an out-of-box replacement for [dagre](https://github.com/dagrejs/dagre).

This project isn't built from scratch. It's based on the original [dagre](https://github.com/dagrejs/dagre) project.

Dagre is a JavaScript library that makes it easy to lay out directed graphs on the client-side.

For more details, including examples and configuration options, please see our [wiki](https://github.com/dagrejs/dagre/wiki).


## Changes compared to cpettit/dagre

- Upgrade all the dependencies
- Yarn instead of NPM
- Get rid of PhantomJS
- ES6 instead of ES5
- Use webpack instead of browserify
- Use JavaScript Standard Style instead of JSHint
- Use Jest for testing
- Add test coverage report
- Remove Bower support
- No more `INFINITY`


## Setup

```
yarn install
```


## Build

```
yarn build
```


## Test

```
yarn test
```


## License

dagre-layout is licensed under the terms of the MIT License. See the LICENSE file for details.
