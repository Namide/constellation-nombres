
install:
	@docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:slim \
		npm install

dev:
	@docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-p 5173\:5173 \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:slim \
		npm run dev

code:
	@docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-p 5174\:5173 \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:slim \
		bash
