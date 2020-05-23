# Madina-tic-frontend
a react based frontend for madina-tic project

## Deployment:

### Manual deployment
	- requirements:
		2. nodejs and yarn
	-. setup the frontend:
		- install frontend requirements:
			- `yarn install`
		- run the server:
			- `yarn start`

### Docker deployment:
	- requirements:
		1. install docker deamon [docs](https://docs.docker.com/install/).
		2. install docker-compose tool [docs](https://docs.docker.com/compose/install/).
	1. build the frontend image:
		- dev: `sudo docker build -t madina-tic/frontend:0.1 . -f Dockerfile.dev`
		- prod: `sudo docker build -t madina-tic/frontend:0.2 .`
	2. run the container:
		- dev: `sudo docker run -it -p 3000:3000 madina-tic/frontend:0.1`
		- prod: `sudo docker run -d -p 5000:5000 madina-tic/frontend:0.2`
