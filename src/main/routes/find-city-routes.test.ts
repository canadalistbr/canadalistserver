import request from "supertest";
import app from "../config/app";

describe("/api/cities", () => {
  it("returns a 200", async () => {
    await request(app)
      .get("/api/cities/vancouver")
      .expect(200);
  });

  it("returns a 200", async () => {
    await request(app)
      .get("/api/cities/Quebec-ciTy")
      .expect(200);
  });

  it("returns a 403", async () => {
    await request(app)
      .get("/api/cities/citythatdoesnotexist")
      .expect(403);
  });
});
