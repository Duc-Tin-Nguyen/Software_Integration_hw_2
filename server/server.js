// server.js
const mongoose = require('mongoose');
const config = require('./src/config');
const app = require('./src/app');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const port = config.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
