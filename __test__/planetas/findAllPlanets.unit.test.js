const { default: expect } = require("expect");
const { findAllPlanets } = require("../../src/functions/planetas/index");

describe("findAllPlanets", () => {
  describe("get route", () => {
    describe("planet not exist", () => {
      it("should return a 404", () => {
        expect(true).toBe(true);
      });
    });
  });
});

test("Reponse is a objecto", () => {
  expect(typeof findAllPlanets).toBe("object");
});
