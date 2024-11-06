#!/bin/bash
# This file contains bash commands that will be executed at the end of the container build process,
# after all system packages and programming language specific package have been installed.
#
# Note: This file may be removed if you don't need to use it
sudo rm -rf /usr/lib/jvm/openjdk-17
curl -fsSL https://ollama.com/install.sh | sh
ollama serve &
sleep 5
ollama pull deepseek-coder-v2:16b
