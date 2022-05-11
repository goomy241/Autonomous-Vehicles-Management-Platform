const express = require("express");
const app = express();
//const port = 3000;
const queriesRouter = require("./routes/queries");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
//   res.setHeader('Access-Control-Allow-Origin', 'https://main.d14elnr7dmueya.amplifyapp.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*"); 
  next();
});

app.get("/test", (req, res) => {
  res.json({ message: "API is alive" });
  console.log("**** GET **** Health Check ****");
});

app.use("/", queriesRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(process.env.PORT || 3000)
// app.listen(port, () => {
//   console.log(`API listening at http://localhost:${port}`);
// });