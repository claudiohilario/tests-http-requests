const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `${__dirname}/upload`);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", function(req, res) {
  upload.single("file")(req, res, function(error) {
    if (error) {
      return res.json({ status: "error" });
    }
    return res.json({ status: "success", data: req.file.originalname });
  });
});

module.exports = app;
