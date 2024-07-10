
up:
	docker compose up -d

up-logs:
	docker compose up	

down:
	docker compose down

migrate-up:
	docker exec app-container sh -c "migrate-mongo up"

migrate-down:
	docker exec app-container sh -c "migrate-mongo down"
