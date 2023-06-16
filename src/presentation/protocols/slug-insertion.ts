export type ModelWithSlug<TEntity> = TEntity & { slug: string };

export interface SlugInsertion<TEntity extends { name: string }> {
  add(model: TEntity): ModelWithSlug<TEntity>;
}
