const fs = require("fs");
const express = require("express");
const path = require("path");
const formidable = require("express-formidable");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(formidable());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/upload", (req, res) => {
  const { files } = req;

  Object.keys(files).forEach((name) => {
    fs.writeFileSync(__dirname + `/public/uploads/${name}`, fs.readFileSync(files[name].path));
  });

  const images = Object.keys(files).map((file) => `htts//`);
});

app.listen(process.env.PORT, () => {
  console.log(`App running on ${process.env.PORT}`);
});

cron.schedule("/*15 * * * *", () => {
  const directory = "public/uploads";

  fs.readdir(directory, (err, files) => {
    if (err) {
      throw err;
    }

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
});
