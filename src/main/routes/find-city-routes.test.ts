import request from "supertest";
import app from "../config/app";

describe("/api/cities", () => {
  it("returns a 200", async () => {
    await request(app).get("/api/cities/montreal").expect(200);
  });
});
