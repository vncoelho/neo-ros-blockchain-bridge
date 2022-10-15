#!/bin/bash
docker cp ./server.crt eco-neo-csharp-noderpc1-running:/usr/local/share/ca-certificates/server.crt

docker exec -d eco-neo-csharp-noderpc1-running update-ca-certificates
