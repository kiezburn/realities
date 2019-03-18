docker stop realities_app
docker rm realities_app
docker run -d --name realities_app --env-file .env -p 127.0.0.1:8081:3000 -p 127.0.0.1:3100:3100 kb/realities 
