import { HttpError } from '../../common/helpers/http-error.exception';
import { checkIsOneOf } from '../../common/helpers/check-is-one-of.helper';
import { ContentType, HttpHeader, HttpMethod } from '../../common/enums';
import { HttpOptions } from '../../common/types/http-options.type';
import { IServerResponseErr } from '../../common/interfaces';

class Http {
  load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
    } = options;
    const headers = this._getHeaders(contentType);
    const isJSON = checkIsOneOf(contentType, ContentType.JSON);
    return fetch(url, {
      method,
      headers,
      body: isJSON ? JSON.stringify(payload) : payload as string | FormData,
    })
      .then(this._checkStatus)
      .then((res) => this._parseJSON<T>(res))
      .catch(this._throwError);
  }

  _getHeaders(contentType?: ContentType): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    return headers;
  }

  async _checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException: IServerResponseErr | null = await response.json();
      throw new HttpError({
        status: response.status,
        messages: parsedException?.messages,
      });
    }
    return response;
  }

  _parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  _throwError(err: Error): never {
    throw err;
  }
}

export { Http };
