import { EntityNameSanitizer } from "./sanitize-entity-name";

describe("DbSanitizeEntityName", () => {
  it("santizes the passed name", () => {
    const sut = new EntityNameSanitizer();
    expect(sut.sanitize("british-columbia")).toBe("british columbia");
    expect(sut.sanitize("British-columbia")).toBe("british columbia");
    expect(sut.sanitize("British-COlumBIa")).toBe("british columbia");
  });
});
