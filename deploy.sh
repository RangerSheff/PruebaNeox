#!/bin/bash
# Script de build y deploy para servidor Proxmox/Ubuntu con Docker
set -e

IMAGE_NAME="api-bff-neox:latest"

echo ">>> Construyendo imagen Docker: $IMAGE_NAME"
docker build -t $IMAGE_NAME .

echo ">>> Levantando servicios..."
docker compose up -d

echo ">>> Estado de los contenedores:"
docker compose ps
