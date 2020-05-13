const app = require("./app.js");
const mongoose = require("mongoose");
const bodyParser = require(`body-parser`);
const cors = require("cors");
const router = require("./router/router");
const URL = `mongodb://localhost:27017/FITNESSATHOME`;
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    const port = app.get("port");
    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);
    app.listen(port, () => console.log(`servar is runig on port ${port} `));
  });
