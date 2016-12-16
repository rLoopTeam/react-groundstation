# React Groundstation

A React.js / Node.js app using [Express 4](http://expressjs.com/) and websockets with [Socket.io](socket.io).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/rLoopTeam/react-groundstation.git # or clone your own fork
cd react-groundstation
npm install
npm run build && npm run start-all

# alternatively you can run the batch files
installStartup.bat (for installing npm packages)
startup.bat (for simply build and run)
```

Your app should now be running on [localhost:3001](http://localhost:3001/).

## Available Scripts *(likely to change)*
  - npm start *(to start frontend and backend together)*
  - npm test *(to run tests)*
  - npm run start-client *(to start frontend standalone)*
  - npm run build *(to build)*
  - npm run bstart *(to build and run)*
  - npm run start-all *(to start frontend, backend, and pod data together)*