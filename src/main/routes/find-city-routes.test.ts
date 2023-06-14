import request from "supertest";
import app from "../config/app";

describe("/api/cities", () => {
  it("returns a 200", async () => {
    await request(app).get("/api/cities/montreal").expect(200);
    await request(app).get("/api/cities/Montreal").expect(200);
    await request(app).get("/api/cities/Fort McMurray").expect(200);
  });
});
