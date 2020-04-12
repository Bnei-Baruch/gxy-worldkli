# BB Galaxy World Kli Viewer

## development

npm i 
npm start (for server)
npm run frontend (for client)
default dev port: 2200
http://localhost:2200

## build frontend

sudo npm i
sudo npm run build

## build docker

docker login
npm i 
npm run docker:build
port exposed: 2200

## utils

frontend will refresh itself every 5 min.
clear db & images is a process that will clear db&files older then 4 hours
the process will run once in an hour

## group prefix

the rooms will be combined into groups by the rooms prefix. PT 1 & PT 2 will combine in to PT group tab.
the group prefix can be found in server/cfg.json file. please edit this file for extra groups.
the prefix is the first word till the space.
if the prefix was not found, a new tab will be open.

## db

atlas mongo db sandbox (free)

## apis for galaxy

### /api/userEnter - POST

payload:
{
    userName: String,
    userId: String,
    roomName: String,
    roomId: String,
    image: String - Base64
}

all fields are mandatory - invalid will return 400
on valid - 200

the image will be saved as a .jpg file in public/users folder

### /api/userLeave - POST

payload:
{
    userId: String
}

all fields are mandatory - invalid will return 400
on valid - 200

