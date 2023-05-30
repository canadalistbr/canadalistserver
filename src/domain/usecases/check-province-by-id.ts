export interface CheckProvinceById {
  check(id: string): Promise<boolean>;
}
