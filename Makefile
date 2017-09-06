MOD = dagre-layout

YARN = yarn
ISTANBUL = ./node_modules/istanbul/lib/cli.js
JSHINT = ./node_modules/jshint/bin/jshint
JSCS = ./node_modules/jscs/bin/jscs
KARMA = ./node_modules/karma/bin/karma
MOCHA = ./node_modules/mocha/bin/_mocha
UGLIFY = ./node_modules/uglify-js/bin/uglifyjs

ISTANBUL_OPTS = --dir $(COVERAGE_DIR) --report html
JSHINT_OPTS = --reporter node_modules/jshint-stylish/stylish.js
MOCHA_OPTS = -R dot

COVERAGE_DIR = coverage
DIST_DIR = dist

SRC_FILES = index.js lib/version.js $(shell find lib -type f -name '*.js')
TEST_FILES = $(shell find test -type f -name '*.js' | grep -v 'bundle-test.js')

.PHONY: all bench browser-test unit-test test

all: unit-test

bench: test
	@src/bench.js

lib/version.js: package.json
	@src/release/make-version.js > $@

test: unit-test browser-test

unit-test: $(SRC_FILES) $(TEST_FILES) node_modules
	@$(ISTANBUL) cover $(ISTANBUL_OPTS) $(MOCHA) --dir $(COVERAGE_DIR) -- $(MOCHA_OPTS) $(TEST_FILES) || $(MOCHA) $(MOCHA_OPTS) $(TEST_FILES)
	@$(JSHINT) $(JSHINT_OPTS) $(filter-out node_modules, $?)
	@$(JSCS) $(filter-out node_modules, $?)

browser-test:
	$(KARMA) start --single-run $(KARMA_OPTS)

$(DIST_DIR)/$(MOD).min.js: $(DIST_DIR)/$(MOD).js
	@$(UGLIFY) $< --comments '@license' > $@

$(DIST_DIR)/$(MOD).core.min.js: $(DIST_DIR)/$(MOD).core.js
	@$(UGLIFY) $< --comments '@license' > $@

release:
	@echo
	@echo Starting release...
	@echo
	@src/release/release.sh $(MOD) dist

node_modules: package.json
	@$(YARN) install
	@touch $@
