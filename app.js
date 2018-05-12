const functions = require("./functions");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 4000;
server.listen(port);

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/assets/index.html");
// });
app.get("/", function(req, res) {
  res.send(`Socket running at port ${port}`);
});

io.on("connection", function(socket) {
  socket.on("scrape", async function(data, callback) {
    switch (data.using) {
      case "nightmare":
        callback(await functions.getNightmareTitle("http://example.com"));
        break;
      case "puppeteer":
        callback(await functions.getPuppeteerTitle("http://example.com"));
        break;
      default:
    }
  });
});

console.log(`server running at ${port}`);
