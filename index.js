const express = require("express");
const bearerToken = require("express-bearer-token");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const morgan = require("morgan");
const sharp = require('sharp');
const nunjucks = require("nunjucks");
const fs = require("fs").promises;

const app = express();

if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.length) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.RELEASE,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
  });
}

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(morgan("combined"));
app.use(bearerToken());

app.use((req, res, next) => {
  if (process.env.SECRET_TOKEN && process.env.SECRET_TOKEN !== req.token) {
    res.status(401).send("Please use RFC6750 token auth");
    return;
  }
  next();
});

app.get("/:template.png", async (req, res) => {
  const { template } = req.params;

  try {
    await fs.readFile(`templates/${template}.svg`);
  } catch (_) {
    res.status(400).send(`templates/${template}.svg not found`);
    return;
  }

  // Build a safe, flat context: only own string query params are allowed through,
  // preventing prototype-pollution / constructor-chain injection via nested
  // query objects (e.g. ?constructor[prototype][x]=y) or dangerous key names.
  const context = Object.create(null);
  for (const key of Object.keys(req.query)) {
    if (typeof req.query[key] === "string") {
      context[key] = req.query[key];
    }
  }

  const svg = nunjucks.render(`templates/${template}.svg`, context); // render template with the sanitized context from request GET params
  const image = await sharp(Buffer.from(svg), {density: 72*2}).png().toBuffer();

  res.type("png");
  res.send(image);
});

app.use(Sentry.Handlers.errorHandler());

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

app.listen(port, host);

console.log(`Server listening on http://${host}:${port}...`);
