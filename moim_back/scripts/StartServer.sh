#!/bin/bash

# Nest.js 서버 시작 스크립트

#실행인자
NPM=npm
NPM_ARG=run
PROD_OPTION=start:prod

#change dir
cd /home/ubuntu/backend/moim_back

# Nest.js 서버 실행
$NPM $NPM_ARG $PROD_OPTION
