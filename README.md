# PKI-Web-Service

## Introduction

PKI final project. Web service deployed on Heroku for database management, query exectuion and table lookup.

## Technologies

- Bootstrap 4
  - DataTables
- javascript
  - node js
    - express.js
    - handlebars
    - sequelize
    - passport
- PostgreSQL
- heroku
- Google OAuth2.0

## Launch

### Heroku

Go to: http://pki-final.herokuapp.com/

### Local

In order to run this app localy you will need couple of things:

1. Run npm install
2. Set up .env file
   1. NODE_ENV = "development"
   2. PORT = ...
   3. DATABASE_URL = ...
   4. GOOGLE_CLIENT_ID = ...
   5. GOOGLE_CLIENT_SECRET = ...
3. Set up this app in Google Cloud Platform

```shell
npm install
npm run dev
```


