const express = require('express');
const bodyParser = require('body-parser');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});

// Body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Routes
app.use('/centers', require('./routers/centerRoutes'));
app.use('/donationTypes', require('./routers/donationTypeRoutes'));
app.use('/email', require('./routers/emailRoutes'));
app.use('/login', require('./routers/loginRoutes'));
app.use('/users', require('./routers/userRoutes'));

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});