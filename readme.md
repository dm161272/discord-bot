
## talentsquadbackend

Talent Squad | Backend III


[![CodeFactor](https://www.codefactor.io/repository/github/dm161272/discord-bot/badge)](https://www.codefactor.io/repository/github/dm161272/discord-bot)


This package contains implementation of Discord bot
using Google chart API to generate QR codes.
based on Node.js with Discord.js package, and Jest for testing.



## Installation

1. Clone repository to your local directory
```
git clone https://github.com/dm161272/discord-bot.git
```
it will be cloned into discord-bot directory

2. Change directory to discord-bot and 
run in terminal
```
npm install
```
3. If you wish to install this bot as your own on your server - please rename config.json.example to config.json
and replace all data with yours server's token, guild and client id.

4. run 
```
node deployCommands.js 
```
to deploy bot commands

5. run 
```
node index.js
```
to start your own bot

4. Working instance of this bot hosted already,
you can add it to your personal discord server by this link:
```
https://discord.com/api/oauth2/authorize?client_id=1046739102126571520&permissions=2147485696&scope=bot%20applications.commands
```
5. command
```
/user-name

```
returns QR encoded discord user name

6. command
```
/qr
```
returns QR with provided URL
(URLs checked with regex pattern and must include http:// or https:// and at least two characters as domain name after '.')
options:
width, height, color of QR code.


7. For testing run 
```
npm test
```
