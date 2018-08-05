const express = require('express');
const app = express();

// require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if(err){
        console.err('Error starting the server');
    } else {
        console.log(`Connected to server on port ${PORT}`);
    }
});

