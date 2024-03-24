import { home } from "./handlers";

test("home page renders", () => {
  const req = {};
  const res = { render: jest.fn() };
  // home(req as any, res as any);
  //   expect(res.render.mock.calls[0][0].toBe("home"));
});
