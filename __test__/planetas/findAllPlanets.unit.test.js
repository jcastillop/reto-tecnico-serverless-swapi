const { default: expect } = require("expect");
const { findAllPlanets } = require("../../src/functions/planetas/index");

test("Reponse is a objecto", () => {
  expect(typeof findAllPlanets).toBe("object");
});
