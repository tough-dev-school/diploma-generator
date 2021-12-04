/* Periodiacly query the main service to keep in running chrome in the background.
 * We need this, because our boot time exceeds 30 seconds, given by heroku to craft a response
 *
 * This script looks like a periodic healthcheck, which it is. But we can't use docker HEALTHCHECK cmd,
 * because heroku does not support it.
 */
const axios = require("axios");
const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require("toad-scheduler");

const port = process.env.PORT || 3000;

const query = () =>
  axios.request({
    url: `http://localhost:${port}/warmup.png`,
    params: {
      name: "Konstantin Konstantinopolisky",
      sex: "m",
    },
    headers: {
      Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
    },
  });

setTimeout(() => {
  console.log("Running initial warmup...");
  query()
    .then(() => console.log("Done!"))
    .catch(() => console.error("Error!"));
}, 3000);

console.log("Running scheduler...");
const scheduler = new ToadScheduler();

scheduler.addSimpleIntervalJob(
  new SimpleIntervalJob(
    { seconds: 60 },
    new AsyncTask("Periodiacly query the main service", query)
  )
);
