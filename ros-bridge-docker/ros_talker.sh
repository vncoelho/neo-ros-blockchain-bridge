#!/bin/bash

#source /opt/ros/noetic/setup.bash

cd ~/catkin_ws/src
catkin_create_pkg simple_pub_blockchain rosbridge_server
cd ~/catkin_ws
rosdep install --from-paths src --ignore-src -r -y
mkdir ~/catkin_ws/src/simple_pub_blockchain/launch
mkdir ~/catkin_ws/src/simple_pub_blockchain/src
mv /websocket.launch ~/catkin_ws/src/simple_pub_blockchain/launch/websocket.launch
mv /simple_pub_blockchain.py ~/catkin_ws/src/simple_pub_blockchain/src/simple_pub_blockchain.py
chmod +x ~/catkin_ws/src/simple_pub_blockchain/src/simple_pub_blockchain.py
catkin_make
source devel/setup.bash
roslaunch simple_pub_blockchain websocket.launch
