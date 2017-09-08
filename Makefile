MOD = dagre-layout

bench:
	@src/bench.js

lib/version.js: package.json
	@src/release/make-version.js > $@

release:
	@echo
	@echo Starting release...
	@echo
	@src/release/release.sh $(MOD) dist
