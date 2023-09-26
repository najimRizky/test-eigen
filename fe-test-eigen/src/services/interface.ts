export interface IApiRequestBase {
  url: string;
}

export interface IApiRequest extends IApiRequestBase {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: Record<string, string | number | unknown>
  headers?: Record<string, string | number | unknown>
}

export interface IGetRequest extends IApiRequestBase { }