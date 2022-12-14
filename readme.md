# Vacations-Site 2.0

## Table of contents
* [General info](#general-info)
* [Guidelines](#Guidlines)
* [Technologies & Frameworks](#technologies)
* [Setup](#setup)

## General info
End-to-end vacations site. 

<b>User</b> registers to site and his credentials are saved to DB (password is hashed- 'bcrypt').
After registration the user login and receives a signed token ('JWT') for 15m. 
The token gets verified on every request to the secured endpoints of the server w/ AxiosInstance and documented in Logger. 
In site, the user can sort vacations by category, order, follow, and pay (strict credit card validations - 'Joi') for vacations.
<b>Admin</b> can create, delete or edit vacations (DB updates immediately) straight from web, 
and also track the 'best selling' vacations of the site through 'Reports' page. 
Bonus: type game.

## Guidlines
I always try my best to keep my code DRY, flexible and organized, 
with infrastructue and systematic mindset, <br/>
as if my projects are out in production for million of users, <br/>
and the right balance between user experience and security.
experimenting npm packages, and dedicating time to come up with the right approach for solving problems. 

## Technologies
* React TypeScript
* Node.JS (express)
* mySql (workbench)
* Docker
* Redux-Toolkit
* M-ui
	
## Setup
To run this project, install it locally using npm/yarn commands:

```
$ Clone project files in your code editor
$ Open a new terminal in 'docker/mysql' file
$ Make sure 'Docker desktop' is running- important
$ Remove running containers w/ 'docker container rm -f $(docker container ls -aq)' command
$ Remove running images w/ 'docker image rm -f $(docker image ls -q)'
$ Run 'docker compose down' to make sure workspace is clean
$ Run 'docker compose up'
$ Open another terminal in the 'src' file of 'Client' folder
$ Run 'npm i' & 'npm start' when finished
$ Repeat steps for 'API' folder- and we're ready to go!
^ Recommanded: Restart your code editor before running "npm start" on 'Client' & 'Api' src folder. Also run "docker compose up" in docker-compose-file. 
```
