#!/usr/bin/env node

const pkg = require('../../package.json')
console.log("module.exports = '" + pkg.version + "'")
