install: install-deps install-flow-typed

run:
	npx babel-node -- 'src/bin/geo-by-ip.js' '1.33.213.199'

install-deps:
	npm install

install-flow-typed:
	npx flow-typed install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npx flow

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
