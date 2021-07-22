require('dotenv').config();
var express = require('express');
var PORT = require('./constants/index.ts').envConstants.PORT;
var app = express();
app.listen(PORT, function () {
    console.log("App listen " + PORT);
});
