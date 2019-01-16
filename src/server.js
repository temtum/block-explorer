var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();

app.use(express.static(path.dirname(path.dirname(fs.realpathSync(__filename))) + '/dist'));
app.listen(8081);
