#!/bin/bash
docker cp ./serverStarlink.crt eco-neo-csharp-noderpc1-running:/usr/local/share/ca-certificates/serverStarlink.crt

docker exec -d eco-neo-csharp-noderpc1-running update-ca-certificates
