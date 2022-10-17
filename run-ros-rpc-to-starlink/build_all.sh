#!/bin/bash
(cd ../ros-bridge-docker && ./docker_build.sh)
(cd ../run-ros-rpc/docker-node-ros/ && ./docker_build.sh)
