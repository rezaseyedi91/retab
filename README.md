# retab
Vue/Express.js web application for encoding early music tablature


## Experience the reTab
Try reTab on https://tab.rezaseyedi.com with a guest account:
or contact reza.seyedi010@gmail.com if you want to use reTab with a personal account.

#### username: guest
#### password: retabguest@123


## Development
clone the repository:
### client:
create .env file:

    VUE_APP_API_URL="http://localhost:4000"
    VUE_APP_API_URL_PRODUCTION="https://tab.rezaseyedi.com/api/"
    VUE_APP_ENV="development"
    cd ./retab-client
    npm install 
    npm run serve



### server:
    cd ./retab-server


create .env file with these environment variables: : 

    PORT=4000
    MODE="development"
    TAB_CLIENT_URL="http://localhost:8080"

    DATABASE_URL="mysql://root:reza3619454@localhost:3306/retab"

then run: 

    npm install
let prisma make a local mysql database;

    npx prisma migrate deploy

run development server:

    npx nodemon index.ts


