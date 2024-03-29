import express from "express";
import { Eta } from "eta";
import path from "path";
import { home, about, notFound, serverError } from "./lib/handlers";

const app = express();
const port = process.env.PORT || 3000;

const viewpath = path.join(__dirname, "views");
export let eta = new Eta({ views: viewpath, cache: true });

app.use(express.static("public"));

app.get("/headers", (req, res) => {
  res.type("text/plain");
  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key}: ${value}`
  );
  res.send(headers.join("\n"));
});
app.get("/about", about);
app.get("/", home);

app.use(notFound); // Custom 404 page
app.use(serverError); // Custom 500 page

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}; ` +
      `press CTRL-C to terminate.`
  );
});
