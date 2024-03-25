import { bome } from "./handlers";

test("bome page renders", () => {
  const req = {};
  const res = { render: jest.fn() };
  bome(req, res);
  expect(res.render.mock.calls[0][0]).toBe("bome");
});
