import { SanitizeEntityName } from "../../presentation/protocols/";

export class EntityNameSanitizer implements SanitizeEntityName {
  sanitize(name: string): string {
    return name.replace(/-/g, " ").toLocaleLowerCase();
  }
}
