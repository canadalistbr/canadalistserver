export interface IEntityNameSanitization {
    sanitize(name: string): string
}


export class EntityNameSanitization implements IEntityNameSanitization {
    sanitize(name: string): string {
        const entity = name.replace(/-/g, ' ');
        return entity
    }
}