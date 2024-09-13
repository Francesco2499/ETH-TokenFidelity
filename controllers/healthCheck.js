const debug = require('debug')('app:controllers:healthCheck');
 
const HealthyCheckController = {
 
    index: (req, res) => {
        debug('Index action');
        res.status(200).send('App is running');
    },
 
};
 
module.exports = HealthyCheckController;