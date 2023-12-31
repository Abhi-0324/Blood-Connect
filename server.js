  const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

//dot config
dotenv.config();

//mongodb connection
connectDB();

const corsOptions = {
  origin: ["https://victorious-waistcoat-lamb.cyclic.app/"],
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
};

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')));


//routes
// 1 test route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

//rest api
app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
