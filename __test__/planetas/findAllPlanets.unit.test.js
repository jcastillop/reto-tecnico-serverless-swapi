const { default: expect } = require("expect");
const { findAllPlanets } = require("../../src/functions/planetas/index");

const {
  listarPlanetasSwapi,
  encontrarPlaneta,
  guardarPlaneta,
} = require("../../src/controllers/index");

test("listarPlanetas return json", async () => {
  const expected = true;
  const awsRequestId = "aws-123";
  const url = "/planets";

  const response = await listarPlanetasSwapi(awsRequestId, url);
  console.log(response);
  //expect().toEqual(expected);
});

test("Reponse is a objecto", () => {
  expect(typeof findAllPlanets).toBe("object");
});
