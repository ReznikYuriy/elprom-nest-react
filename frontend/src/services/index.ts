import { Http } from "./http/http.service";
import { CategoryApi } from "./category-api/category-api.service";
import { ProductApi } from "./product-api/product-api.service";

const http = new Http();

const categoryApi = new CategoryApi({
  http,
  apiPrefix: 'ENV.API_PATH',
});

const productApi = new ProductApi({
  http,
  apiPrefix: 'ENV.API_PATH',
});

export { http, categoryApi, productApi };
