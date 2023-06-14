import { SanitizeEntityName } from "../../presentation/protocols/sanitize-entity-name";

export class EntityNameSanitizer implements SanitizeEntityName {
  sanitize(name: string): string {
    return name.replace(/-/g, " ").toLocaleLowerCase();
  }
}
