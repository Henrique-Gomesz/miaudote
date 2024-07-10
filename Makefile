
up:
	docker-compose up -d

up-logs:
	docker-compose up	

down:
	docker-compose down

migrate-up:
	docker exec app-container sh -c /app/migrations/migrate-up.sh

migrate-down:
	docker exec app-container sh -c cd /migrations && migrate-mongo down
