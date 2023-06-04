import request from "supertest";
import app from "../config/app";

describe("province-routes", () => {
  it("returns a 200", async () => {
    await request(app)
      .get("/api/province/64f779d1-3635-41de-b02e-13f9e3956ca2")
      .expect(200);
  });
});
