ifneq (,$(wildcard ./.env))
    include .env
    export
endif

ifneq (,$(wildcard docker/.env))
    include docker/.env
    export
endif

install:
	@docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:slim \
		npm install

build:
	@docker run -ti --rm \
		-v $(shell pwd)\:/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		-e NPM_CONFIG_PREFIX=/home/node/.npm-global \
		node:slim \
		npm run build

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

deploy:
	$(MAKE) install
	$(MAKE) build
	@rsync -ru dist/* ${SFTP_USER}@${SFTP_HOST}:constellation.namide.com
	@echo "✅ deployed"