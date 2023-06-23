# ondc-mock-server

Run "npm i" to install all the dependencies
Start Docker Desktop application.
Run “docker build -t ondc .” in your terminal or in your vs studio terminal ensure that you are in the project path.
Run “docker run -dp 5500:5500 ondc” to start the container with port 5500.
You would be able to hit any api now.
To stop the container you need container id for this run docker ps and copy the container id in which image ondc. Then run “docker stop <container_id>“
To remove the container run “docker rm <container_id>”
To delete an image run “docker rmi -f ondc”
