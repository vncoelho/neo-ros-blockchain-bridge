## ROS websocket bridge for publishing data

The Folder `ros-bridge-docker` contain the first container that runs a bridge of ROS core and a websocket server, making data from sensors avaialable through a publisher encrypt written in Python.

* docker_build.sh will build the docker container that has a native ROS images embedded with others necessary items.

## ROS websocket bridge for publishing data
The folder `run-ros-rpc` contains all the robot necessary services, which is the ROS websocket bridge and a backend.
The backend is developed with nodejs express, which has a websocket connection with the ROS bridge, then,
providing RPC calls.

The core docker image of a LINUX based nodejs service can be found in the subfolder `docker-node-ros`

## Forcing a satelite connection
Currently, Starlink does not provide a public IP for residential use, thus, a bridge is created in a server.
This bridge can be find in the folder `node-starlink-bridge`, which is the RPC called by Oracles.
ROS posts data on this backend.

## Bridge for publishing data to starlink 
Similar to the `run-ros-rpc` folder, the tools on `run-ros-rpc-to-starlink` provide a websocket connection, but, on the other hand,
it posts data on the aforementioned starlink node express bridge, which, in turns, provides a RPC API.

## Smart contract

The folder `smart-contract` constains the smart contracts written in C# that are deployed in the Neo Blockchain.
This code is used for interacting with the blockchain, which obtains the ROS sensor data from the RPC throughout Oracles.

