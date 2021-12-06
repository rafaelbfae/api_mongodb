const express = require('express')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

const app = express()
const port = 3000

const routes = require('./routes/main');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})