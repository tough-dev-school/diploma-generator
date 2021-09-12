const express = require("express");
const svgToImg = require("svg-to-img");
const nunjucks = require("nunjucks");
const fs = require("fs").promises;

const app = express();

app.get("/:template.png", async (req, res) => {
  const context = req.query;
  const { template } = req.params;

  try {
    await fs.readFile(`templates/${template}.svg`);
  } catch {
    res.status(404).send(`Template templates/${template}.svg not found`);
    return;
  }

  const svg = nunjucks.render(`templates/${template}.svg`, req.query); // render tempalte with the context from request GET params
  const image = await svgToImg.from(svg).toPng();
  res.type("png");
  res.send(image);
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

app.listen(port, host);

console.log(`Server listening on http://${host}:${port}...`);
