#!/usr/bin/env node

/*
 * Bumps the minor version and sets the prelease tag.
 */

import fs from 'fs'
import semver from 'semver'

const packageFile = fs.readFileSync('package.json')
const packageJson = JSON.parse(packageFile)

if (!('version' in packageJson)) {
  bail('ERROR: Could not find version in package.json')
}

const ver = semver.parse(packageJson.version)
packageJson.version = ver.inc('patch').toString() + '-pre'

fs.writeFileSync('package.json', JSON.stringify(packageJson, undefined, 2))

// Write an error message to stderr and then exit immediately with an error.
function bail (msg) {
  process.stderr.write(msg + '\n')
  process.exit(1)
}
