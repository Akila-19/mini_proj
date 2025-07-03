const http = require("http");
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end("Hello from CI/CD pipeline!.... this is a new try... another change");
});
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
