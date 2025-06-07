outside-docker-up:
	docker compose \
		--file docker-compose.db.yml \
		up -d
	npm run migration:up
	npm run start


outside-docker-down:
	npm run migration:down
	docker compose \
		--file docker-compose.db.yml \
		down

docker-dev-up:
	docker compose \
		--file docker-compose.dev.yml \
		up --build --watch

docker-dev-down:
	docker compose \
		--file docker-compose.dev.yml \
		down

docker-prod-up:
	docker compose \
		--file docker-compose.prod.yml \
		up --build

docker-prod-down:
	docker compose \
		--file docker-compose.prod.yml \
		down
