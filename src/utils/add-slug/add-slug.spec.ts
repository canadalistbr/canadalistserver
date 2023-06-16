import { SlugInsertionUtil } from "./add-slug";
const name = "composed name even more";
const modelWithoutSlug = {
  name,
};
describe("SlugInsertion", () => {
  it("returns the model with slug field", () => {
    const sut = new SlugInsertionUtil();
    const modelWithSlug = sut.add(modelWithoutSlug);
    expect(modelWithSlug).toEqual({
      name: "composed name even more",
      slug: "composed-name-even-more",
    });
  });
});
