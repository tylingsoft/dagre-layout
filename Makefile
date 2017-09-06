MOD = dagre-layout

YARN = yarn
JEST = ./node_modules/.bin/jest
KARMA = ./node_modules/.bin/karma

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
	@$(JEST) --coverage

browser-test:
	$(KARMA) start --single-run

release:
	@echo
	@echo Starting release...
	@echo
	@src/release/release.sh $(MOD) dist

node_modules: package.json
	@$(YARN) install
	@touch $@
