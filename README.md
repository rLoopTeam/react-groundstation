# React Groundstation

A React.js / Node.js app using [Express 4](http://expressjs.com/) and websockets with [Socket.io](socket.io).

This is the main codebase authored by the [Sftw](https://rloop.slack.com/messages/eng-sftw/) team. It presents a web interface at [localhost:3000](http://localhost:3000/) that an operator can use to monitor and control the rPod.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/rLoopTeam/react-groundstation.git # or clone your own fork
cd react-groundstation
npm install
npm run start-all

# alternatively you can run the batch files
installStartup.bat #(for installing npm packages and run app)
buildAndRun.bat #(for simply build and run)
debug.bat #(for running app and attaching a debugger)
startup.bat #(for running app)
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Available Scripts *(likely to change)*
  - npm start *(to run application)*
  - npm run _pod *(to run faux pod comms)*
  - npm run test-backend *(to run tests)*
  - npm run start-all *(to run application with faux pod comms)*
  - npm run _start-debug *(to run application with ability to attach debugger)*
  - npm run build *(to build for production)*
  - npm run bstart *(to build and run)*
