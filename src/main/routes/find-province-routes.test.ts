import request from "supertest";
import app from "../config/app";

describe("province-routes", () => {
  it("returns a 200 with lowecase province", async () => {
    await request(app).get("/api/provinces/quebec").expect(200);
  });

  it("returns a 200 with first letter uppercase", async () => {
    await request(app).get("/api/provinces/Quebec").expect(200);
  });

  it("returns a 200 with first letter uppercase", async () => {
    await request(app).get("/api/provinces/british-columbia").expect(200);
  });
});
