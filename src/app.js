const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
   secret: "safe",
   saveUninitialized: true,
   resave: false
}))

require('./../server/routes')(app);

app.listen(8080, () => {
    console.log('server started at 8080');
});
