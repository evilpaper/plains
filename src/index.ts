import express, { Request, Response, NextFunction } from "express";
import { Eta } from "eta";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

let viewpath = path.join(__dirname, "views");
let eta = new Eta({ views: viewpath, cache: true });

app.use(express.static("public"));

const fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep tt simple.",
];

app.get("/about", (req: Request, res: Response) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  console.log(randomFortune);
  res.send(
    eta.render("about", {
      title: "Plains",
      name: "About",
      fortune: `${randomFortune}`,
    })
  );
});

app.get("/", (req: Request, res: Response) => {
  res.send(eta.render("home", { title: "Plains", name: "Plains" }));
});

// Custom 404 page
app.use((req: Request, res: Response) => {
  res.status(404);
  res.send(eta.render("404", { title: "404" }));
});

// Custom 500 page
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500);
  res.send(eta.render("500", { title: "500" }));
});

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}; ` +
      `press CTRL-C to terminate.`
  );
});
