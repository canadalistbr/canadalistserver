import request from "supertest";
import app from "../config/app";

describe("provinces-routes", () => {
  it("returns a 200", async () => {
    await request(app).get("/api/entities/montreal").expect(200);
  });
});
