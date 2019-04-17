#!/usr/bin/env bash

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

tar -C src/ -czf "secure-messaging-$PACKAGE_VERSION.tgz" compiled