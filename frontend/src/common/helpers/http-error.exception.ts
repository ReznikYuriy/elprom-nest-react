import { HttpCode } from "../enums";

class HttpError extends Error {
  status: HttpCode;
  messages: string;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    messages = "Network Error",
  } = {}) {
    super(messages);
    this.status = status;
    this.messages = messages;
    this.name = "HttpError";
  }
}

export { HttpError };
