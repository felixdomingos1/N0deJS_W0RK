echo 'requesting all users'
curl localhost:3000/user

echo 'requesting first'
curl localhost:3000/user/1

echo 'requesting with wrong body'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}'\
    localhost:3000/user

echo 'create new User'
curl --silent -X POST \
    --data-binary '{"name": "Chapolin", "age": 100, "ocupation": "Strength" }'\
    localhost:3000/user

echo 'requesting 1683450353441'
curl localhost:3000/user/1683450353441