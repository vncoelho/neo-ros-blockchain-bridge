FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

# =====================================================================
# Nodejs packages & npm
RUN apt-get update \
    && apt-get install -y npm nodejs psmisc nano curl
# =====================================================================

RUN rm -rf /var/lib/apt/lists/*

WORKDIR /opt/

ADD package_basic_express.json /opt/package.json

RUN npm install
