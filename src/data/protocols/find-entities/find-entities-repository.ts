export interface FindEntitiesRepository {
  find(name: string): Promise<any[]>;
}
