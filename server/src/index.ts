import * as express from 'express';

const app = express();
app.set("port", process.env.PORT || 8000);

var http = require("http").Server(app);

// simple '/' endpoint sending a Hello World
// response
app.get("/", (req: any, res: any) => {
  res.send("hello world");
});

// start our simple server up on localhost:3000
const server = http.listen(8000, function() {
  console.log("listening on *:8000");
});