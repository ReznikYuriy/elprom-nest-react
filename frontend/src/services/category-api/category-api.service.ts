import { RouteEnum, HttpMethod } from '../../common/enums';
import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

interface ICategory {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

class CategoryApi {
  _http: Http;
  _apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this._http = http;
    this._apiPrefix = apiPrefix;
  }

  public getCategories(): Promise<ICategory[]> {
    return this._http.load(
      `${this._apiPrefix}${RouteEnum.CATEGORIES}/`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { CategoryApi };
