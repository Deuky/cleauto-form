-include .env

CONFIGURE_CREATE?=docker-compose.override.yml

configure: ${CONFIGURE_CREATE}

docker-compose.override.yml:
	cp -v docker-compose.$(ENV).yml $@
