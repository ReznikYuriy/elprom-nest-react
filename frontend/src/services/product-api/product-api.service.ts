import { Http } from '../http/http.service';
import { HttpMethod, RouteEnum } from '../../common/enums';
import { IProduct } from '../../common/interfaces';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ProductApi {
  _http: Http;
  _apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this._http = http;
    this._apiPrefix = apiPrefix;
  }

  public getProducts(): Promise<IProduct[]> {
    return this._http.load(
      `${this._apiPrefix}${RouteEnum.PRODUCTS}/`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { ProductApi };
