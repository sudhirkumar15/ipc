#!/bin/sh

npm install

# Modify api url
python deploy/modify_api_url.py

ng serve --host 0.0.0.0
