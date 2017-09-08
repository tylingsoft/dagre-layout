MOD = dagre-layout
YARN = yarn
KARMA = ./node_modules/.bin/karma

.PHONY: all bench browser-test test

bench: test
	@src/bench.js

lib/version.js: package.json
	@src/release/make-version.js > $@

test: browser-test

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
