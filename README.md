<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Execute in development

1. Clone the repository
2. Execute

```
npm i 
```
3. Make sure you have the Nest CLI installed
```
npm i -g @nestjs/cli
```

4. Run the database container
```
docker-compose up -d
```

5. Clone the file __.env.template__ and rename the copy as __.env__

6. Fill the env variables defined

7. Execute the app as dev:
```
npm run start:dev
```

6. Re-build the database with the seed
```
http:localhost:3000/api/v2/seed
```


## Stack used
* MongoDB
* Nest


#Notes
Heroku redeploy without changes
git commit --allow-empty -m "Trigger Heroku Deploy"
git push heroku <master|main>