const express = require('express');
const app = express();

const Travelkan = require("./api/server");

app.use("/project-massage/api", Travelkan);

const port = process.env.PORT || 49231;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//module.exports.handler = serverless(app);