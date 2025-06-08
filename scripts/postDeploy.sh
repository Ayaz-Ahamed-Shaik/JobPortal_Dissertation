#!/bin/bash

# Go to the project directory
cd /home/ec2-user/project

# Stop and remove any existing containers
docker-compose down

# Build and start the containers in detached mode
docker-compose up --build -d
