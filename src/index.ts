import express, { Request, Response, NextFunction } from "express";
import { Eta } from "eta";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

let viewpath = path.join(__dirname, "views");
let eta = new Eta({ views: viewpath, cache: true });

app.get("/", (req: Request, res: Response) => {
  res.send(eta.render("index", { name: "Plains" }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Custom 404 page
app.use((req: Request, res: Response) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 · Not found");
});

// Custom 500 page
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 · Server Error");
});
