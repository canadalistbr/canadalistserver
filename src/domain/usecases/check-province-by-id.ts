export interface CheckProvinceById {
  check(id: number): Promise<boolean>
}
