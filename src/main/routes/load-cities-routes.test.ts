import request from "supertest";
import app from "../config/app";

describe("", () => {
  it("", async () => {
    await request(app).get("/api/cities").expect(200);
  });
});
