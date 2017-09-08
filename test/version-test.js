/* eslint-env mocha */
import { expect } from 'chai'

import index from '../index'
import { version as packageVersion } from '../package'

describe('version', function () {
  it('should match the version from package.json', function () {
    expect(index.version).to.equal(packageVersion)
  })
})
