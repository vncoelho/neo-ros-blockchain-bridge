#!/bin/bash
./build_all.sh
docker compose down
docker compose up
