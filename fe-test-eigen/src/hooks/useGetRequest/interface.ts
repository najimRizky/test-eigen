export interface IUseGetRequest {
  url: string
  queryParams?: { [key: string]: string | number | unknown }
  requiredParams?: string[]
}