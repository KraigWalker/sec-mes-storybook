#!/bin/bash

echo What is your ALP username?

read username

echo Thanks, now what is your ALP password?

read -s password

echo {\"username\": \"$username\", \"password\":\"$password\"} > meo.credentials.json
echo "Getting your token..."
sleep 3
#!/bin/evn/node
node ./stafftoken.js

