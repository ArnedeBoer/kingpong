const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./../server/routes')(app);

app.listen(8080, () => {
    console.log('server started at 8080');
});
