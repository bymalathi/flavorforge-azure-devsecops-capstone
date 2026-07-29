const request = require("supertest");
const app = require("../src/app");

describe("Health API", () => {
  test("GET /api/health should return application health", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("UP");
    expect(response.body.application).toBeDefined();
    expect(response.body.version).toBeDefined();
    expect(response.body.environment).toBeDefined();
    expect(response.body.timestamp).toBeDefined();
  });
});