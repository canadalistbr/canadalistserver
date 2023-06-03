export interface CheckCityById {
  check(id: string): Promise<boolean>;
}
