#!/bin/bash

cd client
npm install

npm run build
echo "Client built"

cd ..

cp -a client/build/. public/
cp -a client/build/index.html app/views/index.scala.html
