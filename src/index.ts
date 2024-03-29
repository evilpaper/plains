import express, { NextFunction, Request, Response } from "express";
import { Eta } from "eta";
import path from "path";
import { home, about, notFound, serverError } from "./lib/handlers";
import { error } from "console";

export const app = express();
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
app.get("/about", (req, res) => about(req, res));
app.get("/", (req, res) => home(req, res));

app.use((req, res) => notFound(req, res)); // Custom 404 page
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  serverError(err, req, res, next)
); // Custom 500 page

// app.listen(port, () => {
//   console.log(
//     `Server is running on http://localhost:${port}; ` +
//       `press CTRL-C to terminate.`
//   );
// });

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Server started on http://localhost:${port}` +
        "; press Ctrl-C to terminate."
    );
  });
} else {
  module.exports = app;
}
