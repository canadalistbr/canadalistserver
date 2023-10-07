export interface CheckCityByName {
  check(name: string): Promise<boolean>;
}
