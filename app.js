const express = require("express");
const util = require("util");
const cors = require("cors");
const exec = util.promisify(require("child_process").execSync);
const app = express();
app.use(express.json());
app.use(cors());
async function execute(cmd) {
  const { stdout } = await exec(cmd, { stdio: "inherit" });
  console.log(stdout);
}

app.get("/feed", async (req, res) => {
  console.log("feed executed");
  res.send("gg");
});

app.get("/light/true", (req, res) => {
  exec("python lighton.py", { stdio: "inherit" }, (err, stdout, stderr) => {
    console.log(stdout);
  });
  res.send("success on");
});
app.get("/light/false", (req, res) => {
  exec("python light.py", { stdio: "inherit" }, (err, stdout, stderr) => {
    console.log(stdout);
  });
  res.send("success off");
});
app.get("/water1/true", (req, res) => {
  exec("python lighton.py", { stdio: "inherit" }, (err, stdout, stderr) => {
    console.log(stdout);
  });
  res.send("success on");
});
app.get("/water1/false", (req, res) => {
  exec("python light.py", { stdio: "inherit" }, (err, stdout, stderr) => {
    console.log(stdout);
  });
  res.send("success off");
});

const port = 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
