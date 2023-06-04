import { DbSanitizeEntityName } from "./sanitize-entity-name-usecase";

describe("DbSanitizeEntityName", () => {
  it("santizes the passed name", () => {
    const sut = new DbSanitizeEntityName();
    expect(sut.sanitize("british-columbia")).toBe("british columbia");
    expect(sut.sanitize("British-columbia")).toBe("british columbia");
    expect(sut.sanitize("British-COlumBIa")).toBe("british columbia");
  });
});
