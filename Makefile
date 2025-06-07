outside-docker-up:
	docker compose \
		--file docker-compose.db.yml \
		up -d

outside-docker-down:
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
		up -d

docker-prod-down:
	docker compose \
		--file docker-compose.prod.yml \
		down
