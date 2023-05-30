import request from "supertest";
import app from "../config/app";

describe("province-routes", () => {
  it("returns a 200", async () => {
    await request(app)
      .get("/api/provinces/3bb2f7dd-0440-4a77-a219-ecabb86a2981")
      .expect(200);
  });
});
