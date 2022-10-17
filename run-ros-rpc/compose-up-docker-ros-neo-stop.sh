#!/bin/bash
echo "Ensure that NEO privatenet is up in order to allow its network to communicate with ros RPC"

docker compose -f docker-compose-neo.yml down
