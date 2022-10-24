#!/bin/bash
echo "Ensure that NEO privatenet is up in order to allow its network to communicate with ros RPC"

echo "Ensure docker bridge websocket in built acoordingly"
./build-ros.sh

echo "Copying current certificates to neo privatenet"
(cd ./certificates && ./copyToNeoCompilerNode.sh)

docker compose -f docker-compose-neo.yml down
docker compose -f docker-compose-neo.yml up
