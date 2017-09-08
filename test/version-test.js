/* eslint-env jest */
import { expect } from 'chai'

import dagre from '../index'
import { version as packageVersion } from '../package.json'

describe('version', function () {
  it('should match the version from package.json', function () {
    expect(dagre.version).to.equal(packageVersion)
  })
})
