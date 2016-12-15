'use strict';

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.on('request', app);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});