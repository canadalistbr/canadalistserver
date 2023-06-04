import { SanitizeEntityName } from "../../../domain/usecases/sanitize-entity-name";

export class DbSanitizeEntityName implements SanitizeEntityName {
  sanitize(name: string): string {
    return name.replace(/-/g, " ").toLocaleLowerCase();
  }
}
