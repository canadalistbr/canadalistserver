export interface CheckProvinceByName {
  check(name: string): Promise<boolean>;
}
