import {
  ModelWithSlug,
  SlugInsertion,
} from "../../presentation/protocols/slug-insertion";

export class SlugInsertionUtil<T extends { name: string }>
  implements SlugInsertion<T>
{
  add(model: T): ModelWithSlug<T> {
    const slug = this.generateSlug(model.name);
    return { ...model, slug };
  }
  private generateSlug(name: string): string {
    const formattedName = name.toLowerCase().replace(/\s+/g, "-");
    return formattedName;
  }
}
