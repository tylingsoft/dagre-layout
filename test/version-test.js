/* eslint-env mocha */
import { expect } from './chai'

describe('version', function () {
  it('should match the version from package.json', function () {
    const packageVersion = require('../package').version
    expect(require('../index').version).to.equal(packageVersion)
  })
})
