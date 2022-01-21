#!/bin/bash
docker ps -a | awk '{print }' | xargs -l docker rm -f
docker images | awk '{print }' | xargs -l docker rmi -f
