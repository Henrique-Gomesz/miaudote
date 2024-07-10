#!/bin/sh

# Verificar se o comando migrate-mongo está instalado
if ! command -v migrate-mongo >/dev/null 2>&1; then
    echo "migrate-mongo não encontrado. Instalando..."
    bun i -g migrate-mongo
fi

# Conceder permissões de execução ao diretório de migrações
chmod -R 755 /app/migrations
cd app/migrations
pwd
# Executar as migrações
migrate-mongo up

