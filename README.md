TOMEI-SERVER

How to Run
-> Running Server
npm i
setup your config/config.json
sequelize db:create
sequelize db:migrate
npm run dev

-> Testing Server
NODE_ENV=test sequelize db:create
NODE_ENV=test sequelize db:migrate
npm run test