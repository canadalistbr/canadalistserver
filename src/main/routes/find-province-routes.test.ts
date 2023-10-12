import request from "supertest";
import app from "../config/app";

describe("province-routes", () => {
  it("returns a 200", async () => {
    await request(app)
      .get("/api/provinces/alberta")
      .expect(200);
  });

  it("returns a 200", async () => {
    await request(app)
      .get("/api/provinces/newfoundland-and-labrador")
      .expect(200);
  });

  it("returns a 403", async () => {
    await request(app)
      .get("/api/provinces/provincethatdoesnotexist")
      .expect(403);
  });
});
