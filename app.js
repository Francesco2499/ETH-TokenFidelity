var express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const cors = require('cors');
const routes = require('./routes'); 

debug('Start');

// Init express application
const app = express();

// Enable CORS
app.use(cors());

// Setup logger and body parser
app.use(morgan('dev'));

// Using express version > 4.16.0
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Setup routes
app.use(routes);

// Solve 304 problem
app.disable('etag');

// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

module.exports = app;