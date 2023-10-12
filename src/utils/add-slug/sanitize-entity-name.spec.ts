import { SlugInsertionUtil } from "./add-slug";
import { EntityNameSanitization } from "./sanitize-entity-name";
 

const slugWithDashes='new-foundland-and-labrator'

describe("SlugInsertion", () => {
  it("returns the model with slug field", () => {
    const sut = new EntityNameSanitization();
    const modelWithSlug = sut.sanitize(slugWithDashes);
    expect(modelWithSlug).toEqual('new foundland and labrator');
  });
});
