const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const http = require("http");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", function(req, res) {
  const fieldName = "file";
  return upload.single(fieldName)(req, res, error => {
    if (error) {
      return res.json({ status: "errorProxy" });
    }

    const boundary = "xxxxxxxxxx";
    const originalFileName = req.file.originalname;

    let data = "";
    data += "--" + boundary + "\r\n";
    data +=
      "Content-Disposition: form-data; name=" +
      fieldName +
      '; filename="' +
      originalFileName +
      '"\r\n';
    data += "Content-Type:multipart/form-data\r\n\r\n";

    const payload = Buffer.concat([
      Buffer.from(data, "utf8"),
      req.file.buffer,
      Buffer.from("\r\n--" + boundary + "--\r\n", "utf8")
    ]);

    let options = {
      host: "localhost",
      method: "POST",
      path: "/upload",
      port: "5001",
      headers: {
        "Content-Type": "multipart/form-data; boundary=" + boundary
      }
    };

    const request = http.request(options, response => {
      response.setEncoding("utf8");

      let fullData = "";
      response.on("data", data => {
        fullData += data;
      });

      response.on("end", () => {
        console.log(JSON.parse(fullData));
      });

      response.pipe(res); //Reencaminha a resposta
    });

    request.write(payload);
    request.end();
  });
});

module.exports = app;
