import request from "supertest";
import app from "../config/app";

describe("province-routes", () => {
  it("returns a 200", async () => {
    await request(app).get("/api/provinces/1").expect(200);
  });
});
