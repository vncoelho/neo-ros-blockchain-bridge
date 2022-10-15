FROM ros:noetic-ros-base-focal

RUN apt-get update && apt-get install -y --no-install-recommends \
	    screen \
	    wget \
	    curl \
	    nano \
	    iputils-ping \
	    net-tools \
	    iptables \
	    tcpdump \
	    iproute2 \
	    ros-noetic-rosbridge-server \
	    python3-rosdep \
	    python3-rosinstall \
	    python3-rosinstall-generator \
	    python3-wstool \
	    build-essential \	    
    && rm -rf /var/lib/apt/lists/*


RUN echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
  
RUN mkdir -p ~/catkin_ws/src
ADD simple_pub_blockchain.py /

ADD ros_talker.sh /
ADD websocket.launch /    
ADD run.sh /  

CMD ["/bin/bash", "/run.sh"]
