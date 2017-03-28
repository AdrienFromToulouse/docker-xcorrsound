FROM ubuntu:14.04

MAINTAINER Adrien

RUN apt-get update -y && \
    apt-get install software-properties-common python-software-properties -y

####
# Cmake 3 and build tools
RUN apt-get update -y && \
    add-apt-repository ppa:george-edison55/cmake-3.x -y && \
    apt-get update -y && \
    apt-get install cmake -y && \
    apt-get install build-essential -y

####
# Install git
RUN apt-get update && apt-get install -y git

####
# Install FFTW
RUN apt-get update && \
    apt-get install libfftw3-dev -y

####
# Install Boost
RUN apt-get install libboost-all-dev -y

####
# Install Ronn
RUN apt-get install ruby-ronn -y

WORKDIR /usr/local

####
# Install xcorrsound
RUN git clone https://github.com/openpreserve/scape-xcorrsound

WORKDIR /usr/local/scape-xcorrsound
RUN pwd && ls -la

RUN mkdir build

WORKDIR /usr/local/scape-xcorrsound/build

RUN pwd && ls -la
RUN cmake ..
RUN make && make install
