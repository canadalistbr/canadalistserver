export interface FindEntities {
  findBy(entityName: string): Promise<any[]>;
}
