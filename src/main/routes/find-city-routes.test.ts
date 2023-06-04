import request from "supertest";
import app from "../config/app";

describe("/api/cities", () => {
  it("returns a 200", async () => {
    await request(app)
      .get("/api/city/1a04456b-eeb1-407f-a1a2-ade93c94dce4")
      .expect(200);
  });
});
