import { Request, Response, NextFunction } from "express";
import { eta } from "../index";
import { getFortune } from "./fortune";

export const home = (req: Request, res: Response) => {
  res.send(eta.render("home", { title: "Plains", name: "Plains" }));
};

export const about = (req: Request, res: Response) => {
  res.send(
    eta.render("about", {
      title: "Plains",
      name: "About",
      fortune: `${getFortune()}`,
    })
  );
};

export const notFound = (req: Request, res: Response) => {
  res.status(404);
  res.send(eta.render("404", { title: "404" }));
};

export const serverError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  res.status(500);
  res.send(eta.render("500", { title: "500" }));
};
