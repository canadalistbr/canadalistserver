import {
  FindEntities,
  FindEntitiesRepository,
} from "../load-provinces/protocols";

export class DbFindEntities implements FindEntities {
  constructor(
    private readonly findEntitiesRepository: FindEntitiesRepository
  ) {}
  async findBy(entityName: string): Promise<any[]> {
    const entities = await this.findEntitiesRepository.find(entityName);
    return entities;
  }
}
